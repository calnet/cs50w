import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
    Alert,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBack, Construction } from '@mui/icons-material';

const UnderDevelopment: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                    startIcon={<ArrowBack />}
                    onClick={() => navigate('/')}
                    variant="outlined"
                >
                    Back to Dashboard
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Page Under Development
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                        <Construction sx={{ fontSize: 48, color: 'warning.main' }} />
                        <Box>
                            <Typography variant="h5" sx={{ mb: 1 }}>
                                Feature Coming Soon
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                The page you're looking for is currently under development.
                            </Typography>
                        </Box>
                    </Box>

                    <Alert severity="info" sx={{ mb: 3 }}>
                        <Typography variant="body2">
                            <strong>Requested Path:</strong> {location.pathname}
                        </Typography>
                    </Alert>

                    <Typography variant="body1" sx={{ mb: 3 }}>
                        We're working hard to bring you this feature. In the meantime, you can:
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/')}
                            sx={{ bgcolor: '#2E7D32' }}
                        >
                            Return to Dashboard
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/transactions')}
                        >
                            View Transactions
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/customers')}
                        >
                            Manage Customers
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/suppliers')}
                        >
                            Manage Suppliers
                        </Button>
                    </Box>

                    <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            <strong>Development Status:</strong> This Sage Accounts application is currently in active development.
                            Core features like transaction management, customer/supplier management, and reporting are being implemented progressively.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default UnderDevelopment;
