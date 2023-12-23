import { TextFieldProps } from '@mui/material';
import CapstoneFormDialog from '../../utils/CapstoneFormDialog';

const customerFields: TextFieldProps[] = [
    {
        autoFocus: true,
        margin: 'dense',
        id: 'firstName',
        label: 'First Name',
        type: 'text',
        fullWidth: true,
        variant: 'outlined',
    },
    {
        autoFocus: false,
        margin: 'dense',
        id: 'lastName',
        label: 'Last Name',
        type: 'text',
        fullWidth: true,
        variant: 'outlined',
    },
    {
        autoFocus: false,
        margin: 'dense',
        id: 'email',
        label: 'Email Address',
        type: 'email',
        fullWidth: true,
        variant: 'outlined',
    },
];

function CustomerDialog() {
    return CapstoneFormDialog({ formTitle: 'New Customer', contentText: 'Add a new customer', fields: customerFields });
}

export default CustomerDialog;
