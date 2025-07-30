import {
    AccountBalance as BankIcon,
    Business as BusinessIcon,
    Calculate as CalculatorIcon,
    CloudDone as CloudIcon,
    CreditCard as CreditCardIcon,
    Dashboard as DashboardIcon,
    ManageAccounts,
    Message as MessageIcon,
    People as PeopleIcon,
    PersonAdd as PersonAddIcon,
    Security as SecurityIcon,
    Speed as SpeedIcon,
    TableView as TableIcon,
    TrendingUp as TrendingUpIcon,
    LocalShipping as TruckIcon
} from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Container,
    Fade,
    Grid,
    Grow,
    LinearProgress,
    Paper,
    Toolbar,
    Tooltip,
    Typography,
    useTheme
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardV1 = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [user] = useState({
        name: "Accounting User",
        role: "Financial Manager",
        isAuthenticated: true
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    // Core business modules based on your actual views
    const coreModules = [
        {
            name: "Banking",
            description: "Manage bank accounts and reconciliation",
            icon: BankIcon,
            url: "/banking",
            color: theme.palette.primary.main,
            gradient: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
            subViews: [
                "Banking Accounts",
                "Banking Reconciliation",
                "Banking Statements"
            ]
        },
        {
            name: "Chart of Accounts",
            description: "Manage COA structure and nominal codes",
            icon: CalculatorIcon,
            url: "/coa",
            color: theme.palette.success.main,
            gradient: `linear-gradient(135deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`,
            subViews: [
                "Layouts",
                "COA Categories",
                "COA Layout",
                "Nominal Types",
                "Nominal Codes",
                "COA Control Accounts"
            ]
        },
        {
            name: "Customers",
            description: "Customer account management",
            icon: PeopleIcon,
            url: "/customers",
            color: theme.palette.secondary.main,
            gradient: `linear-gradient(135deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.dark})`,
            subViews: [
                "Customer List",
                "Customer Invoices",
                "Customer Sales Orders"
            ]
        },
        {
            name: "Suppliers",
            description: "Supplier account management",
            icon: TruckIcon,
            url: "/suppliers",
            color: theme.palette.warning.main,
            gradient: `linear-gradient(135deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`,
            subViews: [
                "Supplier List",
                "Supplier Invoices",
                "Supplier Purchase Orders"
            ]
        }
    ];

    // Utility and development views
    const utilityViews = [
        {
            name: "Utilities",
            description: "Table components and UI utilities",
            icon: TableIcon,
            url: "/utilities",
            color: theme.palette.info.main,
            gradient: `linear-gradient(135deg, ${theme.palette.info.main}, ${theme.palette.info.dark})`,
            subViews: [
                "Basic Table",
                "Data Table",
                "Dense Table",
                "Enhanced Table",
                "Sticky Head Table"
            ]
        },
        {
            name: "Dialogs",
            description: "Form and draggable dialog components",
            icon: MessageIcon,
            url: "/utilities/dialogs",
            color: theme.palette.error.main,
            gradient: `linear-gradient(135deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
            subViews: [
                "Form Dialog",
                "Draggable Dialog"
            ]
        }
    ];

    // Quick action buttons for common tasks
    const quickActions = [
        {
            name: "Dashboard",
            description: "Main overview",
            icon: DashboardIcon,
            url: "/dashboard",
            color: theme.palette.grey[700]
        },
        {
            name: "New Customer",
            description: "Add customer account",
            icon: PersonAddIcon,
            url: "/customers/new",
            color: theme.palette.success.main
        },
        {
            name: "New Supplier",
            description: "Add supplier account",
            icon: BusinessIcon,
            url: "/suppliers/new",
            color: theme.palette.warning.main
        },
        {
            name: "Bank Account",
            description: "Add bank account",
            icon: CreditCardIcon,
            url: "/banking/new",
            color: theme.palette.info.main
        }
    ];

    // Sample metrics for the accounting system
    const systemMetrics = [
        {
            label: "Bank Accounts",
            value: "12",
            change: "+2",
            trend: "up",
            icon: BankIcon,
            progress: 75,
            color: theme.palette.primary.main
        },
        {
            label: "Active Customers",
            value: "247",
            change: "+18",
            trend: "up",
            icon: PeopleIcon,
            progress: 82,
            color: theme.palette.secondary.main
        },
        {
            label: "Active Suppliers",
            value: "89",
            change: "+5",
            trend: "up",
            icon: TruckIcon,
            progress: 65,
            color: theme.palette.warning.main
        },
        {
            label: "Nominal Codes",
            value: "156",
            change: "+8",
            trend: "up",
            icon: CalculatorIcon,
            progress: 90,
            color: theme.palette.success.main
        }
    ];

    const ModuleCard = ({ module, index }: { module: any; index: number }) => {
        const IconComponent = module.icon;
        const handleClick = () => {
            navigate(module.url);
        };

        return (
            <Grow in timeout={300 + index * 100}>
                <Card
                    sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'all 0.3s ease-in-out',
                        cursor: 'pointer',
                        '&:hover': {
                            transform: 'translateY(-8px)',
                            boxShadow: theme.shadows[12],
                        },
                    }}
                    onClick={handleClick}
                >
                    <Box
                        sx={{
                            background: module.gradient,
                            p: 2,
                            color: 'white',
                            position: 'relative',
                            overflow: 'hidden',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '100px',
                                height: '100px',
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '50%',
                                transform: 'translate(30px, -30px)',
                            },
                        }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>
                                <IconComponent />
                            </Avatar>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 600 }}>
                                {module.name}
                            </Typography>
                        </Box>
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                            {module.description}
                        </Typography>
                        {module.subViews && (
                            <Box>
                                <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                                    Available Views ({module.subViews.length}):
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {module.subViews.slice(0, 4).map((subView: string, index: number) => (
                                        <Chip
                                            key={index}
                                            label={subView}
                                            size="small"
                                            variant="outlined"
                                            sx={{
                                                fontSize: '0.7rem',
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': {
                                                    backgroundColor: module.color,
                                                    color: 'white',
                                                },
                                            }}
                                        />
                                    ))}
                                    {module.subViews.length > 4 && (
                                        <Chip
                                            label={`+${module.subViews.length - 4} more`}
                                            size="small"
                                            variant="outlined"
                                            sx={{ fontSize: '0.7rem' }}
                                        />
                                    )}
                                </Box>
                            </Box>
                        )}
                    </CardContent>
                </Card>
            </Grow>
        );
    };

    const QuickActionCard = ({ action, index }: { action: any; index: number }) => {
        const IconComponent = action.icon;
        const handleClick = () => {
            navigate(action.url);
        };

        return (
            <Fade in timeout={500 + index * 100}>
                <Card
                    sx={{
                        textAlign: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)',
                            boxShadow: theme.shadows[8],
                        },
                    }}
                    onClick={handleClick}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Avatar
                            sx={{
                                bgcolor: action.color,
                                mx: 'auto',
                                mb: 2,
                                width: 56,
                                height: 56,
                                transition: 'all 0.3s ease-in-out',
                            }}
                        >
                            <IconComponent sx={{ fontSize: 28 }} />
                        </Avatar>
                        <Typography variant="h6" component="h3" sx={{ mb: 1, fontWeight: 600 }}>
                            {action.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {action.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Fade>
        );
    };

    const MetricCard = ({ metric, index }: { metric: any; index: number }) => {
        const IconComponent = metric.icon;
        return (
            <Grow in timeout={200 + index * 100}>
                <Paper
                    sx={{
                        p: 3,
                        background: `linear-gradient(135deg, ${metric.color}15, ${metric.color}05)`,
                        border: `1px solid ${metric.color}30`,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                            transform: 'translateY(-4px)',
                            boxShadow: theme.shadows[8],
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                {metric.label}
                            </Typography>
                            <Typography variant="h4" component="div" sx={{ mb: 1, fontWeight: 700 }}>
                                {metric.value}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                                <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                                <Typography variant="body2">
                                    {metric.change} this month
                                </Typography>
                            </Box>
                        </Box>
                        <Avatar sx={{ bgcolor: metric.color, ml: 2 }}>
                            <IconComponent />
                        </Avatar>
                    </Box>
                    <LinearProgress
                        variant="determinate"
                        value={metric.progress}
                        sx={{
                            height: 6,
                            borderRadius: 3,
                            backgroundColor: `${metric.color}20`,
                            '& .MuiLinearProgress-bar': {
                                backgroundColor: metric.color,
                            },
                        }}
                    />
                </Paper>
            </Grow>
        );
    };

    if (loading) {
        return (
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: `linear-gradient(135deg, ${theme.palette.primary.main}10, ${theme.palette.secondary.main}10)`,
            }}>
                <SpeedIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" sx={{ mb: 2 }}>Loading Dashboard...</Typography>
                <LinearProgress sx={{ width: 200 }} />
            </Box>
        );
    }

    return (
        <Box sx={{ flexGrow: 1, background: `linear-gradient(135deg, ${theme.palette.background.default}, ${theme.palette.grey[50]})` }}>
            {/* Enhanced Header */}
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    color: 'white'
                }}
            >
                <Toolbar sx={{ py: 1 }}>
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 0.5 }}>
                            Accounting System Dashboard
                        </Typography>
                        <Typography variant="body1" sx={{ opacity: 0.9 }}>
                            CS50 Capstone Project - Financial Management Platform
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Tooltip title="System Status">
                            <Chip
                                icon={<CloudIcon />}
                                label="Online"
                                color="success"
                                variant="filled"
                                sx={{ color: 'white' }}
                            />
                        </Tooltip>
                        <Box sx={{ textAlign: 'right' }}>
                            <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                {user.name}
                            </Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>
                                {user.role}
                            </Typography>
                        </Box>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', border: '2px solid rgba(255,255,255,0.3)' }}>
                            <ManageAccounts />
                        </Avatar>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* System Metrics */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                        System Overview
                    </Typography>
                    <Grid container spacing={3}>
                        {systemMetrics.map((metric, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <MetricCard metric={metric} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Core Business Modules */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                        Core Business Modules
                    </Typography>
                    <Grid container spacing={3}>
                        {coreModules.map((module, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <ModuleCard module={module} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Quick Actions */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                        Quick Actions
                    </Typography>
                    <Grid container spacing={3}>
                        {quickActions.map((action, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <QuickActionCard action={action} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Development & Utilities */}
                <Box sx={{ mb: 6 }}>
                    <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700, textAlign: 'center' }}>
                        Development & Utilities
                    </Typography>
                    <Grid container spacing={3}>
                        {utilityViews.map((utility, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <ModuleCard module={utility} index={index} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Enhanced Technical Architecture */}
                <Fade in timeout={1000}>
                    <Paper sx={{ p: 4, mb: 4, background: `linear-gradient(135deg, ${theme.palette.background.paper}, ${theme.palette.grey[50]})` }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                            <SecurityIcon sx={{ mr: 2, color: 'primary.main', fontSize: 32 }} />
                            <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
                                Technical Architecture
                            </Typography>
                        </Box>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={4}>
                                <Box sx={{ p: 3, bgcolor: 'primary.50', borderRadius: 2, height: '100%' }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'primary.main' }}>
                                        Frontend Stack
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {['React + TypeScript', 'Material-UI (MUI)', 'React Router', 'Axios HTTP Client'].map((tech, index) => (
                                            <Chip
                                                key={index}
                                                label={tech}
                                                color="primary"
                                                variant="outlined"
                                                size="small"
                                                sx={{ justifyContent: 'flex-start' }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ p: 3, bgcolor: 'success.50', borderRadius: 2, height: '100%' }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'success.main' }}>
                                        Backend Features
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {['Django REST API', 'SQLite Database', 'CRUD Operations', 'Data Validation'].map((feature, index) => (
                                            <Chip
                                                key={index}
                                                label={feature}
                                                color="success"
                                                variant="outlined"
                                                size="small"
                                                sx={{ justifyContent: 'flex-start' }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <Box sx={{ p: 3, bgcolor: 'secondary.50', borderRadius: 2, height: '100%' }}>
                                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'secondary.main' }}>
                                        Key Components
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                        {['Data Grids', 'Form Dialogs', 'CRUD Operations', 'Responsive Design'].map((component, index) => (
                                            <Chip
                                                key={index}
                                                label={component}
                                                color="secondary"
                                                variant="outlined"
                                                size="small"
                                                sx={{ justifyContent: 'flex-start' }}
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>
                </Fade>
            </Container>
        </Box>
    );
};

export default DashboardV1;