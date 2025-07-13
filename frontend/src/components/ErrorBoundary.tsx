import { Alert, AlertTitle, Box, Button, Container, Typography } from '@mui/material';
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
    errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);

        this.setState({
            error,
            errorInfo,
        });

        // Log to external service (e.g., Sentry)
        // logErrorToService(error, errorInfo);
    }

    private handleReload = () => {
        window.location.reload();
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <Container maxWidth="md" sx={{ mt: 4 }}>
                    <Alert severity="error">
                        <AlertTitle>Something went wrong</AlertTitle>
                        <Typography variant="body2" sx={{ mb: 2 }}>
                            We're sorry, but something unexpected happened. Please try refreshing the page.
                        </Typography>

                        {process.env.NODE_ENV === 'development' && this.state.error && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    Error Details (Development Mode):
                                </Typography>
                                <Typography variant="body2" component="pre" sx={{ fontSize: '0.75rem' }}>
                                    {this.state.error.toString()}
                                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                                </Typography>
                            </Box>
                        )}

                        <Button
                            variant="contained"
                            onClick={this.handleReload}
                            sx={{ mt: 2 }}
                        >
                            Reload Page
                        </Button>
                    </Alert>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
