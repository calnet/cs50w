import {
    Avatar,
    Card,
    CardContent,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface QuickActionCardProps {
    action: {
        name: string;
        description: string;
        icon: React.ComponentType;
        url: string;
        color: string;
    };
}

const QuickActionCard = ({ action }: QuickActionCardProps) => {
    const navigate = useNavigate();
    const IconComponent = action.icon;

    const handleClick = () => {
        navigate(action.url);
    };

    return (
        <Card sx={{ textAlign: 'center', cursor: 'pointer' }} onClick={handleClick}>
            <CardContent>
                <Avatar sx={{ bgcolor: action.color, mx: 'auto', mb: 2 }}>
                    <IconComponent />
                </Avatar>
                <Typography variant="h6" component="h3" sx={{ mb: 1 }}>
                    {action.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {action.description}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default QuickActionCard;
