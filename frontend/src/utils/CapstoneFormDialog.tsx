import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { GridValidRowModel } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import type { FormFieldType } from '../types/FormField';
import PaperComponent from './PaperComponent';
import { getFieldError, validateAllFields } from './validationUtils';

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

    // Function to handle saving the form data
    const handleSaveDialog = async () => {
        const errors = validateAllFields(fields, localSelectedRow || {});
        setFieldErrors(errors);
        if (Object.values(errors).some(Boolean)) {
            // Prevent save if any errors
            setSaveError('Validation errors found');
            // Log errors for debugging
            console.error('Validation errors:', errors);
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
            handleCloseDialog();
            handleDataChanged();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const err = error.response?.data?.errors || error.message || 'Unknown error';
                setSaveError(err)
            } else if (error instanceof Error) {
                setSaveError(error.message);
            } else {
                setSaveError('Unknown error');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle field value change
    const handleFieldChange = (field: FormFieldType, newValue: string) => {
        // Prevent special characters in number fields (allow only digits)
        if (field.type === 'number') {
            newValue = newValue.replace(/[^\d]/g, '');
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
    };

    // Handle field blur
    const handleFieldBlur = (field: FormFieldType) => {
        if (fieldErrors[field.id]) {
            setLocalSelectedRow((prev) => {
                if (!prev) return prev;
                const updated = { ...prev };
                updated[field.id] = '';
                // Immediately revalidate with the updated row
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
    }, [dialogState, selectedRow]);

    // Focus error summary for accessibility when errors appear
    const errorSummaryRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (Object.values(fieldErrors).some(Boolean) && errorSummaryRef.current) {
            errorSummaryRef.current.focus();
        }
    }, [fieldErrors]);

    const handleCloseDialog = () => {
        setLocalDialogState(false);
        handleClose();
    };

    const renderField = (field: FormFieldType) => {
        const value = localSelectedRow?.[field.id] ?? '';
        const helperId = `${field.id}-helper-text`;
        return (
            <TextField
                key={field.id}
                disabled={field.disabled}
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
                }}
                value={value}
                error={Boolean(fieldErrors[field.id])}
                helperText={fieldErrors[field.id] || ''}
                aria-describedby={helperId}
                FormHelperTextProps={{ id: helperId }}
                onChange={(e) => handleFieldChange(field, e.target.value)}
                onPaste={(e) => {
                    if (field.type === 'number') {
                        const paste = e.clipboardData.getData('text');
                        if (paste.match(/[^\d]/)) {
                            e.preventDefault();
                        }
                    }
                }}
                onBlur={() => handleFieldBlur(field)}
            />
        );
    };

    return (
        <Dialog
            open={localDialogState}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
        >
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {formTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
                {saveError && (
                    <Alert severity="error" sx={{ mb: 2 }} aria-live="polite">
                        {Array.isArray(saveError) ? (
                            <div>
                                {saveError.map((err, idx) => (
                                    <div key={idx}>{String(err)}</div>
                                ))}
                            </div>
                        ) : typeof saveError === 'object' ? (
                            <div>
                                {Object.entries(saveError).map(([key, value], idx) => (
                                    <div key={idx}>
                                        <strong>{key}:</strong> {String(value)}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            String(saveError)
                        )}
                    </Alert>
                )}
                {Object.values(fieldErrors).some(Boolean) && (
                    <Alert severity="error" sx={{ mb: 2 }} aria-live="assertive" tabIndex={-1} ref={errorSummaryRef} role="alert">
                        {Object.entries(fieldErrors)
                            .filter(([, err]) => Boolean(err))
                            .map(([fieldId, err], idx) => {
                                const field = fields.find((f) => f.id === fieldId);
                                return (
                                    <div key={idx}>
                                        <strong>{field ? field.label : fieldId}:</strong> {err}
                                    </div>
                                );
                            })}
                    </Alert>
                )}
                {fields.map(renderField)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog} disabled={loading}>Cancel</Button>
                <Button onClick={handleSaveDialog} disabled={Object.values(fieldErrors).some(Boolean) || loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CapstoneFormDialog;
