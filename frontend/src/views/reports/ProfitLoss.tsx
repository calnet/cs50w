import React from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

const ProfitLoss: React.FC = () => {
    const navigate = useNavigate();

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
                    Profit & Loss Report
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Profit & Loss Statement
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This report page is under development.
                        The Profit & Loss report will show your company's revenues and expenses over a specific period.
                    </Typography>
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body2">
                            <strong>Coming Soon:</strong>
                            <br />• Revenue breakdown by category
                            <br />• Expense analysis
                            <br />• Net profit calculations
                            <br />• Period comparisons
                            <br />• Export to PDF/Excel
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default ProfitLoss;
