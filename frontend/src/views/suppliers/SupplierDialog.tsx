import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import SupplierDialogFields from './SupplierDialogFields';

function SupplierDialog({ ...props }: ViewComponentDialogType) {
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
