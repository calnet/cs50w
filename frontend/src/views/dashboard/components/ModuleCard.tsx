import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Chip,
    Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ModuleCardProps {
    module: {
        name: string;
        description: string;
        icon: React.ComponentType;
        url: string;
        color: string;
        subViews?: string[];
    };
}

const ModuleCard = ({ module }: ModuleCardProps) => {
    const navigate = useNavigate();
    const IconComponent = module.icon;

    const handleClick = () => {
        navigate(module.url);
    };

    const handleSubViewClick = (subView: string) => {
        const subViewUrl = `${module.url}/${subView.toLowerCase().replace(/\s+/g, '_')}`;
        navigate(subViewUrl);
    };

    return (
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: module.color, mr: 2 }}>
                        <IconComponent />
                    </Avatar>
                    <Typography variant="h6" component="h3">
                        {module.name}
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {module.description}
                </Typography>
                {module.subViews && (
                    <Box>
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Available Views ({module.subViews.length}):
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {module.subViews.slice(0, 4).map((subView: string, index: number) => (
                                <Chip
                                    key={index}
                                    label={subView}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem', cursor: 'pointer' }}
                                    onClick={() => handleSubViewClick(subView)}
                                />
                            ))}
                            {module.subViews.length > 4 && (
                                <Chip
                                    label={`+${module.subViews.length - 4} more`}
                                    size="small"
                                    variant="outlined"
                                    sx={{ fontSize: '0.7rem' }}
                                />
                            )}
                        </Box>
                    </Box>
                )}
            </CardContent>
            <CardActions>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={handleClick}
                    sx={{ bgcolor: module.color }}
                >
                    Open Module
                </Button>
            </CardActions>
        </Card>
    );
};

export default ModuleCard;
