import { Box, Stack, Typography, useTheme } from '@mui/material';
import DraggableDialog from './DraggableDialog';
import FormDialog from './FormDialog';

function Dialogs() {
    const theme = useTheme();
    const initialDraggableOpen = false;
    const initialFormOpen = false;

    return (
        <>
            <Stack textAlign={'center'} px={3} pb={2} border={1}>
                <Box>
                    <Typography variant="h1" py={2} color={theme.palette.primary.dark} textTransform={'uppercase'}>
                        Dialogs
                    </Typography>
                </Box>

                <Box>
                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Form Dialog
                    </Typography>
                    <Box sx={{ border: 1 }}>
                        <FormDialog initialOpen={initialFormOpen} />
                    </Box>

                    <Typography variant="h3" py={4} color={theme.palette.secondary.dark} textTransform={'uppercase'}>
                        Draggable Dialog
                    </Typography>
                    <Box sx={{ border: 1 }}>
                        <DraggableDialog initialOpen={initialDraggableOpen} />
                    </Box>
                </Box>
            </Stack>
        </>
    );
}

export default Dialogs;
