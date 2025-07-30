import { Cancel as CancelIcon, Close as CloseIcon, Save as SaveIcon } from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Fade,
    IconButton,
    Slide,
    Stack,
    TextField,
    Tooltip
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { GridValidRowModel } from '@mui/x-data-grid';
import axios from 'axios';
import { forwardRef, useEffect, useRef, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import type { FormFieldType } from '../types/FormField';
import PaperComponent from './PaperComponent';
import { getFieldError, validateAllFields } from './validationUtils';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function CapstoneFormDialog({
    formTitle,
    contentText,
    fields,
    dialogState,
    handleClose,
    handleDataChanged,
    selectedRow,
    url,
}: FormDialogType) {
    const [localDialogState, setLocalDialogState] = useState(false);
    const [localSelectedRow, setLocalSelectedRow] = useState<GridValidRowModel | null>(selectedRow);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    // Function to handle saving the form data
    const handleSaveDialog = async () => {
        const errors = validateAllFields(fields, localSelectedRow || {});
        setFieldErrors(errors);

        if (Object.values(errors).some(Boolean)) {
            setSaveError('Please fix the validation errors before saving');
            return;
        }

        if (!localSelectedRow) {
            setSaveError('No data to save');
            return;
        }

        if (!url) {
            setSaveError('No URL provided for saving data');
            return;
        }

        setLoading(true);
        setSaveError(null);

        try {
            const response = await axios.post(url, localSelectedRow);
            console.log('Record saved successfully: ', response.data);
            setSaveSuccess(true);
            setHasUnsavedChanges(false);

            // Show success briefly then close
            setTimeout(() => {
                handleCloseDialog();
                handleDataChanged();
            }, 1000);

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const err = error.response?.data?.errors || error.message || 'Unknown error';
                setSaveError(typeof err === 'string' ? err : 'Validation failed');
            } else if (error instanceof Error) {
                setSaveError(error.message);
            } else {
                setSaveError('Unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle field value change
    const handleFieldChange = (field: FormFieldType, newValue: string) => {
        // Prevent special characters in number fields (allow only digits and decimal point)
        if (field.type === 'number') {
            newValue = newValue.replace(/[^\d.]/g, '');
            // Ensure only one decimal point
            const parts = newValue.split('.');
            if (parts.length > 2) {
                newValue = parts[0] + '.' + parts.slice(1).join('');
            }
        }

        const error = getFieldError(field, newValue);
        setFieldErrors((prev) => ({
            ...prev,
            [field.id]: error,
        }));

        const updatedRow = {
            ...(localSelectedRow ?? {}),
            [field.id]: newValue,
        };

        setLocalSelectedRow(updatedRow);
        setHasUnsavedChanges(true);
        setSaveError(null); // Clear save error when user makes changes
    };

    // Handle field blur
    const handleFieldBlur = (field: FormFieldType) => {
        if (fieldErrors[field.id]) {
            setLocalSelectedRow((prev) => {
                if (!prev) return prev;
                const updated = { ...prev };
                updated[field.id] = '';
                setFieldErrors(validateAllFields(fields, updated));
                return updated;
            });
        }
    };

    useEffect(() => {
        setLocalDialogState(dialogState);
        setLocalSelectedRow(selectedRow);
        setFieldErrors({});
        setSaveError(null);
        setSaveSuccess(false);
        setHasUnsavedChanges(false);
    }, [dialogState, selectedRow]);

    // Focus error summary for accessibility when errors appear
    const errorSummaryRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (Object.values(fieldErrors).some(Boolean) && errorSummaryRef.current) {
            errorSummaryRef.current.focus();
        }
    }, [fieldErrors]);

    const handleCloseDialog = () => {
        if (hasUnsavedChanges && !saveSuccess) {
            const confirmClose = window.confirm('You have unsaved changes. Are you sure you want to close?');
            if (!confirmClose) return;
        }

        setLocalDialogState(false);
        handleClose();
    };

    const renderField = (field: FormFieldType) => {
        const value = localSelectedRow?.[field.id] ?? '';
        const helperId = `${field.id}-helper-text`;
        const hasError = Boolean(fieldErrors[field.id]);

        return (
            <TextField
                key={field.id}
                disabled={field.disabled || loading}
                autoFocus={field.autoFocus}
                margin={field.margin}
                id={field.id}
                label={field.label}
                type={field.type}
                fullWidth={field.fullWidth}
                variant={field.variant}
                sx={{
                    ...field.sx,
                    '& .MuiFormHelperText-root': {
                        whiteSpace: 'nowrap',
                        overflow: 'visible',
                        textOverflow: 'ellipsis',
                    },
                    '& .MuiInputLabel-root': {
                        color: hasError ? 'error.main' : 'text.secondary',
                    },
                    '& .MuiOutlinedInput-root': {
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: hasError ? 'error.main' : 'primary.main',
                            },
                        },
                    },
                }}
                value={value}
                error={hasError}
                helperText={fieldErrors[field.id] || (field.required ? 'Required' : '')}
                aria-describedby={helperId}
                FormHelperTextProps={{ id: helperId }}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                onPaste={(e) => {
                    if (field.type === 'number') {
                        const paste = e.clipboardData.getData('text');
                        if (paste.match(/[^\d.]/)) {
                            e.preventDefault();
                        }
                    }
                }}
                onBlur={() => handleFieldBlur(field)}
                InputProps={{
                    endAdornment: field.required && (
                        <Box component="span" sx={{ color: 'error.main', ml: 0.5 }}>
                            *
                        </Box>
                    ),
                }}
            />
        );
    };

    const hasErrors = Object.values(fieldErrors).some(Boolean);
    const canSave = !hasErrors && !loading && hasUnsavedChanges;

    return (
        <Dialog
            open={localDialogState}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            TransitionComponent={Transition}
            aria-labelledby="draggable-dialog-title"
            maxWidth="md"
            fullWidth
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 2,
                    boxShadow: (theme) => theme.shadows[24],
                },
            }}
        >
            <DialogTitle
                sx={{
                    cursor: 'move',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    pb: 1,
                    background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: 'primary.contrastText',
                }}
                id="draggable-dialog-title"
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {formTitle}
                    {hasUnsavedChanges && (
                        <Box
                            sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'warning.main',
                                animation: 'pulse 2s infinite',
                                '@keyframes pulse': {
                                    '0%': { opacity: 1 },
                                    '50%': { opacity: 0.5 },
                                    '100%': { opacity: 1 },
                                },
                            }}
                        />
                    )}
                </Box>
                <Tooltip title="Close">
                    <IconButton
                        onClick={handleCloseDialog}
                        sx={{ color: 'inherit' }}
                        disabled={loading}
                    >
                        <CloseIcon />
                    </IconButton>
                </Tooltip>
            </DialogTitle>

            <DialogContent sx={{ pt: 2 }}>
                {contentText && (
                    <>
                        <DialogContentText sx={{ mb: 2 }}>
                            {contentText}
                        </DialogContentText>
                        <Divider sx={{ mb: 2 }} />
                    </>
                )}

                <Fade in={saveSuccess}>
                    <Alert severity="success" sx={{ mb: 2 }} aria-live="polite">
                        Record saved successfully!
                    </Alert>
                </Fade>

                {saveError && (
                    <Alert severity="error" sx={{ mb: 2 }} aria-live="polite">
                        {Array.isArray(saveError) ? (
                            <Box>
                                {saveError.map((err, idx) => (
                                    <Box key={idx}>{String(err)}</Box>
                                ))}
                            </Box>
                        ) : typeof saveError === 'object' ? (
                            <Box>
                                {Object.entries(saveError).map(([key, value], idx) => (
                                    <Box key={idx}>
                                        <strong>{key}:</strong> {String(value)}
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            String(saveError)
                        )}
                    </Alert>
                )}

                {hasErrors && (
                    <Alert
                        severity="error"
                        sx={{ mb: 2 }}
                        aria-live="assertive"
                        tabIndex={-1}
                        ref={errorSummaryRef}
                        role="alert"
                    >
                        <strong>Please fix the following errors:</strong>
                        <Box component="ul" sx={{ mt: 1, mb: 0, pl: 2 }}>
                            {Object.entries(fieldErrors)
                                .filter(([, err]) => Boolean(err))
                                .map(([fieldId, err], idx) => {
                                    const field = fields.find((f) => f.id === fieldId);
                                    return (
                                        <Box component="li" key={idx}>
                                            <strong>{field ? field.label : fieldId}:</strong> {err}
                                        </Box>
                                    );
                                })}
                        </Box>
                    </Alert>
                )}

                <Stack spacing={2} sx={{ mt: 2 }}>
                    {fields.map(renderField)}
                </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, py: 2, gap: 1 }}>
                <Button
                    onClick={handleCloseDialog}
                    disabled={loading}
                    startIcon={<CancelIcon />}
                    variant="outlined"
                    color="inherit"
                >
                    Cancel
                </Button>
                <Button
                    onClick={handleSaveDialog}
                    disabled={!canSave}
                    startIcon={loading ? <CircularProgress size={16} /> : <SaveIcon />}
                    variant="contained"
                    color="primary"
                    sx={{
                        minWidth: 100,
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-1px)',
                            boxShadow: (theme) => theme.shadows[4],
                        },
                    }}
                >
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CapstoneFormDialog;