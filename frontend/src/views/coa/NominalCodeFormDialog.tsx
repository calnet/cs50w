import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    PaperProps,
    TextField,
    TextFieldProps,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { NominalRecordProps } from './NominalCode';

interface FormDialogProps {
    formTitle?: string;
    contentText?: string;
    fields: TextFieldProps[];
    open: boolean;
    handleClose: () => void;
    // eslint-disable-next-line
    selectedRow: NominalRecordProps | any;
}

function PaperComponent(props: PaperProps) {
    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

function NominalCodeFormDialog({ formTitle, contentText, fields, open, handleClose, selectedRow }: FormDialogProps) {
    const [localOpen, setLocalOpen] = useState(false);
    const [localSelectedRow, setLocalSelectedRow] = useState(null);

    // Update local state when props change
    useEffect(() => {
        setLocalOpen(open);
        setLocalSelectedRow(selectedRow);
    }, [open, selectedRow]);

    const handleCloseDialog = () => {
        setLocalOpen(false);
        handleClose();
    };

    return (
        <Dialog open={localOpen} onClose={handleCloseDialog} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
            <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {formTitle}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
                {fields.map((field) => {
                    // TODO: return the correct field type
                    return (
                        <TextField
                            key={field.id}
                            autoFocus={field.autoFocus}
                            margin={field.margin}
                            id={field.id}
                            label={field.label}
                            type={field.type}
                            fullWidth={field.fullWidth}
                            variant={field.variant}
                            value={field.id && localSelectedRow ? localSelectedRow[field.id] : ''}
                        />
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button onClick={handleCloseDialog}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default NominalCodeFormDialog;
