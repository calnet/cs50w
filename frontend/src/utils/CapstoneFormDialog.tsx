import { Alert, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { GridValidRowModel } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FormDialogType } from '../types/FormDialogType';
import type { FormFieldType } from '../types/FormField';
import PaperComponent from './PaperComponent';
import { formatDialogFormRow } from './formatDialogFormRow';

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

    // Function to handle saving the form data
    const handleSaveDialog = async () => {
        if (!localSelectedRow) {
            console.error('No data to save');
            return;
        }
        if (!url) {
            console.error('No URL provided for saving data');
            return;
        }
        try {
            const response = await axios.post(url, localSelectedRow);
            console.log('Record saved successfully: ', response.data);
            handleCloseDialog();
            handleDataChanged();
        } catch (error) {
            console.error('Error saving record: ', error);
        }
    };

    // Handle field value change
    const handleFieldChange = (field: FormFieldType, newValue: string) => {
        const updatedRow = {
            ...(localSelectedRow ?? {}),
            [field.id]: newValue,
        };
        setLocalSelectedRow(updatedRow);
    };

    useEffect(() => {
        setLocalDialogState(dialogState);
        setLocalSelectedRow(selectedRow);
    }, [dialogState, selectedRow]);

    const handleCloseDialog = () => {
        setLocalDialogState(false);
        handleClose();
    };

    const renderField = (field: FormFieldType) => {
        const value = localSelectedRow?.[field.id] ?? '';
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
                sx={field.sx}
                value={value}
                onChange={(e) => handleFieldChange(field, e.target.value)}
            />
        );
    };

    return (
        <Dialog
            open={localDialogState}
            onClose={handleCloseDialog}
            PaperComponent={PaperComponent}
            aria-labelledby="draggable-dialog-title"
            maxWidth="md"
            fullWidth
        >
            <DialogTitle sx={{ cursor: 'move' }} id="draggable-dialog-title">
                {formTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
                {fields.map(renderField)}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleSaveDialog}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CapstoneFormDialog;