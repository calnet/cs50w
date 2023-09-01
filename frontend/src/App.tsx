import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import Routes from './routes';
import { theme } from './themes';

// ==============================|| APP ||============================== //

const App = () => {
    // const customization = useSelector((state) => state.customization);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
        </ThemeProvider>
    );
};

export default App;
