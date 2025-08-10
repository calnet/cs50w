import type { TextFieldProps } from '@mui/material/TextField';

export interface FormField {
    autoFocus: boolean;
    disabled: boolean;
    fullWidth: boolean;
    id: string;
    label: string;
    margin: TextFieldProps['margin'];
    required: boolean;
    sx: object;
    type: string;
    variant: TextFieldProps['variant'];
    options?: { label: string; value: string | number }[]; // For select fields
}
