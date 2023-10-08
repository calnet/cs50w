import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface DataGridProps {
    // eslint-disable-next-line
    rows: any[];
    columns: GridColDef[];
    heading: string;
}

function CapstoneDataGrid({ rows, columns, heading }: DataGridProps) {
    const height = rows.length > 0 ? 'auto' : 200;

    return (
        <>
            <Box sx={{ p: 1, typography: 'h3', color: 'cadetblue' }}>{heading}</Box>
            <Box component={Paper} height={height} minWidth={650}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    // checkboxSelection
                />
            </Box>
        </>
    );
}

export default CapstoneDataGrid;
