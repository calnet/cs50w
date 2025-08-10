import { GridValidRowModel } from '@mui/x-data-grid';

export interface FormDialog {
    formTitle?: string;
    contentText?: string;
    fields: TextFieldProps[];
    dialogState: boolean;
    handleClose: () => void;
    selectedRow: GridValidRowModel | null;
    url: string;
    handleDataChanged: () => void;
}
