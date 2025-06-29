import type { TextFieldProps } from '@mui/material/TextField';

export interface FormField {
    id: string;
    label: string;
    type: string;
    required?: boolean;
    disabled?: boolean;
    autoFocus?: boolean;
    margin?: TextFieldProps['margin'];
    fullWidth?: boolean;
    variant?: TextFieldProps['variant'];
    sx?: object;
}
