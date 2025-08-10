import React, { useState, useEffect } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Stack,
    Chip,
    IconButton,
    Tooltip,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    FormControl,
    InputLabel,
    Select,
    Alert,
    Fab,
    useTheme,
    useMediaQuery,
} from '@mui/material';
import {
    Add,
    Edit,
    Delete,
    PostAdd,
    FilterList,
    Search,
    GetApp,
    MoreVert,
    Visibility,
} from '@mui/icons-material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { Transaction, TransactionFilters } from '../../types/transactions.d';

const TransactionList: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<TransactionFilters>({});
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [postDialogOpen, setPostDialogOpen] = useState(false);

    // Sage-style colors
    const sageColors = {
        primary: '#2E7D32',
        secondary: '#1565C0',
        success: '#388E3C',
        warning: '#F9A825',
        error: '#D32F2F',
        background: '#F8F9FA',
        surface: '#FFFFFF',
    };

    useEffect(() => {
        autoLoginAndLoadData();
    }, [filters]);

    const autoLoginAndLoadData = async () => {
        try {
            setLoading(true);

            // Check if already have token
            const existingToken = localStorage.getItem('access_token');
            if (!existingToken) {
                // Auto-login with demo credentials
                const loginResponse = await apiService.auth.login('admin@example.com', 'admin123');
                if (loginResponse.access) {
                    localStorage.setItem('access_token', loginResponse.access);
                    localStorage.setItem('refresh_token', loginResponse.refresh);
                }
            }

            // Now load transactions
            await loadTransactions();
        } catch (err: any) {
            setError('Failed to authenticate or load transactions');
            console.error('TransactionList error:', err);
        }
    };

    const loadTransactions = async () => {
        try {
            const response = await apiService.transactions.getAll(filters);
            setTransactions(response.results || []);
        } catch (err: any) {
            setError('Failed to load transactions');
            console.error('Error loading transactions:', err);
            throw err; // Re-throw to be caught by autoLoginAndLoadData
        } finally {
            setLoading(false);
        }
    };

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, transaction: Transaction) => {
        setAnchorEl(event.currentTarget);
        setSelectedTransaction(transaction);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedTransaction(null);
    };

    const handlePostTransaction = async () => {
        if (!selectedTransaction) return;

        try {
            await apiService.transactions.post(selectedTransaction.id!);
            loadTransactions();
            setPostDialogOpen(false);
            handleMenuClose();
        } catch (err: any) {
            setError('Failed to post transaction');
        }
    };

    const handleDeleteTransaction = async () => {
        if (!selectedTransaction) return;

        try {
            await apiService.transactions.delete(selectedTransaction.id!);
            loadTransactions();
            setDeleteDialogOpen(false);
            handleMenuClose();
        } catch (err: any) {
            setError('Failed to delete transaction');
        }
    };

    const formatCurrency = (amount: number): string => {
        return new Intl.NumberFormat('en-GB', {
            style: 'currency',
            currency: 'GBP'
        }).format(amount);
    };

    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'draft': return sageColors.warning;
            case 'posted': return sageColors.success;
            case 'cancelled': return sageColors.error;
            default: return '#757575';
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'transaction_number',
            headerName: 'Transaction No.',
            minWidth: 120,
            flex: 0.8,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="text"
                    onClick={() => navigate(`/transactions/${params.row.id}`)}
                    sx={{
                        color: sageColors.primary,
                        fontWeight: 600,
                        textTransform: 'none',
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        p: { xs: 0.5, sm: 1 },
                    }}
                >
                    {params.value}
                </Button>
            ),
        },
        {
            field: 'transaction_date',
            headerName: 'Date',
            minWidth: 100,
            flex: 0.6,
            valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
        },
        {
            field: 'transaction_type_name',
            headerName: 'Type',
            minWidth: 100,
            flex: 0.7,
            hide: isMobile, // Hide on mobile screens
        },
        {
            field: 'description',
            headerName: 'Description',
            minWidth: 150,
            flex: 2,
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}
                    title={params.value}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'customer_name',
            headerName: 'Customer',
            minWidth: 120,
            flex: 0.8,
            hide: isTablet, // Hide on tablet and smaller
            valueGetter: (params) => params.row.customer_name || params.row.supplier_name || '-',
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}
                    title={params.value}
                >
                    {params.value}
                </Box>
            ),
        },
        {
            field: 'gross_amount',
            headerName: 'Amount',
            minWidth: 100,
            flex: 0.7,
            align: 'right',
            headerAlign: 'right',
            valueFormatter: (params) => formatCurrency(params.value),
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 80,
            flex: 0.6,
            renderCell: (params: GridRenderCellParams) => (
                <Chip
                    label={params.value.toUpperCase()}
                    size="small"
                    sx={{
                        bgcolor: getStatusColor(params.value),
                        color: 'white',
                        fontWeight: 600,
                        minWidth: { xs: 60, sm: 70 },
                        fontSize: { xs: '0.65rem', sm: '0.75rem' },
                    }}
                />
            ),
        },
        {
            field: 'actions',
            headerName: 'Actions',
            minWidth: 60,
            flex: 0.4,
            sortable: false,
            renderCell: (params: GridRenderCellParams) => (
                <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, params.row)}
                    sx={{
                        color: sageColors.primary,
                        p: { xs: 0.5, sm: 1 },
                    }}
                >
                    <MoreVert fontSize={isMobile ? 'small' : 'medium'} />
                </IconButton>
            ),
        },
    ];

    return (
        <Box sx={{
            p: { xs: 2, sm: 3 },
            bgcolor: sageColors.background,
            minHeight: '100vh'
        }}>
            {/* Header */}
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'stretch', sm: 'center' }}
                spacing={{ xs: 2, sm: 0 }}
                sx={{ mb: 3 }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700, color: '#212121' }}>
                    Transactions
                </Typography>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button
                        variant="outlined"
                        startIcon={<FilterList />}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                            borderColor: sageColors.primary,
                            color: sageColors.primary,
                        }}
                    >
                        Filters
                    </Button>
                    <Button
                        variant="outlined"
                        startIcon={<GetApp />}
                        size={isMobile ? 'small' : 'medium'}
                        sx={{
                            borderColor: sageColors.primary,
                            color: sageColors.primary,
                        }}
                    >
                        Export
                    </Button>
                </Stack>
            </Stack>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
                    {error}
                </Alert>
            )}

            {/* Filters */}
            <Card sx={{ mb: 3, bgcolor: sageColors.surface }}>
                <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <TextField
                            placeholder="Search transactions..."
                            variant="outlined"
                            size="small"
                            InputProps={{
                                startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                            }}
                            sx={{ minWidth: 250 }}
                            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                        />
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                value={filters.status || ''}
                                label="Status"
                                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                            >
                                <MenuItem value="">All</MenuItem>
                                <MenuItem value="draft">Draft</MenuItem>
                                <MenuItem value="posted">Posted</MenuItem>
                                <MenuItem value="cancelled">Cancelled</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="From Date"
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
                        />
                        <TextField
                            label="To Date"
                            type="date"
                            size="small"
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
                        />
                    </Stack>
                </CardContent>
            </Card>

            {/* Transaction Grid */}
            <Card sx={{ bgcolor: sageColors.surface, overflow: 'auto' }}>
                <DataGrid
                    rows={transactions}
                    columns={columns}
                    loading={loading}
                    autoHeight
                    pageSize={25}
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    disableSelectionOnClick
                    checkboxSelection={false}
                    density="compact"
                    sx={{
                        border: 'none',
                        minWidth: { xs: 600, sm: 800, md: 1000 }, // Minimum width for horizontal scroll
                        '& .MuiDataGrid-columnHeaders': {
                            bgcolor: `${sageColors.primary}10`,
                            color: sageColors.primary,
                            fontWeight: 600,
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        },
                        '& .MuiDataGrid-row': {
                            '&:hover': {
                                bgcolor: `${sageColors.primary}05`,
                            },
                            minHeight: { xs: 40, sm: 52 }, // Responsive row height
                        },
                        '& .MuiDataGrid-cell': {
                            fontSize: { xs: '0.75rem', sm: '0.875rem' },
                            padding: { xs: '4px 8px', sm: '8px 16px' },
                        },
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none', // Hide column separators for cleaner look
                        },
                        '& .MuiDataGrid-footerContainer': {
                            borderTop: `1px solid ${sageColors.primary}20`,
                        },
                    }}
                />
            </Card>

            {/* Floating Action Button */}
            <Fab
                color="primary"
                size={isMobile ? 'medium' : 'large'}
                sx={{
                    position: 'fixed',
                    bottom: { xs: 16, sm: 24 },
                    right: { xs: 16, sm: 24 },
                    bgcolor: sageColors.primary,
                    '&:hover': {
                        bgcolor: sageColors.primary,
                        filter: 'brightness(0.9)',
                    },
                }}
                onClick={() => navigate('/transactions/new')}
            >
                <Add />
            </Fab>

            {/* Context Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    navigate(`/transactions/${selectedTransaction?.id}`);
                    handleMenuClose();
                }}>
                    <Visibility sx={{ mr: 1 }} /> View
                </MenuItem>
                <MenuItem onClick={() => {
                    navigate(`/transactions/${selectedTransaction?.id}/edit`);
                    handleMenuClose();
                }}>
                    <Edit sx={{ mr: 1 }} /> Edit
                </MenuItem>
                {selectedTransaction?.status === 'draft' && (
                    <MenuItem onClick={() => {
                        setPostDialogOpen(true);
                        handleMenuClose();
                    }}>
                        <PostAdd sx={{ mr: 1 }} /> Post
                    </MenuItem>
                )}
                <MenuItem
                    onClick={() => {
                        setDeleteDialogOpen(true);
                        handleMenuClose();
                    }}
                    sx={{ color: sageColors.error }}
                >
                    <Delete sx={{ mr: 1 }} /> Delete
                </MenuItem>
            </Menu>

            {/* Post Transaction Dialog */}
            <Dialog open={postDialogOpen} onClose={() => setPostDialogOpen(false)}>
                <DialogTitle>Post Transaction</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to post transaction {selectedTransaction?.transaction_number}?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setPostDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handlePostTransaction} variant="contained" color="primary">
                        Post Transaction
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Delete Transaction Dialog */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Transaction</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete transaction {selectedTransaction?.transaction_number}?
                        This action cannot be undone.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteTransaction} variant="contained" color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default TransactionList;
