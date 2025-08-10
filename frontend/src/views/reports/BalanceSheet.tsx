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

const BalanceSheet: React.FC = () => {
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
                    Balance Sheet Report
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Balance Sheet
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This report page is under development.
                        The Balance Sheet report will show your company's assets, liabilities, and equity at a specific point in time.
                    </Typography>
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body2">
                            <strong>Coming Soon:</strong>
                            <br />• Current and non-current assets
                            <br />• Current and long-term liabilities
                            <br />• Equity breakdown
                            <br />• Balance verification
                            <br />• Export to PDF/Excel
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BalanceSheet;
