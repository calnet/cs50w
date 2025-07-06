import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import { NominalTypeDialogFields } from './NominalTypeDialogFields';
import { formatTimestamp } from '../../utils/formatUtils';

function NominalTypeDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;

    const formattedRow = selectedRow
        ? {
              ...selectedRow,
              created_at: formatTimestamp(selectedRow.created_at),
              updated_at: formatTimestamp(selectedRow.updated_at),
          }
        : selectedRow;

    return CapstoneFormDialog({
        formTitle: 'Nominal Type Details',
        contentText: 'View Nominal Type Record',
        fields: NominalTypeDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: formattedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default NominalTypeDialog;
