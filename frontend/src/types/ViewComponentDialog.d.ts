import { GridValidRowModel } from '@mui/x-data-grid';

export interface ViewComponentDialog {
    dialogState: boolean;
    handleClose: () => void;
    selectedRow: GridValidRowModel | null;
    url: string;
    handleDataChanged: () => void;
}
