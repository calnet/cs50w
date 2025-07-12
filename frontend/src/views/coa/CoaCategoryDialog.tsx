import { ViewComponentDialogType } from '../../types/ViewComponentDialogType';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import CoaCategoryDialogFields from './CoaCategoryDialogFields';

function CoaCategoryDialog({ ...props }: ViewComponentDialogType) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;
    return CapstoneFormDialog({
        formTitle: 'Coa Category Details',
        contentText: 'View Coa Category Record',
        fields: CoaCategoryDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: selectedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default CoaCategoryDialog;
