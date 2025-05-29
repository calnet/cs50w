export interface ViewComponentDialogType {
    dialogState: boolean;
    handleClose: () => void;
    selectedRow: ViewComponentType | undefined | null;
    url: string;
    handleDataChanged: () => void;
}
