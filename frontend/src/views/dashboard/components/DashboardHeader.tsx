import { ManageAccounts } from '@mui/icons-material';
import {
    AppBar,
    Avatar,
    Box,
    Toolbar,
    Typography
} from '@mui/material';

interface DashboardHeaderProps {
    user: {
        name: string;
        role: string;
        isAuthenticated: boolean;
    };
}

const DashboardHeader = ({ user }: DashboardHeaderProps) => {
    return (
        <AppBar position="static" elevation={1} sx={{ bgcolor: 'background.paper', color: 'text.primary' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h1" sx={{ fontWeight: 'bold' }}>
                        Accounting System Dashboard - Claude
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        CS50 Capstone Project - Financial Management Platform
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {user.role}
                        </Typography>
                    </Box>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <ManageAccounts />
                    </Avatar>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default DashboardHeader;
