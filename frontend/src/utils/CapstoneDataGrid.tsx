import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridRowParams, GridValidRowModel } from '@mui/x-data-grid';
import React, { lazy, Suspense, useCallback, useMemo, useState } from 'react';
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

    const height = rows.length > 0 ? 'auto' : 200;

    // Combined row click handler for clarity
    const handleRowClick = useCallback((params: GridRowParams) => {
        console.log('Clicked on row: ', params.row);
        setDialogFormRow(params.row);
        setDialogState(true);
    }, []);

    // Dialog close handler
    const handleCloseDialog = useCallback(() => {
        setDialogState(false);
        setDialogFormRow(null);
    }, []);

    const componentMap = useMemo(() => ({
        BankingAccountListDialog: BankingAccountListDialog,
        CoaCategoryDialog: CoaCategoryDialog,
        CoaLayoutDialog: CoaLayoutDialog,
        CustomerDialog: CustomerDialog,
        // LayoutDialog: LayoutDialog,
        NominalCodeDialog: NominalCodeDialog,
        NominalTypeDialog: NominalTypeDialog,
        SupplierDialog: SupplierDialog,
        // Add more components as needed
    }), []);

    const DialogComponent = componentMap[dialog as keyof typeof componentMap] || null;

    // Format selectedRow using the utility
    // Only compute formatted row when dialog is open and a row is selected
    const formattedDialogFormRow = useMemo(() => {
        if (!dialogState || !dialogFormRow) return null;
        return formatDialogFormRow(dialogFormRow, dialog);
    }, [dialogFormRow, dialog, dialogState]);

    // Optional: ErrorBoundary for dialog
    class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
        constructor(props: { children: React.ReactNode }) {
            super(props);
            this.state = { hasError: false };
        }
        static getDerivedStateFromError() { return { hasError: true }; }
        componentDidCatch(error: unknown, info: unknown) { console.error(error, info); }
        render() {
            if (this.state.hasError) return <div>Something went wrong in the dialog.</div>;
            return this.props.children;
        }
    }

    return (
        <>
            <Box sx={{ p: 1, typography: 'h3', color: 'cadetblue' }}>{heading}</Box>
            <Box component={Paper} height={height} minWidth={650}>
                <DataGrid
                    aria-label={heading}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    onRowClick={handleRowClick}
                />
                {DialogComponent && dialogState && formattedDialogFormRow && (
                    <ErrorBoundary>
                        <Suspense fallback={<div>Loading dialog...</div>}>
                            <DialogComponent
                                dialogState={dialogState}
                                handleClose={handleCloseDialog}
                                selectedRow={formattedDialogFormRow}
                                handleDataChanged={handleDataChanged}
                                url={url}
                            />
                        </Suspense>
                    </ErrorBoundary>
                )}
            </Box>
        </>
    );
}

export default CapstoneDataGrid;
