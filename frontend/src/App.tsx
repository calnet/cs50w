import Routes from './routes';
import { AuthProvider } from './contexts/AuthContext';

// ==============================|| APP ||============================== //

const App = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
};

export default App;
