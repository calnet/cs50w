export interface FormDialogType {
    formTitle?: string;
    contentText?: string;
    fields: TextFieldProps[];
    dialogState: boolean;
    handleClose: () => void;
    // eslint-disable-next-line
    selectedRow: any;
    // TODO: Fix the type of selectedRow
    // selectedRow: ViewComponentType | any;
    url: string;
    handleDataChanged: () => void;
}
