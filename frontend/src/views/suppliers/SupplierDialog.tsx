import { ViewComponentDialog } from '../../types/ViewComponentDialog';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import SupplierDialogFields from './SupplierDialogFields';

function SupplierDialog({ ...props }: ViewComponentDialog) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;
    return CapstoneFormDialog({
        formTitle: 'Supplier Details',
        contentText: 'View Supplier Record Details',
        fields: SupplierDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: selectedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default SupplierDialog;
