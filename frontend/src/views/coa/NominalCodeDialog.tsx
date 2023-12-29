import { NominalRecordProps } from './NominalCode';
import { NominalCodeDialogFields } from './NominalCodeDialogFields';
import NominalCodeFormDialog from './NominalCodeFormDialog';

interface NominalCodeDialogProps {
    open: boolean;
    handleClose: () => void;
    selectedRow: NominalRecordProps | undefined | null;
}

function NominalCodeDialog({ open, handleClose, selectedRow }: NominalCodeDialogProps) {
    return NominalCodeFormDialog({
        formTitle: 'Nominal Code Details',
        // contentText: 'View Nominal Code Record',
        fields: NominalCodeDialogFields,
        open: open,
        handleClose: handleClose,
        selectedRow: selectedRow,
    });
}

export default NominalCodeDialog;
