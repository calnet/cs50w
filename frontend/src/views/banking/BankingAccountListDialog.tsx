import { ViewComponentDialog } from '../../types/ViewComponentDialog';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import BankingAccountListDialogFields from './BankingAccountListDialogFields';

function BankingAccountListDialog({ ...props }: ViewComponentDialog) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;
    return CapstoneFormDialog({
        formTitle: 'Bank Account Details',
        contentText: 'View Bank Account record',
        fields: BankingAccountListDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: selectedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default BankingAccountListDialog;
