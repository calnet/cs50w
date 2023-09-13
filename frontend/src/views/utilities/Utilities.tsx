import { Box, Stack, Typography, useTheme } from '@mui/material';
import BasicTable from './BasicTable';
import DataTable from './DataTable';
import DenseTable from './DenseTable';
import EnhancedTable from './EnhancedTable';
import StickyHeadTable from './StickyHeadTable';

function Utilities() {
    const theme = useTheme();

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
                    <Box sx={{ border: 1 }}>
                        <BasicTable />
                    </Box>

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Data Table
                    </Typography>
                    <Box sx={{ border: 1 }}>
                        <DataTable />
                    </Box>

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Dense Table
                    </Typography>
                    <Box sx={{ border: 1 }}>
                        <DenseTable />
                    </Box>

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Enhanced Table
                    </Typography>
                    <Box sx={{ border: 1 }}>
                        <EnhancedTable />
                    </Box>

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Sticky Head Table Table
                    </Typography>
                    <Box sx={{ border: 1 }}>
                        <StickyHeadTable />
                    </Box>
                </Box>
            </Stack>
        </>
    );
}

export default Utilities;
