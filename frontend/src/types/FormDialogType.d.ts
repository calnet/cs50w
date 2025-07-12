import { GridValidRowModel } from "@mui/x-data-grid";

export interface FormDialogType {
    formTitle?: string;
    contentText?: string;
    fields: TextFieldProps[];
    dialogState: boolean;
    handleClose: () => void;
    selectedRow: GridValidRowModel | null;
    url: string;
    handleDataChanged: () => void;
}
