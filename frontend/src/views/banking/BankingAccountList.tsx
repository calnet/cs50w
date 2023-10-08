import { GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

type createDataProps = {
    id: number;
    account_type: string;
    account_name: string;
    account_number: number;
    account_sort_code: string;
    account_status: string;
    balance: number;
    credit_limit: number;
    currency: string;
    opening_balance: number;
    opening_balance_date: string;
    created_at: string;
    updated_at: string;
};

function BankingAccountList() {
    // const theme = useTheme();

    function createData({
        id,
        account_name,
        account_number,
        account_sort_code,
        account_status,
        account_type,
        balance,
        credit_limit,
        currency,
        opening_balance,
        opening_balance_date,
        created_at,
        updated_at,
    }: createDataProps) {
        return {
            id,
            account_name,
            account_number,
            account_sort_code,
            account_status,
            account_type,
            balance,
            credit_limit,
            currency,
            opening_balance,
            opening_balance_date,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/banking/')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns: GridColDef[] = [
        // {
        //     field: 'id',
        //     headerName: 'ID',
        //     type: 'number',
        //     flex: 1,
        // },
        {
            field: 'account_name',
            headerName: 'Account Name',
            type: 'string',
            flex: 1,
        },
        {
            field: 'account_number',
            headerName: 'Account Number',
            type: 'number',
            flex: 1,
        },
        {
            field: 'account_sort_code',
            headerName: 'Sort Code',
            type: 'string',
            flex: 1,
        },
        {
            field: 'account_status',
            headerName: 'Account Status',
            type: 'string',
            flex: 1,
        },
        {
            field: 'account_type',
            headerName: 'Account Type',
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
        // {
        //     field: 'currency',
        //     headerName: 'Currency',
        //     type: 'string',
        //     flex: 1,
        // },
        // {
        //     field: 'opening_balance',
        //     headerName: 'Opening Balance',
        //     type: 'number',
        //     flex: 1,
        // },
        // {
        //     field: 'opening_balance_date',
        //     headerName: 'Opening Balance Date',
        //     type: 'string',
        //     flex: 1,
        // },
        // {
        //     field: 'created_at',
        //     headerName: 'Created At',
        //     type: 'string',
        //     flex: 1,
        // },
        // {
        //     field: 'updated_at',
        //     headerName: 'Updated At',
        //     type: 'string',
        //     flex: 1,
        // },
    ];

    const rows: createDataProps[] = [];

    data.map((item: createDataProps) =>
        rows.push(
            createData({
                id: item.id,
                account_name: item.account_name,
                account_number: item.account_number,
                account_sort_code: item.account_sort_code,
                account_status: item.account_status,
                account_type: item.account_type,
                balance: item.balance,
                credit_limit: item.credit_limit,
                currency: item.currency,
                opening_balance: item.opening_balance,
                opening_balance_date: item.opening_balance_date,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Banking" />;
}

export default BankingAccountList;
