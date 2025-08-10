import { ViewComponentDialog } from '../../types/ViewComponentDialog';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import { CoaLayoutDialogFields } from './CoaLayoutDialogFields';

function CoaLayoutDialog({ ...props }: ViewComponentDialog) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;
    return CapstoneFormDialog({
        formTitle: 'Coa Layout Details',
        contentText: 'View Coa Layout Record',
        fields: CoaLayoutDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: selectedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default CoaLayoutDialog;
