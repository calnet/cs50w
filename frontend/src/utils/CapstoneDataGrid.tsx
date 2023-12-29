import { Paper } from '@mui/material';
import { Box } from '@mui/system';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useState } from 'react';
import CoaLayoutDialog from '../views/coa/CoaLayoutDialog';
import NominalCodeDialog from '../views/coa/NominalCodeDialog';

interface DataGridProps {
    // eslint-disable-next-line
    rows: any[];
    columns: GridColDef[];
    heading: string;
}

function CapstoneDataGrid({ rows, columns, heading }: DataGridProps) {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);

    const height = rows.length > 0 ? 'auto' : 200;

    const handleRowClick = (params: GridRowParams) => {
        console.log(params.row);
        setOpenDialog(true);
    };

    switch (heading) {
        case 'Chart of Accounts Layout':
            setOpenDialog;
            break;

        default:
            break;
    }

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
                    onRowClick={(params: GridRowParams) => {
                        setSelectedRow(params.row);
                        if (heading == 'Nominal Codes' || heading == 'Nominal Code Details' || heading == 'Chart of Accounts Layout') {
                            handleRowClick(params);
                        }
                    }}

                    // checkboxSelection
                />
                <NominalCodeDialog open={openDialog} handleClose={() => setOpenDialog(false)} selectedRow={selectedRow} />
                <CoaLayoutDialog open={openDialog} handleClose={() => setOpenDialog(false)} selectedRow={selectedRow} />
            </Box>
        </>
    );
}

export default CapstoneDataGrid;
