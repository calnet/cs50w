import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import { formatTimestamp } from '../../utils/formatUtils';
import BankingAccountListDialogFields from './BankingAccountListDialogFields';

function BankingAccountListDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    const formattedRow = selectedRow
        ? {
              ...selectedRow,
              opening_balance_date: formatTimestamp(selectedRow.opening_balance_date),
              created_at: formatTimestamp(selectedRow.created_at),
              updated_at: formatTimestamp(selectedRow.updated_at),
          }
        : selectedRow;

    return CapstoneFormDialog({
        formTitle: 'Bank Account Details',
        contentText: 'View Bank Account record',
        fields: BankingAccountListDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: formattedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default BankingAccountListDialog;
