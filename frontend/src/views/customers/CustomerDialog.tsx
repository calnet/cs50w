import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import CustomerDialogFields from './CustomerDialogFields';

function CustomerDialog({ ...props }: ViewComponentDialogType) {
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
