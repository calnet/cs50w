import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import type { FormField } from '../types/FormField';
import PaperComponent from './PaperComponent';
import { getFieldError, validateAllFieldsWithRow } from './validationUtils';

function CapstoneFormDialog({ ...props }: FormDialogType) {
    const { formTitle, contentText, fields, dialogState, handleClose, handleDataChanged, selectedRow, url } = props;
    const [localDialogState, setLocalDialogState] = useState(false);
    const [localSelectedRow, setLocalSelectedRow] = useState<Record<string, unknown> | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Validate all fields and return errors object
    const validateAllFields = () => {
        const errors: Record<string, string> = {};
        if (!fields) return errors;
        (fields as FormField[]).forEach((field) => {
            const value = localSelectedRow && localSelectedRow[field.id] ? String(localSelectedRow[field.id]) : '';
            const error = getFieldError(field, value);
            if (error) errors[field.id] = error;
        });
        return errors;
    };

    // Function to handle saving the form data
    const handleSaveDialog = () => {
        const errors = validateAllFields();
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
                    const value = field.id && localSelectedRow ? localSelectedRow[field.id] : '';
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
                            onChange={(e) => {
                                let newValue = e.target.value;
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
                            }}
                            onPaste={(e) => {
                                if (field.type === 'number') {
                                    const paste = e.clipboardData.getData('text');
                                    if (paste.match(/[^\d]/)) {
                                        e.preventDefault();
                                    }
                                }
                            }}
                            onBlur={() => {
                                if (fieldErrors[field.id]) {
                                    setLocalSelectedRow((prev) => {
                                        if (!prev) return prev;
                                        const updated = { ...prev };
                                        updated[field.id] = '';
                                        // Immediately revalidate with the updated row
                                        setFieldErrors(validateAllFieldsWithRow(fields, updated));
                                        return updated;
                                    });
                                }
                            }}
                        />
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSaveDialog}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CapstoneFormDialog;
