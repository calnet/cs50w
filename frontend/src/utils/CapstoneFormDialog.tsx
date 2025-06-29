import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import PaperComponent from './PaperComponent';

// Define a type for form fields
interface FormField {
    id: string;
    label: string;
    type: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    margin?: TextFieldProps['margin'];
    fullWidth?: boolean;
    variant?: TextFieldProps['variant'];
    sx?: object;
}

function CapstoneFormDialog({ ...props }: FormDialogType) {
    const { formTitle, contentText, fields, dialogState, handleClose, handleDataChanged, selectedRow, url } = props;
    const [localDialogState, setLocalDialogState] = useState(false);
    const [localSelectedRow, setLocalSelectedRow] = useState<Record<string, unknown> | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Centralized error handler for validation
    const getFieldError = (field: FormField, value: string): string => {
        let error = '';
        if (field.required && value.trim() === '') {
            error = 'This field is required';
        } else if (field.type === 'number') {
            if (value && isNaN(Number(value))) {
                error = 'Please enter a valid number';
            } else if (value && Number(value) < 0) {
                error = 'Number cannot be negative';
            }
        }
        return error;
    };

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

    const handleCloseDialog = () => {
        setLocalDialogState(false);
        handleClose();
    };

    // Add this helper function after validateAllFields
    const validateAllFieldsWithRow = (row: Record<string, unknown>) => {
        const errors: Record<string, string> = {};
        if (!fields) return errors;
        (fields as FormField[]).forEach((field) => {
            const value = row && row[field.id] ? String(row[field.id]) : '';
            const error = getFieldError(field, value);
            if (error) errors[field.id] = error;
        });
        return errors;
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
                {fields.map((field: FormField) => {
                    const value = field.id && localSelectedRow ? localSelectedRow[field.id] : '';
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
                                    if (/[^\d]/.test(paste)) {
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
                                        setFieldErrors(validateAllFieldsWithRow(updated));
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
