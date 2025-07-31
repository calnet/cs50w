import {
    Timeline as ActivityIcon,
    Add as AddIcon,
    AccountBalance as BankIcon,
    Calculate as CalculatorIcon,
    Launch as LaunchIcon,
    Message as MessageIcon,
    People as PeopleIcon,
    TableView as TableIcon,
    TrendingUp as TrendingUpIcon,
    LocalShipping as TruckIcon
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Container,
    Grid,
    IconButton,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Toolbar,
    Typography,
    useTheme
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface DataRow {
    [key: string]: any;
}

interface BankingData {
    id: number;
    account_name: string;
    account_number: string;
    balance: number;
    account_status: string;
}

interface CustomerData {
    id: number;
    account_reference: string;
    account_name: string;
    balance: number;
    contact_name: string;
}

interface SupplierData {
    id: number;
    account_reference: string;
    account_name: string;
    balance: number;
    contact_name: string;
}

interface COAData {
    id: number;
    category_name: string;
    created_at: string;
}

interface DashboardData {
    banking: BankingData[];
    customers: CustomerData[];
    suppliers: SupplierData[];
    coaCategories: COAData[];
}

interface ModuleConfig {
    name: string;
    description: string;
    icon: OverridableComponent<SvgIconTypeMap>;
    url: string;
    color: string;
    data: DataRow[];
    columns: { key: string; label: string; format?: string }[];
}

const CapstoneDashboard = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [data, setData] = useState<DashboardData>({
        banking: [],
        customers: [],
        suppliers: [],
        coaCategories: []
    });
    const [loading, setLoading] = useState(true);

    const hostname = window.location.hostname;

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const endpoints = [
                    `http://${hostname}:8000/api/banking/`,
                    `http://${hostname}:8000/api/customers/`,
                    `http://${hostname}:8000/api/suppliers/`,
                    `http://${hostname}:8000/api/coa_categories/`
                ];

                const fetchPromises = endpoints.map(async (url) => {
                    try {
                        const response = await axios.get(url);
                        return response.data || [];
                    } catch {
                        return [];
                    }
                });

                const [bankingData, customersData, suppliersData, coaData] = await Promise.all(fetchPromises);

                setData({
                    banking: bankingData.slice(0, 5),
                    customers: customersData.slice(0, 5),
                    suppliers: suppliersData.slice(0, 5),
                    coaCategories: coaData.slice(0, 5)
                });
            } catch (error) {
                // Demo data fallback
                setData({
                    banking: [
                        { id: 1, account_name: 'Current Account', account_number: '12345678', balance: 15000.50, account_status: 'Active' },
                        { id: 2, account_name: 'Savings Account', account_number: '87654321', balance: 25000.00, account_status: 'Active' }
                    ],
                    customers: [
                        { id: 1, account_reference: 'CUST001', account_name: 'ABC Limited', balance: 5000.00, contact_name: 'John Smith' },
                        { id: 2, account_reference: 'CUST002', account_name: 'XYZ Corp', balance: 3500.75, contact_name: 'Jane Doe' }
                    ],
                    suppliers: [
                        { id: 1, account_reference: 'SUPP001', account_name: 'Office Supplies Ltd', balance: -2000.00, contact_name: 'Mike Johnson' },
                        { id: 2, account_reference: 'SUPP002', account_name: 'Tech Solutions', balance: -1500.50, contact_name: 'Sarah Wilson' }
                    ],
                    coaCategories: [
                        { id: 1, category_name: 'Assets', created_at: new Date().toISOString() },
                        { id: 2, category_name: 'Liabilities', created_at: new Date().toISOString() }
                    ]
                });
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [hostname]);

    const modules: ModuleConfig[] = [
        {
            name: "Banking Accounts",
            description: "Manage bank accounts and reconciliation",
            icon: BankIcon,
            url: "/banking",
            color: theme.palette.primary.main,
            data: data.banking,
            columns: [
                { key: 'account_name', label: 'Account Name' },
                { key: 'account_number', label: 'Account #' },
                { key: 'balance', label: 'Balance', format: 'currency' },
                { key: 'account_status', label: 'Status' }
            ]
        },
        {
            name: "Customers",
            description: "Customer account management",
            icon: PeopleIcon,
            url: "/customers",
            color: theme.palette.success.main,
            data: data.customers,
            columns: [
                { key: 'account_reference', label: 'Ref' },
                { key: 'account_name', label: 'Customer Name' },
                { key: 'balance', label: 'Balance', format: 'currency' },
                { key: 'contact_name', label: 'Contact' }
            ]
        },
        {
            name: "Suppliers",
            description: "Supplier account management",
            icon: TruckIcon,
            url: "/suppliers",
            color: theme.palette.warning.main,
            data: data.suppliers,
            columns: [
                { key: 'account_reference', label: 'Ref' },
                { key: 'account_name', label: 'Supplier Name' },
                { key: 'balance', label: 'Balance', format: 'currency' },
                { key: 'contact_name', label: 'Contact' }
            ]
        },
        {
            name: "COA Categories",
            description: "Chart of Account categories",
            icon: CalculatorIcon,
            url: "/coa",
            color: theme.palette.secondary.main,
            data: data.coaCategories,
            columns: [
                { key: 'id', label: 'ID' },
                { key: 'category_name', label: 'Category Name' },
                { key: 'created_at', label: 'Created', format: 'date' }
            ]
        }
    ];

    const formatValue = (value: any, format?: string) => {
        if (!value && value !== 0) return '-';

        switch (format) {
            case 'currency':
                return new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP'
                }).format(value);
            case 'date':
                return new Date(value).toLocaleDateString('en-GB');
            default:
                return value;
        }
    };

    const DataGridPreview = ({ module }: { module: ModuleConfig }) => {
        const IconComponent = module.icon;

        const handleViewAll = () => navigate(module.url);
        const handleAddNew = () => console.log(`Add new ${module.name}`);

        if (loading) {
            return (
                <Card>
                    <CardContent>
                        <Skeleton variant="text" width="60%" height={30} />
                        <Skeleton variant="rectangular" width="100%" height={200} sx={{ mt: 2 }} />
                    </CardContent>
                </Card>
            );
        }

        return (
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <Box sx={{ bgcolor: module.color, color: 'white', p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <IconComponent sx={{ mr: 2 }} />
                            <Box>
                                <Typography variant="h6" component="h3">
                                    {module.name}
                                </Typography>
                                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                                    {module.description}
                                </Typography>
                            </Box>
                        </Box>
                        <Box>
                            <IconButton size="small" sx={{ color: 'white', mr: 1 }} onClick={handleAddNew}>
                                <AddIcon />
                            </IconButton>
                            <IconButton size="small" sx={{ color: 'white' }} onClick={handleViewAll}>
                                <LaunchIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 0 }}>
                    {module.data.length > 0 ? (
                        <TableContainer>
                            <Table size="small">
                                <TableHead>
                                    <TableRow>
                                        {module.columns.map((col, index) => (
                                            <TableCell key={index}>{col.label}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {module.data.map((row, index) => (
                                        <TableRow
                                            key={index}
                                            hover
                                            sx={{ cursor: 'pointer' }}
                                            onClick={() => console.log('Row clicked:', row)}
                                        >
                                            {module.columns.map((col, colIndex) => (
                                                <TableCell key={colIndex}>
                                                    {formatValue(row[col.key], col.format)}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 4 }}>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>
                                No data available
                            </Typography>
                            <Button variant="contained" onClick={handleAddNew} sx={{ bgcolor: module.color }}>
                                Add First Entry
                            </Button>
                        </Box>
                    )}
                </CardContent>

                {module.data.length > 0 && (
                    <Box sx={{ p: 2, bgcolor: 'grey.50', borderTop: 1, borderColor: 'divider' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="caption" color="text.secondary">
                                Showing {module.data.length} of latest entries
                            </Typography>
                            <Button size="small" onClick={handleViewAll}>
                                View All →
                            </Button>
                        </Box>
                    </Box>
                )}
            </Card>
        );
    };

    const quickStats = [
        { label: "Bank Accounts", value: data.banking.length, icon: BankIcon, color: theme.palette.primary.main },
        { label: "Customers", value: data.customers.length, icon: PeopleIcon, color: theme.palette.success.main },
        { label: "Suppliers", value: data.suppliers.length, icon: TruckIcon, color: theme.palette.warning.main },
        { label: "COA Categories", value: data.coaCategories.length, icon: CalculatorIcon, color: theme.palette.secondary.main }
    ];

    const utilityActions = [
        { name: "Utilities", icon: TableIcon, url: "/utilities" },
        { name: "Dialogs", icon: MessageIcon, url: "/utilities/dialogs" }
    ];

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Accounting System Dashboard - Capstone
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            CS50 Capstone - Live Data Overview
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                                Live Data
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {loading ? 'Loading...' : 'Real-time updates'}
                            </Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: 'primary.main' }}>
                            <ActivityIcon />
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* Quick Stats */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        System Overview
                    </Typography>
                    <Grid container spacing={3}>
                        {quickStats.map((stat, index) => {
                            const IconComponent = stat.icon;
                            return (
                                <Grid item xs={12} sm={6} md={3} key={index}>
                                    <Paper sx={{ p: 3 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Box>
                                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                                    {stat.label}
                                                </Typography>
                                                <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                                                    {stat.value}
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                                                    <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                                                    <Typography variant="body2">Active</Typography>
                                                </Box>
                                            </Box>
                                            <Avatar sx={{ bgcolor: stat.color }}>
                                                <IconComponent />
                                            </Avatar>
                                        </Box>
                                    </Paper>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Data Grid Previews */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Data Overview
                    </Typography>
                    <Grid container spacing={3}>
                        {modules.map((module, index) => (
                            <Grid item xs={12} lg={6} key={index}>
                                <DataGridPreview module={module} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Utilities */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Development & Utilities
                    </Typography>
                    <Grid container spacing={2}>
                        {utilityActions.map((action, index) => {
                            const IconComponent = action.icon;
                            return (
                                <Grid item xs={6} md={3} key={index}>
                                    <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={() => navigate(action.url)}>
                                        <CardContent>
                                            <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto', mb: 2 }}>
                                                <IconComponent />
                                            </Avatar>
                                            <Typography variant="h6">{action.name}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>

                {/* Project Info */}
                <Paper sx={{ p: 4 }}>
                    <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
                        CS50 Capstone Project Features
                    </Typography>
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Technical Implementation</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {['React + TypeScript', 'Material-UI (MUI)', 'Django REST API', 'PostgreSQL Database'].map((tech, index) => (
                                    <Chip key={index} label={tech} color="primary" variant="outlined" />
                                ))}
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Typography variant="h6" sx={{ mb: 2 }}>Business Features</Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                {['Banking Management', 'Customer Relations', 'Supplier Management', 'Chart of Accounts'].map((feature, index) => (
                                    <Chip key={index} label={feature} color="success" variant="outlined" />
                                ))}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    );
};

export default CapstoneDashboard;