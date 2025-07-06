import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import CustomerDialogFields from './CustomerDialogFields';
import { formatTimestamp } from '../../utils/formatUtils';

function CustomerDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    const formattedRow = selectedRow
        ? {
              ...selectedRow,
              created_at: formatTimestamp(selectedRow.created_at),
              updated_at: formatTimestamp(selectedRow.updated_at),
          }
        : selectedRow;

    return CapstoneFormDialog({
        formTitle: 'Customer Details',
        contentText: 'View Customer Record Details',
        fields: CustomerDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: formattedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default CustomerDialog;
