import {
    Add as AddIcon,
    Refresh as RefreshIcon
} from '@mui/icons-material';
import {
    Box,
    Chip,
    Fade,
    IconButton,
    Paper,
    Skeleton,
    Stack,
    Tooltip,
    Typography
} from '@mui/material';
import {
    DataGrid,
    GridColDef,
    GridRowParams,
    GridToolbar,
    GridValidRowModel
} from '@mui/x-data-grid';
import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import ErrorBoundary from '../components/ErrorBoundary';
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

function CapstoneDataGrid({
    rows,
    columns,
    heading,
    dialog = '',
    url = '',
    handleDataChanged
}: CapstoneDataGridType) {
    const [dialogState, setDialogState] = useState(false);
    const [dialogFormRow, setDialogFormRow] = useState<GridValidRowModel | null>(null);
    const [loading, setLoading] = useState(false);

    const height = rows.length > 0 ? 'auto' : 400;

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

    // Refresh handler
    const handleRefresh = useCallback(() => {
        setLoading(true);
        handleDataChanged();
        setTimeout(() => setLoading(false), 500); // Brief loading state for UX
    }, [handleDataChanged]);

    // Add new record handler
    const handleAddNew = useCallback(() => {
        const emptyRow = columns.reduce((acc, col) => {
            acc[col.field] = '';
            return acc;
        }, {} as GridValidRowModel);
        setDialogFormRow(emptyRow);
        setDialogState(true);
    }, [columns]);

    const componentMap = useMemo(() => ({
        BankingAccountListDialog: BankingAccountListDialog,
        CoaCategoryDialog: CoaCategoryDialog,
        CoaLayoutDialog: CoaLayoutDialog,
        CustomerDialog: CustomerDialog,
        NominalCodeDialog: NominalCodeDialog,
        NominalTypeDialog: NominalTypeDialog,
        SupplierDialog: SupplierDialog,
    }), []);

    const DialogComponent = componentMap[dialog as keyof typeof componentMap] || null;

    // Format selectedRow using the utility
    const formattedDialogFormRow = useMemo(() => {
        if (!dialogState || !dialogFormRow) return null;
        return formatDialogFormRow(dialogFormRow, dialog);
    }, [dialogFormRow, dialog, dialogState]);

    // Enhanced columns with better styling
    const enhancedColumns: GridColDef[] = useMemo(() => {
        return columns.map(col => ({
            ...col,
            headerClassName: 'data-grid-header',
            cellClassName: 'data-grid-cell',
        }));
    }, [columns]);

    const CustomToolbar = () => (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            borderBottom: 1,
            borderColor: 'divider'
        }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="h5" component="h2" sx={{
                    fontWeight: 600,
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                }}>
                    {heading}
                    <Chip
                        label={`${rows.length} records`}
                        size="small"
                        color="primary"
                        variant="outlined"
                    />
                </Typography>
            </Box>

            <Stack direction="row" spacing={1}>
                <Tooltip title="Add New Record">
                    <IconButton
                        onClick={handleAddNew}
                        color="primary"
                        sx={{
                            '&:hover': {
                                transform: 'scale(1.1)',
                                transition: 'transform 0.2s ease-in-out',
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Refresh Data">
                    <IconButton
                        onClick={handleRefresh}
                        disabled={loading}
                        sx={{
                            '&:hover': {
                                transform: 'rotate(180deg)',
                                transition: 'transform 0.3s ease-in-out',
                            },
                        }}
                    >
                        <RefreshIcon />
                    </IconButton>
                </Tooltip>
            </Stack>
        </Box>
    );

    if (rows.length === 0 && !loading) {
        return (
            <Paper sx={{ p: 4, textAlign: 'center', minHeight: 300 }}>
                <CustomToolbar />
                <Box sx={{ py: 4 }}>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        No data available
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Get started by adding your first record
                    </Typography>
                    <IconButton
                        onClick={handleAddNew}
                        color="primary"
                        size="large"
                        sx={{
                            bgcolor: 'primary.main',
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'primary.dark',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <AddIcon />
                    </IconButton>
                </Box>
            </Paper>
        );
    }

    return (
        <Fade in timeout={300}>
            <Paper
                elevation={2}
                sx={{
                    overflow: 'hidden',
                    borderRadius: 2,
                    '& .data-grid-header': {
                        backgroundColor: 'grey.100',
                        fontWeight: 600,
                        fontSize: '0.875rem',
                        color: 'text.primary',
                    },
                    '& .data-grid-cell': {
                        borderBottom: '1px solid',
                        borderColor: 'grey.200',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                        },
                    },
                    '& .MuiDataGrid-row': {
                        cursor: 'pointer',
                        transition: 'all 0.2s ease-in-out',
                        '&:hover': {
                            backgroundColor: 'action.hover',
                            transform: 'translateY(-1px)',
                            boxShadow: 1,
                        },
                    },
                    '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                    },
                    '& .MuiDataGrid-columnHeader:focus': {
                        outline: 'none',
                    },
                }}
            >
                <CustomToolbar />

                {loading ? (
                    <Box sx={{ p: 2 }}>
                        {[...Array(5)].map((_, index) => (
                            <Skeleton
                                key={index}
                                variant="rectangular"
                                height={52}
                                sx={{ mb: 1, borderRadius: 1 }}
                            />
                        ))}
                    </Box>
                ) : (
                    <Box sx={{ height: height, minHeight: 400 }}>
                        <DataGrid
                            rows={rows}
                            columns={enhancedColumns}
                            initialState={{
                                pagination: {
                                    paginationModel: { page: 0, pageSize: 10 },
                                },
                            }}
                            pageSizeOptions={[5, 10, 25, 50]}
                            onRowClick={handleRowClick}
                            disableRowSelectionOnClick
                            slots={{
                                toolbar: GridToolbar,
                            }}
                            slotProps={{
                                toolbar: {
                                    showQuickFilter: true,
                                    quickFilterProps: { debounceMs: 500 },
                                },
                            }}
                            sx={{
                                border: 'none',
                                '& .MuiDataGrid-toolbarContainer': {
                                    borderBottom: 1,
                                    borderColor: 'divider',
                                    p: 1,
                                },
                                '& .MuiDataGrid-footerContainer': {
                                    borderTop: 1,
                                    borderColor: 'divider',
                                },
                            }}
                        />
                    </Box>
                )}

                {DialogComponent && dialogState && formattedDialogFormRow && (
                    <ErrorBoundary>
                        <Suspense fallback={
                            <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                                <Typography>Loading dialog...</Typography>
                            </Box>
                        }>
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
            </Paper>
        </Fade>
    );
}

export default CapstoneDataGrid;