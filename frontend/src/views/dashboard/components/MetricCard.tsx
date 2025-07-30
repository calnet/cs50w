import { TrendingUp as TrendingUpIcon } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Paper,
    Typography
} from '@mui/material';

interface MetricCardProps {
    metric: {
        label: string;
        value: string;
        change: string;
        trend: string;
        icon: React.ComponentType;
    };
}

const MetricCard = ({ metric }: MetricCardProps) => {
    const IconComponent = metric.icon;

    return (
        <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        {metric.label}
                    </Typography>
                    <Typography variant="h4" component="div" sx={{ mb: 1 }}>
                        {metric.value}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                        <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
                        <Typography variant="body2">
                            {metric.change} this month
                        </Typography>
                    </Box>
                </Box>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <IconComponent />
                </Avatar>
            </Box>
        </Paper>
    );
};

export default MetricCard;
