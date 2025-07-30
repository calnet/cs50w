import {
    Box,
    Chip,
    Grid,
    Paper,
    Typography
} from '@mui/material';

const TechnicalArchitecture = () => {
    return (
        <Paper sx={{ p: 4, mb: 4 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                Technical Architecture
            </Typography>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
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
                            />
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                        Backend Features
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        {['Django REST API', 'PostgreSQL Database', 'CRUD Operations', 'Data Validation'].map((feature, index) => (
                            <Chip
                                key={index}
                                label={feature}
                                color="success"
                                variant="outlined"
                                size="small"
                            />
                        ))}
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
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
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>

            <Box sx={{ mt: 4, pt: 3, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                    CS50 Capstone Requirements Met
                </Typography>
                <Grid container spacing={2}>
                    {[
                        "✅ Distinctiveness & Complexity - Full ERP/Accounting System",
                        "✅ Mobile Responsive Design - Material-UI responsive components",
                        "✅ JavaScript Interactivity - React + TypeScript frontend",
                        "✅ Backend Database Models - Banking, COA, Customers, Suppliers",
                        "✅ User Interface Design - Professional Material-UI design",
                        "✅ API Integration - Django REST API with frontend consumption"
                    ].map((requirement, index) => (
                        <Grid item xs={12} md={6} key={index}>
                            <Typography variant="body2" color="text.secondary">
                                {requirement}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Paper>
    );
};

export default TechnicalArchitecture;
