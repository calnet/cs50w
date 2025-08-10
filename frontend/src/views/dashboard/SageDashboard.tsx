import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Chip,
    Avatar,
    Stack,
    LinearProgress,
    Paper,
    IconButton,
    Tooltip,
    Alert,
    useMediaQuery,
    useTheme,
} from '@mui/material';
import {
    TrendingUp,
    Receipt,
    People,
    Business,
    Assessment,
    Refresh,
    FilterList,
    GetApp,
    Notifications,
    Warning,
    CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/api';
import { DashboardSummary, Transaction } from '../../types/transactions.d';
import { QuickAction } from '../../types/accounting.d';

const SageDashboard: React.FC = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const isTablet = useMediaQuery(theme.breakpoints.down('md'));
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

    const [summary, setSummary] = useState<DashboardSummary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Sage-style color palette
    const sageColors = {
        primary: '#2E7D32',      // Sage Green
        secondary: '#1565C0',     // Professional Blue
        accent: '#F57C00',        // Amber
        success: '#388E3C',       // Success Green
        warning: '#F9A825',       // Warning Yellow
        error: '#D32F2F',         // Error Red
        background: '#F8F9FA',    // Light Gray
        surface: '#FFFFFF',       // White
        text: '#212121',          // Dark Gray
        textSecondary: '#757575', // Medium Gray
    };

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Load dashboard summary data
            const summaryResponse = await apiService.transactions.getDashboardSummary();

            // Set summary from API response
            setSummary(summaryResponse.data || {
                total_transactions: 0,
                draft_transactions: 0,
                posted_transactions: 0,
                total_value: 0,
                recent_transactions: []
            });

        } catch (err: any) {
            setError('Failed to load dashboard data');
            console.error('Error loading dashboard data:', err);

            // Set default summary on error
            setSummary({
                total_transactions: 0,
                draft_transactions: 0,
                posted_transactions: 0,
                total_value: 0,
                recent_transactions: []
            });
        } finally {
            setLoading(false);
        }
    };

    const quickActions: QuickAction[] = [
        {
            id: 'new-invoice',
            title: 'New Sales Invoice',
            description: 'Create customer invoice',
            icon: 'Receipt',
            url: '/transactions/new/invoice',
            color: sageColors.primary,
        },
        {
            id: 'new-payment',
            title: 'Record Payment',
            description: 'Log customer payment',
            icon: 'AccountBalance',
            url: '/transactions/new/payment',
            color: sageColors.secondary,
        },
        {
            id: 'new-purchase',
            title: 'Purchase Invoice',
            description: 'Enter supplier bill',
            icon: 'Business',
            url: '/transactions/new/purchase',
            color: sageColors.accent,
        },
        {
            id: 'bank-entry',
            title: 'Bank Entry',
            description: 'Record bank transaction',
            icon: 'AccountBalance',
            url: '/banking/new',
            color: sageColors.success,
        },
    ];

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
            default: return sageColors.textSecondary;
        }
    };

    if (loading) {
        return (
            <Box sx={{ p: 3 }}>
                <LinearProgress sx={{ mb: 2 }} />
                <Typography>Loading dashboard...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Alert severity="error" action={
                    <Button onClick={loadDashboardData} color="inherit">
                        Retry
                    </Button>
                }>
                    {error}
                </Alert>
            </Box>
        );
    }

    return (
        <Box sx={{
            bgcolor: sageColors.background,
            minHeight: '100vh',
            p: isMobile ? 2 : 3
        }}>
            {/* Header Section */}
            <Box sx={{ mb: isMobile ? 3 : 4 }}>
                <Stack
                    direction={isMobile ? "column" : "row"}
                    justifyContent="space-between"
                    alignItems={isMobile ? "flex-start" : "center"}
                    spacing={isMobile ? 2 : 0}
                    sx={{ mb: 2 }}
                >
                    <Typography
                        variant={isMobile ? "h5" : "h4"}
                        sx={{
                            fontWeight: 700,
                            color: sageColors.text,
                            fontFamily: '"Segoe UI", "Helvetica Neue", Arial, sans-serif',
                            fontSize: isMobile ? '1.5rem' : '2rem'
                        }}
                    >
                        Sage Accounts Dashboard
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={isMobile ? 0.5 : 1}
                        sx={{
                            flexWrap: 'wrap',
                            justifyContent: isMobile ? 'center' : 'flex-end'
                        }}
                    >
                        <Tooltip title="Refresh Data">
                            <IconButton
                                onClick={loadDashboardData}
                                sx={{
                                    color: sageColors.primary,
                                    p: isMobile ? 1 : 1.5
                                }}
                            >
                                <Refresh sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Filters">
                            <IconButton sx={{
                                color: sageColors.primary,
                                p: isMobile ? 1 : 1.5
                            }}>
                                <FilterList sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Export">
                            <IconButton sx={{
                                color: sageColors.primary,
                                p: isMobile ? 1 : 1.5
                            }}>
                                <GetApp sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Notifications">
                            <IconButton sx={{
                                color: sageColors.primary,
                                p: isMobile ? 1 : 1.5
                            }}>
                                <Notifications sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                            </IconButton>
                        </Tooltip>
                    </Stack>
                </Stack>

                <Typography
                    variant={isMobile ? "body1" : "subtitle1"}
                    sx={{
                        color: sageColors.textSecondary,
                        fontSize: isMobile ? '0.9rem' : '1rem',
                        textAlign: isMobile ? 'center' : 'left'
                    }}
                >
                    Welcome back! Here's what's happening with your business today.
                </Typography>
            </Box>

            {/* Key Metrics Cards */}
            {summary && (
                <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4 }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{
                            bgcolor: sageColors.surface,
                            border: `1px solid ${sageColors.primary}20`,
                            borderLeft: `4px solid ${sageColors.primary}`,
                            height: '100%',
                        }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={isMobile ? 1.5 : 2}
                                >
                                    <Avatar sx={{
                                        bgcolor: sageColors.primary,
                                        width: isMobile ? 40 : 48,
                                        height: isMobile ? 40 : 48
                                    }}>
                                        <Receipt sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant={isMobile ? "h5" : "h4"}
                                            sx={{
                                                fontWeight: 700,
                                                color: sageColors.text,
                                                fontSize: isMobile ? '1.5rem' : '2rem'
                                            }}
                                        >
                                            {summary.total_transactions}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: sageColors.textSecondary,
                                                fontSize: isMobile ? '0.8rem' : '0.875rem'
                                            }}
                                        >
                                            Total Transactions
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{
                            bgcolor: sageColors.surface,
                            border: `1px solid ${sageColors.secondary}20`,
                            borderLeft: `4px solid ${sageColors.secondary}`,
                            height: '100%',
                        }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={isMobile ? 1.5 : 2}
                                >
                                    <Avatar sx={{
                                        bgcolor: sageColors.secondary,
                                        width: isMobile ? 40 : 48,
                                        height: isMobile ? 40 : 48
                                    }}>
                                        <TrendingUp sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant={isMobile ? "h5" : "h4"}
                                            sx={{
                                                fontWeight: 700,
                                                color: sageColors.text,
                                                fontSize: isMobile ? '1.5rem' : '2rem'
                                            }}
                                        >
                                            {formatCurrency(summary.total_value)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: sageColors.textSecondary,
                                                fontSize: isMobile ? '0.8rem' : '0.875rem'
                                            }}
                                        >
                                            Total Value
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{
                            bgcolor: sageColors.surface,
                            border: `1px solid ${sageColors.warning}20`,
                            borderLeft: `4px solid ${sageColors.warning}`,
                            height: '100%',
                        }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={isMobile ? 1.5 : 2}
                                >
                                    <Avatar sx={{
                                        bgcolor: sageColors.warning,
                                        width: isMobile ? 40 : 48,
                                        height: isMobile ? 40 : 48
                                    }}>
                                        <Warning sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant={isMobile ? "h5" : "h4"}
                                            sx={{
                                                fontWeight: 700,
                                                color: sageColors.text,
                                                fontSize: isMobile ? '1.5rem' : '2rem'
                                            }}
                                        >
                                            {summary.draft_transactions}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: sageColors.textSecondary,
                                                fontSize: isMobile ? '0.8rem' : '0.875rem'
                                            }}
                                        >
                                            Draft Transactions
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Card sx={{
                            bgcolor: sageColors.surface,
                            border: `1px solid ${sageColors.success}20`,
                            borderLeft: `4px solid ${sageColors.success}`,
                            height: '100%',
                        }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={isMobile ? 1.5 : 2}
                                >
                                    <Avatar sx={{
                                        bgcolor: sageColors.success,
                                        width: isMobile ? 40 : 48,
                                        height: isMobile ? 40 : 48
                                    }}>
                                        <CheckCircle sx={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }} />
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant={isMobile ? "h5" : "h4"}
                                            sx={{
                                                fontWeight: 700,
                                                color: sageColors.text,
                                                fontSize: isMobile ? '1.5rem' : '2rem'
                                            }}
                                        >
                                            {summary.posted_transactions}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            sx={{
                                                color: sageColors.textSecondary,
                                                fontSize: isMobile ? '0.8rem' : '0.875rem'
                                            }}
                                        >
                                            Posted Transactions
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            )}

            <Grid container spacing={isMobile ? 2 : 3}>
                {/* Quick Actions */}
                <Grid item xs={12} lg={isDesktop ? 8 : 12}>
                    <Card sx={{ bgcolor: sageColors.surface, mb: 3 }}>
                        <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                            <Typography variant="h6" sx={{
                                fontWeight: 600,
                                color: sageColors.text,
                                mb: isMobile ? 1.5 : 2,
                                fontSize: isMobile ? '1.1rem' : '1.25rem'
                            }}>
                                Quick Actions
                            </Typography>
                            <Grid container spacing={isMobile ? 1.5 : 2}>
                                {quickActions.map((action) => (
                                    <Grid
                                        item
                                        xs={isMobile ? 12 : 6}
                                        sm={6}
                                        md={isTablet ? 6 : 3}
                                        lg={3}
                                        key={action.id}
                                    >
                                        <Button
                                            variant="outlined"
                                            fullWidth
                                            onClick={() => navigate(action.url)}
                                            sx={{
                                                height: isMobile ? 70 : 80,
                                                borderColor: action.color,
                                                color: action.color,
                                                borderWidth: 1.5,
                                                '&:hover': {
                                                    bgcolor: `${action.color}10`,
                                                    borderColor: action.color,
                                                    borderWidth: 2,
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: `0 4px 8px ${action.color}20`,
                                                },
                                                transition: 'all 0.2s ease-in-out',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                gap: isMobile ? 0.5 : 1,
                                                p: isMobile ? 1.5 : 2,
                                            }}
                                        >
                                            <Typography
                                                variant={isMobile ? "body2" : "subtitle2"}
                                                sx={{
                                                    fontWeight: 600,
                                                    fontSize: isMobile ? '0.875rem' : '0.95rem',
                                                    textAlign: 'center',
                                                    lineHeight: 1.2
                                                }}
                                            >
                                                {action.title}
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    opacity: 0.7,
                                                    fontSize: isMobile ? '0.75rem' : '0.8rem',
                                                    textAlign: 'center',
                                                    lineHeight: 1.1
                                                }}
                                            >
                                                {action.description}
                                            </Typography>
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>

                    {/* Recent Transactions */}
                    {summary?.recent_transactions && (
                        <Card sx={{ bgcolor: sageColors.surface }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Stack
                                    direction={isMobile ? "column" : "row"}
                                    justifyContent="space-between"
                                    alignItems={isMobile ? "flex-start" : "center"}
                                    spacing={isMobile ? 1 : 0}
                                    sx={{ mb: 2 }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            fontWeight: 600,
                                            color: sageColors.text,
                                            fontSize: isMobile ? '1.1rem' : '1.25rem'
                                        }}
                                    >
                                        Recent Transactions
                                    </Typography>
                                    <Button
                                        size={isMobile ? "medium" : "small"}
                                        onClick={() => navigate('/transactions')}
                                        sx={{
                                            color: sageColors.primary,
                                            alignSelf: isMobile ? 'stretch' : 'auto',
                                            justifyContent: isMobile ? 'center' : 'flex-start'
                                        }}
                                    >
                                        View All
                                    </Button>
                                </Stack>
                                <Stack spacing={isMobile ? 1.5 : 1}>
                                    {summary.recent_transactions.map((transaction: Transaction) => (
                                        <Paper
                                            key={transaction.id}
                                            sx={{
                                                p: isMobile ? 1.5 : 2,
                                                border: `1px solid ${sageColors.primary}10`,
                                                cursor: 'pointer',
                                                borderRadius: 2,
                                                '&:hover': {
                                                    bgcolor: `${sageColors.primary}05`,
                                                    transform: 'translateY(-1px)',
                                                    boxShadow: 2,
                                                },
                                                transition: 'all 0.2s ease-in-out',
                                            }}
                                            onClick={() => navigate(`/transactions/${transaction.id}`)}
                                        >
                                            <Stack
                                                direction={isMobile ? "column" : "row"}
                                                justifyContent="space-between"
                                                alignItems={isMobile ? "flex-start" : "center"}
                                                spacing={isMobile ? 1.5 : 0}
                                            >
                                                <Box sx={{ flex: 1 }}>
                                                    <Typography
                                                        variant="subtitle2"
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: isMobile ? '0.9rem' : '0.95rem'
                                                        }}
                                                    >
                                                        {transaction.transaction_number}
                                                    </Typography>
                                                    <Typography
                                                        variant="body2"
                                                        sx={{
                                                            color: sageColors.textSecondary,
                                                            fontSize: isMobile ? '0.85rem' : '0.875rem',
                                                            mb: isMobile ? 0.5 : 0
                                                        }}
                                                    >
                                                        {transaction.description}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: sageColors.textSecondary,
                                                            fontSize: isMobile ? '0.75rem' : '0.8rem'
                                                        }}
                                                    >
                                                        {new Date(transaction.transaction_date).toLocaleDateString()}
                                                    </Typography>
                                                </Box>
                                                <Stack
                                                    alignItems={isMobile ? "flex-start" : "flex-end"}
                                                    spacing={1}
                                                    sx={{
                                                        width: isMobile ? '100%' : 'auto',
                                                        flexDirection: isMobile ? 'row' : 'column',
                                                        justifyContent: isMobile ? 'space-between' : 'flex-start'
                                                    }}
                                                >
                                                    <Typography
                                                        variant={isMobile ? "subtitle1" : "h6"}
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: isMobile ? '1rem' : '1.1rem'
                                                        }}
                                                    >
                                                        {formatCurrency(transaction.gross_amount)}
                                                    </Typography>
                                                    <Chip
                                                        label={transaction.status.toUpperCase()}
                                                        size="small"
                                                        sx={{
                                                            bgcolor: getStatusColor(transaction.status),
                                                            color: 'white',
                                                            fontWeight: 600,
                                                            fontSize: isMobile ? '0.7rem' : '0.75rem',
                                                            height: isMobile ? 24 : 28,
                                                        }}
                                                    />
                                                </Stack>
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Stack>
                            </CardContent>
                        </Card>
                    )}
                </Grid>

                {/* Sidebar - Alerts and Navigation */}
                <Grid item xs={12} lg={isDesktop ? 4 : 12}>
                    <Stack spacing={isMobile ? 2 : 3}>
                        {/* System Alerts */}
                        <Card sx={{ bgcolor: sageColors.surface }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: sageColors.text,
                                        mb: isMobile ? 1.5 : 2,
                                        fontSize: isMobile ? '1.1rem' : '1.25rem'
                                    }}
                                >
                                    System Alerts
                                </Typography>
                                <Stack spacing={isMobile ? 1.5 : 2}>
                                    <Alert
                                        severity="warning"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiAlert-message': {
                                                fontSize: isMobile ? '0.85rem' : '0.875rem'
                                            }
                                        }}
                                    >
                                        <Typography variant="body2">
                                            3 draft transactions need posting
                                        </Typography>
                                    </Alert>
                                    <Alert
                                        severity="info"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiAlert-message': {
                                                fontSize: isMobile ? '0.85rem' : '0.875rem'
                                            }
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Bank reconciliation due for Current Account
                                        </Typography>
                                    </Alert>
                                    <Alert
                                        severity="success"
                                        variant="outlined"
                                        sx={{
                                            '& .MuiAlert-message': {
                                                fontSize: isMobile ? '0.85rem' : '0.875rem'
                                            }
                                        }}
                                    >
                                        <Typography variant="body2">
                                            Monthly backup completed successfully
                                        </Typography>
                                    </Alert>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Quick Reports */}
                        <Card sx={{ bgcolor: sageColors.surface }}>
                            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 600,
                                        color: sageColors.text,
                                        mb: isMobile ? 1.5 : 2,
                                        fontSize: isMobile ? '1.1rem' : '1.25rem'
                                    }}
                                >
                                    Quick Reports
                                </Typography>
                                <Stack spacing={isMobile ? 0.5 : 1}>
                                    <Button
                                        variant="text"
                                        fullWidth
                                        startIcon={<Assessment />}
                                        onClick={() => navigate('/reports/profit-loss')}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: sageColors.text,
                                            fontSize: isMobile ? '0.875rem' : '0.95rem',
                                            py: isMobile ? 1 : 1.5,
                                            '&:hover': {
                                                bgcolor: `${sageColors.primary}10`,
                                                transform: 'translateX(4px)'
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        Profit & Loss
                                    </Button>
                                    <Button
                                        variant="text"
                                        fullWidth
                                        startIcon={<Assessment />}
                                        onClick={() => navigate('/reports/balance-sheet')}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: sageColors.text,
                                            fontSize: isMobile ? '0.875rem' : '0.95rem',
                                            py: isMobile ? 1 : 1.5,
                                            '&:hover': {
                                                bgcolor: `${sageColors.primary}10`,
                                                transform: 'translateX(4px)'
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        Balance Sheet
                                    </Button>
                                    <Button
                                        variant="text"
                                        fullWidth
                                        startIcon={<People />}
                                        onClick={() => navigate('/reports/aged-debtors')}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: sageColors.text,
                                            fontSize: isMobile ? '0.875rem' : '0.95rem',
                                            py: isMobile ? 1 : 1.5,
                                            '&:hover': {
                                                bgcolor: `${sageColors.primary}10`,
                                                transform: 'translateX(4px)'
                                            },
                                            transition: 'all 0.2s ease-in-out',
                                        }}
                                    >
                                        Aged Debtors
                                    </Button>
                                    <Button
                                        variant="text"
                                        fullWidth
                                        startIcon={<Business />}
                                        onClick={() => navigate('/reports/aged-creditors')}
                                        sx={{
                                            justifyContent: 'flex-start',
                                            color: sageColors.text,
                                            '&:hover': { bgcolor: `${sageColors.primary}10` }
                                        }}
                                    >
                                        Aged Creditors
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
};

export default SageDashboard;
