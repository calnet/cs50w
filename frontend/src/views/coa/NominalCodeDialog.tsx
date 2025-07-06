import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import { NominalCodeDialogFields } from './NominalCodeDialogFields';
import { formatTimestamp } from '../../utils/formatUtils';

function NominalCodeDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    // Format nominal_code as 4-digit string with leading zeros and format timestamps
    const formattedRow = selectedRow
        ? {
              ...selectedRow,
              nominal_code: String(selectedRow.nominal_code ?? '').padStart(4, '0'),
              created_at: formatTimestamp(selectedRow.created_at),
              updated_at: formatTimestamp(selectedRow.updated_at),
          }
        : selectedRow;

    return CapstoneFormDialog({
        formTitle: 'Nominal Code Details',
        contentText: 'View Nominal Code Record',
        fields: NominalCodeDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: formattedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default NominalCodeDialog;
