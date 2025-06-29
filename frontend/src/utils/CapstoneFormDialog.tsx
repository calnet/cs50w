import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import type { FormField } from '../types/FormField';
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
    const [localSelectedRow, setLocalSelectedRow] = useState<Record<string, unknown>>({});
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Function to handle saving the form data
    const handleSaveDialog = () => {
        const errors = validateAllFields(fields, localSelectedRow || {});
        setFieldErrors(errors);
        if (Object.values(errors).some(Boolean)) {
            // Prevent save if any errors
            console.error('Validation errors:', errors);
            return;
        }
        if (!localSelectedRow) {
            console.error('No data to save');
            return;
        }
        if (!url) {
            console.error('No URL provided for saving data');
            return;
        }
        axios
            .post(url, localSelectedRow)
            .then((response) => {
                console.log('Record saved successfully: ', response.data);
                handleCloseDialog();
                handleDataChanged();
            })
            .catch((error) => {
                console.error('Error saving record:', error.response?.data.errors || error.message);
            });
    };

    // Handle field value change
    const handleFieldChange = (field: FormField, newValue: string) => {
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
    const handleFieldBlur = (field: FormField) => {
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
        setFieldErrors({}); // Reset errors when dialog opens
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
                {fields.map((field: FormField) => {
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
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSaveDialog} disabled={Object.values(fieldErrors).some(Boolean)}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CapstoneFormDialog;
