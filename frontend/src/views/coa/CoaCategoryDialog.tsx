import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import CoaCategoryDialogFields from './CoaCategoryDialogFields';
import { formatTimestamp } from '../../utils/formatUtils';

function CoaCategoryDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    const formattedRow = selectedRow
        ? {
              ...selectedRow,
              created_at: formatTimestamp(selectedRow.created_at),
              updated_at: formatTimestamp(selectedRow.updated_at),
          }
        : selectedRow;

    return CapstoneFormDialog({
        formTitle: 'Coa Category Details',
        contentText: 'View Coa Category Record',
        fields: CoaCategoryDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: formattedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default CoaCategoryDialog;
