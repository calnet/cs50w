import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import PaperComponent from './PaperComponent';

function CapstoneFormDialog({ ...props }: FormDialogType) {
    const { formTitle, contentText, fields, dialogState, handleClose, handleDataChanged, selectedRow, url } = props;
    const [localDialogState, setLocalDialogState] = useState(false);
    const [localSelectedRow, setLocalSelectedRow] = useState<Record<string, unknown> | null>(null);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

    // Update local state when props change
    useEffect(() => {
        setLocalDialogState(dialogState);
        setLocalSelectedRow(selectedRow);
        setFieldErrors({}); // Reset errors when dialog opens
    }, [dialogState, selectedRow]);

    const handleCloseDialog = () => {
        setLocalDialogState(false);
        handleClose();
    };

    // Function to handle saving the form data
    const handleSaveDialog = () => {
        if (!localSelectedRow) {
            console.error('No data to save');
            return;
        }
        if (!url) {
            console.error('No URL provided for saving data');
            return;
        }

        // Call API to save the data
        axios
            .post(url, localSelectedRow)
            .then((response) => {
                console.log('Record saved successfully: ', response.data);
                handleCloseDialog();
                handleDataChanged();
            })
            .catch((error) => {
                console.error('Error saving record:', error.response?.data.errors || error.message);
                // alert('Error saving record: ' + error.response?.data?.errors || error.message);
            });
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
                {fields.map((field) => {
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
                            value={field.id && localSelectedRow ? localSelectedRow[field.id] : ''}
                            error={Boolean(fieldErrors[field.id])}
                            helperText={fieldErrors[field.id] || ''}
                            onChange={(e) => {
                                const value = e.target.value;
                                let error = '';

                                // Example validations
                                if (field.required && value.trim() === '') {
                                    error = 'This field is required';
                                } else if (field.type === 'number') {
                                    if (value && isNaN(Number(value))) {
                                        error = 'Please enter a valid number';
                                    } else if (value && Number(value) < 0) {
                                        error = 'Number cannot be negative';
                                    }
                                }

                                setFieldErrors((prev) => ({
                                    ...prev,
                                    [field.id]: error,
                                }));

                                const updatedRow = {
                                    ...(localSelectedRow ?? {}),
                                    [field.id]: value,
                                };
                                setLocalSelectedRow(updatedRow);
                            }}
                            onBlur={() => {
                                if (fieldErrors[field.id]) {
                                    setLocalSelectedRow((prev) => {
                                        if (!prev) return prev;
                                        const updated = { ...prev };
                                        updated[field.id] = '';
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
