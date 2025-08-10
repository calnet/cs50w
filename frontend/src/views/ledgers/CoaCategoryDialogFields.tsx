import { FormField } from '../../types/FormField';

const CoaCategoryDialogFields: FormField[] = [
    {
        autoFocus: true,
        disabled: true,
        fullWidth: true,
        id: 'id',
        label: 'ID',
        margin: 'dense',
        required: false,
        sx: { flexBasis: '25%', maxWidth: '25%' },
        type: 'number',
        variant: 'outlined',
    },
    {
        autoFocus: true,
        disabled: false,
        fullWidth: true,
        id: 'category_name',
        label: 'COA Category',
        margin: 'dense',
        required: false,
        sx: { flexBasis: '75%', maxWidth: '75%' },
        type: 'text',
        variant: 'outlined',
    },
    {
        autoFocus: false,
        disabled: true,
        fullWidth: true,
        id: 'created_at',
        label: 'Created',
        margin: 'dense',
        required: false,
        sx: { flexBasis: '50%', maxWidth: '50%' },
        type: 'text',
        variant: 'outlined',
    },
    {
        autoFocus: false,
        disabled: true,
        fullWidth: true,
        id: 'updated_at',
        label: 'Updated',
        margin: 'dense',
        required: false,
        sx: { flexBasis: '50%', maxWidth: '50%' },
        type: 'text',
        variant: 'outlined',
    },
];

export default CoaCategoryDialogFields;
