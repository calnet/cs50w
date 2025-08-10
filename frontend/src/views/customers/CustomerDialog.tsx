import { ViewComponentDialog } from '../../types/ViewComponentDialog';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import CustomerDialogFields from './CustomerDialogFields';

function CustomerDialog({ ...props }: ViewComponentDialog) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    return CapstoneFormDialog({
        formTitle: 'Customer Details',
        contentText: 'View Customer Record Details',
        fields: CustomerDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: selectedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default CustomerDialog;
