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
import { useRef, useState } from 'react';
import Draggable from 'react-draggable';

interface FormDialogProps {
    formTitle: string;
    contentText?: string;
    fields: TextFieldProps[];
}

function PaperComponent(props: PaperProps) {
    const nodeRef = useRef(null);
    return (
        <Draggable nodeRef={nodeRef} handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} ref={nodeRef} />
        </Draggable>
    );
}

function CapstoneFormDialog({ formTitle, contentText, fields }: FormDialogProps) {
    const [open, setOpen] = useState(true);

    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} PaperComponent={PaperComponent} aria-labelledby="draggable-dialog-title">
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
                        />
                    );
                })}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClose}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}

export default CapstoneFormDialog;
