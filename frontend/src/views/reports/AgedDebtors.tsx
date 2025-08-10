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

const AgedDebtors: React.FC = () => {
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
                    Aged Debtors Report
                </Typography>
            </Box>

            <Card>
                <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>
                        Aged Debtors Analysis
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This report page is under development.
                        The Aged Debtors report will show outstanding customer invoices categorized by age.
                    </Typography>
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                        <Typography variant="body2">
                            <strong>Coming Soon:</strong>
                            <br />• Customer debt aging (30, 60, 90+ days)
                            <br />• Outstanding invoice details
                            <br />• Payment history analysis
                            <br />• Credit risk assessment
                            <br />• Export to PDF/Excel
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default AgedDebtors;
