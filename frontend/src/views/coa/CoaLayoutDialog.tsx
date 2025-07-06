import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import { formatTimestamp } from '../../utils/formatUtils';
import { CoaLayoutDialogFields } from './CoaLayoutDialogFields';

function CoaLayoutDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    // Format nominal_code_min, nominal_code_max, created_at, updated_at
    const formattedRow = selectedRow
        ? {
              ...selectedRow,
              nominal_code_min:
                  selectedRow.nominal_code_min !== undefined && selectedRow.nominal_code_min !== null
                      ? String(selectedRow.nominal_code_min).padStart(4, '0')
                      : '',
              nominal_code_max:
                  selectedRow.nominal_code_max !== undefined && selectedRow.nominal_code_max !== null
                      ? String(selectedRow.nominal_code_max).padStart(4, '0')
                      : '',
              created_at: formatTimestamp(selectedRow.created_at),
              updated_at: formatTimestamp(selectedRow.updated_at),
          }
        : selectedRow;

    return CapstoneFormDialog({
        formTitle: 'Coa Layout Details',
        contentText: 'View Coa Layout Record',
        fields: CoaLayoutDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: formattedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default CoaLayoutDialog;
