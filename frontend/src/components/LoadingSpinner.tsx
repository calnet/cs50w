import { Box, CircularProgress, Typography, Fade } from '@mui/material';

interface LoadingSpinnerProps {
    message?: string;
    size?: number;
    color?: 'primary' | 'secondary' | 'inherit';
}

function LoadingSpinner({ 
    message = 'Loading...', 
    size = 40, 
    color = 'primary' 
}: LoadingSpinnerProps) {
    return (
        <Fade in timeout={300}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                    minHeight: 200,
                }}
            >
                <CircularProgress 
                    size={size} 
                    color={color}
                    sx={{ mb: 2 }}
                />
                <Typography 
                    variant="body2" 
                    color="text.secondary"
                    sx={{ textAlign: 'center' }}
                >
                    {message}
                </Typography>
            </Box>
        </Fade>
    );
}

export default LoadingSpinner;