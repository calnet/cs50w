import { ViewComponentDialog } from '../../types/ViewComponentDialog';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';
import { NominalTypeDialogFields } from './NominalTypeDialogFields';

function NominalTypeDialog({ ...props }: ViewComponentDialog) {
    const { dialogState, handleClose, selectedRow, url, handleDataChanged } = props;
    return CapstoneFormDialog({
        formTitle: 'Nominal Type Details',
        contentText: 'View Nominal Type Record',
        fields: NominalTypeDialogFields,
        dialogState: dialogState,
        handleClose: handleClose,
        selectedRow: selectedRow,
        url: url,
        handleDataChanged: handleDataChanged,
    });
}

export default NominalTypeDialog;
