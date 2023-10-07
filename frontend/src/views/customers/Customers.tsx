import { Box } from '@mui/material';
import CustomersList from './CustomersList';

function Customers() {
    return (
        <>
            <Box sx={{ p: 1, typography: 'h3', color: 'cadetblue' }}>Customers</Box>

            <CustomersList />
        </>
    );
}

export default Customers;
