import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import BankingAccountListDialogFields from './BankingAccountListDialogFields';

function BankingAccountListDialog({ ...props }: ViewComponentDialogType) {
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
