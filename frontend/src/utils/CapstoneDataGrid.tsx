import { Paper, Typography } from '@mui/material';
import { DataGrid, GridRowParams, GridValidRowModel } from '@mui/x-data-grid';
import { lazy, Suspense, useState } from 'react';
import { CapstoneDataGridType } from '../types/ViewComponentType';
import Loadable from '../ui-component/Loadable';
import { formatDialogFormRow } from './formatDialogFormRow';

const BankingAccountListDialog = Loadable(lazy(() => import('../views/banking/BankingAccountListDialog')));
const CoaCategoryDialog = Loadable(lazy(() => import('../views/coa/CoaCategoryDialog')));
const CoaLayoutDialog = Loadable(lazy(() => import('../views/coa/CoaLayoutDialog')));
const NominalCodeDialog = Loadable(lazy(() => import('../views/coa/NominalCodeDialog')));
const NominalTypeDialog = Loadable(lazy(() => import('../views/coa/NominalTypeDialog')));
const CustomerDialog = Loadable(lazy(() => import('../views/customers/CustomerDialog')));
const SupplierDialog = Loadable(lazy(() => import('../views/suppliers/SupplierDialog')));

function CapstoneDataGrid({ rows, columns, heading, dialog = '', url = '', handleDataChanged }: CapstoneDataGridType) {
    const [dialogState, setDialogState] = useState(false);
    const [dialogFormRow, setDialogFormRow] = useState<GridValidRowModel | null>(null);

    const height = rows.length > 0 ? 'auto' : 400;

    // Combined row click handler for clarity
    const handleRowClick = (params: GridRowParams) => {
        console.log('Clicked on row: ', params.row);
        setDialogFormRow(params.row);
        setDialogState(true);
    };

    // Dialog close handler
    const handleCloseDialog = () => {
        setDialogState(false);
        setDialogFormRow(null);
    };

    const componentMap = {
        BankingAccountListDialog: BankingAccountListDialog,
        CoaCategoryDialog: CoaCategoryDialog,
        CoaLayoutDialog: CoaLayoutDialog,
        CustomerDialog: CustomerDialog,
        NominalCodeDialog: NominalCodeDialog,
        NominalTypeDialog: NominalTypeDialog,
        SupplierDialog: SupplierDialog,
    };

    const DialogComponent = componentMap[dialog as keyof typeof componentMap] || null;

    // Format selectedRow using the utility
    const formattedDialogFormRow = formatDialogFormRow(dialogFormRow, dialog);

    return (
        <Paper elevation={2}>
            <Typography variant="h4" component="h2" sx={{ p: 2 }}>
                {heading}
            </Typography>
            <div style={{ height: height, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    onRowClick={handleRowClick}
                />
            </div>
            {DialogComponent && dialogState && formattedDialogFormRow && (
                <Suspense fallback={<div>Loading...</div>}>
                    <DialogComponent
                        dialogState={dialogState}
                        handleClose={handleCloseDialog}
                        selectedRow={formattedDialogFormRow}
                        handleDataChanged={handleDataChanged}
                        url={url}
                    />
                </Suspense>
            )}
        </Paper>
    );
}

export default CapstoneDataGrid;