import { Box, Stack, Typography } from '@mui/material';
import { theme } from '../../themes';
import BasicTable from './BasicTable';
import DataTable from './DataTable';
import DenseTable from './DenseTable';

function Utilities() {
    return (
        <>
            <Stack textAlign={'center'} px={3} pb={2} border={1}>
                <Box>
                    <Typography variant="h1" py={2} color={theme.palette.primary.dark} textTransform={'uppercase'}>
                        Utilities
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Basic Table
                    </Typography>
                    <BasicTable />

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Data Table
                    </Typography>
                    <DataTable />

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Dense Table
                    </Typography>
                    <DenseTable />
                </Box>
            </Stack>
        </>
    );
}

export default Utilities;