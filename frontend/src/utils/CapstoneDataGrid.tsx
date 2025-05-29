import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { lazy, useState } from 'react';
import { CapstoneDataGridType } from '../types/ViewComponentType';
import Loadable from '../ui-component/Loadable';

const BankingAccountListDialog = Loadable(lazy(() => import('../views/banking/BankingAccountListDialog')));
const CoaCategoryDialog = Loadable(lazy(() => import('../views/coa/CoaCategoryDialog')));
const CoaLayoutDialog = Loadable(lazy(() => import('../views/coa/CoaLayoutDialog')));
const NominalCodeDialog = Loadable(lazy(() => import('../views/coa/NominalCodeDialog')));
const NominalTypeDialog = Loadable(lazy(() => import('../views/coa/NominalTypeDialog')));
const CustomerDialog = Loadable(lazy(() => import('../views/customers/CustomerDialog')));
const SupplierDialog = Loadable(lazy(() => import('../views/suppliers/SupplierDialog')));

function CapstoneDataGrid({ rows, columns, heading, dialog = '', url = '', handleDataChanged }: CapstoneDataGridType) {
    const [dialogState, setDialogState] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const height = rows.length > 0 ? 'auto' : 200;

    const handleRowClick = (params: GridRowParams) => {
        console.log(params.row);
        setDialogState(true);
    };

    const componentMap = {
        BankingAccountListDialog: BankingAccountListDialog,
        CoaCategoryDialog: CoaCategoryDialog,
        CoaLayoutDialog: CoaLayoutDialog,
        CustomerDialog: CustomerDialog,
        // LayoutDialog: LayoutDialog,
        NominalCodeDialog: NominalCodeDialog,
        NominalTypeDialog: NominalTypeDialog,
        SupplierDialog: SupplierDialog,

        // Add more components as needed
    };

    let DialogComponent = null;

    if (dialog in componentMap) {
        DialogComponent = componentMap[dialog as keyof typeof componentMap];
    }

    return (
        <>
            <Box sx={{ p: 1, typography: 'h3', color: 'cadetblue' }}>{heading}</Box>
            <Box component={Paper} height={height} minWidth={650}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    onRowClick={(params: GridRowParams) => {
                        setSelectedRow(params.row);
                        handleRowClick(params);
                    }}

                    // checkboxSelection
                />
                {DialogComponent && (
                    <DialogComponent
                        dialogState={dialogState}
                        handleClose={() => setDialogState(false)}
                        selectedRow={selectedRow}
                        handleDataChanged={handleDataChanged}
                        url={url}
                    />
                )}
            </Box>
        </>
    );
}

export default CapstoneDataGrid;
