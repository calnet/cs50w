import { CoaLayoutRecordProps } from './CoaLayout';
import { CoaLayoutDialogFields } from './CoaLayoutDialogFields';
import CoaLayoutFormDialog from './CoaLayoutFormDialog';

interface CoaLayoutDialogProps {
    open: boolean;
    handleClose: () => void;
    selectedRow: CoaLayoutRecordProps | undefined | null;
}

function CoaLayoutDialog({ open, handleClose, selectedRow }: CoaLayoutDialogProps) {
    return CoaLayoutFormDialog({
        formTitle: 'Coa Layout Details',
        contentText: 'View Coa Layout Record',
        fields: CoaLayoutDialogFields,
        open: open,
        handleClose: handleClose,
        selectedRow: selectedRow,
    });
}

export default CoaLayoutDialog;
