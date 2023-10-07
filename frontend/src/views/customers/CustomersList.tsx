import { Box, Paper } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';

type createDataProps = {
    id: number;
    account_reference: string;
    account_name: string;
    account_status: string;
    balance: number;
    contact_name: string;
    credit_limit: number;
    telephone_number: string;
    created_at: string;
    updated_at: string;
};

function CustomersList() {
    // const theme = useTheme();

    function createData({
        id,
        account_reference,
        account_name,
        account_status,
        balance,
        contact_name,
        credit_limit,
        telephone_number,
        created_at,
        updated_at,
    }: createDataProps) {
        return {
            id,
            account_reference,
            account_name,
            account_status,
            balance,
            contact_name,
            credit_limit,
            telephone_number,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/customers/')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            flex: 1,
        },
        {
            field: 'account_reference',
            headerName: 'A/C',
            type: 'number',
            flex: 1,
        },
        {
            field: 'account_name',
            headerName: 'Account Name',
            type: 'string',
            flex: 1,
        },
        {
            field: 'balance',
            headerName: 'Balance',
            type: 'number',
            flex: 1,
        },
        {
            field: 'credit_limit',
            headerName: 'Credit Limit',
            type: 'number',
            flex: 1,
        },
        {
            field: 'contact_name',
            headerName: 'Contact',
            headerAlign: 'right',
            align: 'right',
            type: 'string',
            flex: 1,
        },
        {
            field: 'telephone_number',
            headerName: 'Telephone',
            headerAlign: 'right',
            align: 'right',
            type: 'string',
            flex: 1,
        },
    ];

    const rows: createDataProps[] = [];

    data.map((item: createDataProps) =>
        rows.push(
            createData({
                id: item.id,
                account_reference: item.account_reference,
                account_name: item.account_name,
                account_status: item.account_status,
                balance: item.balance,
                contact_name: item.contact_name,
                credit_limit: item.credit_limit,
                telephone_number: item.telephone_number,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return (
        <>
            {/* <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ bgcolor: theme.palette.grey[400] }}>
                        <TableRow>
                            <TableCell>A/C</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Balance</TableCell>
                            <TableCell align="right">Credit Limit</TableCell>
                            <TableCell align="right">Contact</TableCell>
                            <TableCell align="right">Telephone</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row: createDataProps) => (
                            <TableRow
                                key={row.account_reference}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:nth-of-type( even )': { bgcolor: theme.palette.grey[200] },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.account_reference}
                                </TableCell>
                                <TableCell align="right">{row.account_name}</TableCell>
                                <TableCell align="right">{row.balance}</TableCell>
                                <TableCell align="right">{row.credit_limit}</TableCell>
                                <TableCell align="right">{row.contact_name}</TableCell>
                                <TableCell align="right">{row.telephone_number}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer> */}

            <Box component={Paper} height={400} minWidth={650}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 25]}
                    checkboxSelection
                />
            </Box>
        </>
    );
}

export default CustomersList;
