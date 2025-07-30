import {
    Box,
    Container,
    Grid,
    Typography
} from '@mui/material';
import { useState } from 'react';

// Components
import DashboardHeader from './components/DashboardHeader';
import MetricCard from './components/MetricCard';
import ModuleCard from './components/ModuleCard';
import QuickActionCard from './components/QuickActionCard';
import TechnicalArchitecture from './components/TechnicalArchitecture';
import UsageInstructions from './components/UsageInstructions';

// Hooks
import { useDashboardData } from './hooks/useDashboardData';

const ClaudeDashboard = () => {
    const [user] = useState({
        name: "Accounting User",
        role: "Financial Manager",
        isAuthenticated: true
    });

    const { coreModules, utilityViews, quickActions, systemMetrics } = useDashboardData();

    return (
        <Box sx={{ flexGrow: 1 }}>
            {/* Header */}
            <DashboardHeader user={user} />

            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {/* System Metrics */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        System Overview
                    </Typography>
                    <Grid container spacing={3}>
                        {systemMetrics.map((metric, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <MetricCard metric={metric} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Core Business Modules */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Core Business Modules
                    </Typography>
                    <Grid container spacing={3}>
                        {coreModules.map((module, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <ModuleCard module={module} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Quick Actions */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Quick Actions
                    </Typography>
                    <Grid container spacing={3}>
                        {quickActions.map((action, index) => (
                            <Grid item xs={12} sm={6} md={3} key={index}>
                                <QuickActionCard action={action} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Development & Utilities */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                        Development & Utilities
                    </Typography>
                    <Grid container spacing={3}>
                        {utilityViews.map((utility, index) => (
                            <Grid item xs={12} md={6} key={index}>
                                <ModuleCard module={utility} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>

                {/* Technical Architecture */}
                <TechnicalArchitecture />

                {/* Usage Instructions */}
                <UsageInstructions />
            </Container>
        </Box>
    );
};

export default ClaudeDashboard;