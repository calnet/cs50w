import {
    Box,
    Grid,
    Paper,
    Typography
} from '@mui/material';

const UsageInstructions = () => {
    return (
        <Paper sx={{ p: 4, bgcolor: 'primary.50', border: 1, borderColor: 'primary.200' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium', color: 'primary.dark' }}>
                How to Navigate Your Accounting System
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                        Core Modules:
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <li><strong>Banking:</strong> Manage bank accounts, reconciliation, statements</li>
                            <li><strong>Chart of Accounts:</strong> Set up accounting structure and nominal codes</li>
                            <li><strong>Customers:</strong> Manage customer accounts and sales transactions</li>
                            <li><strong>Suppliers:</strong> Handle supplier accounts and purchase transactions</li>
                        </Box>
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                        Development Features:
                    </Typography>
                    <Typography variant="body2" component="div" sx={{ color: 'text.secondary' }}>
                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                            <li><strong>Utilities:</strong> Table components showcase</li>
                            <li><strong>Dialogs:</strong> Form and UI dialog demonstrations</li>
                            <li><strong>Data Grids:</strong> Advanced table functionality with CRUD operations</li>
                            <li><strong>API Integration:</strong> Real-time data from Django backend</li>
                        </Box>
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default UsageInstructions;
