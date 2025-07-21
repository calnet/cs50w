import { Box, Typography, Button, Paper } from '@mui/material';
import { Add as AddIcon, Inbox as InboxIcon } from '@mui/icons-material';

interface EmptyStateProps {
    title?: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    icon?: React.ReactNode;
}

function EmptyState({
    title = 'No data available',
    description = 'Get started by adding your first record',
    actionLabel = 'Add New',
    onAction,
    icon
}: EmptyStateProps) {
    return (
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 6,
                textAlign: 'center',
                minHeight: 300,
                bgcolor: 'grey.50',
                border: '2px dashed',
                borderColor: 'grey.300',
            }}
        >
            <Box sx={{ mb: 3, color: 'grey.400' }}>
                {icon || <InboxIcon sx={{ fontSize: 64 }} />}
            </Box>
            
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {title}
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400 }}>
                {description}
            </Typography>
            
            {onAction && (
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={onAction}
                    sx={{
                        borderRadius: 2,
                        px: 3,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                    }}
                >
                    {actionLabel}
                </Button>
            )}
        </Paper>
    );
}

export default EmptyState;