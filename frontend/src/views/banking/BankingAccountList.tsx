import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { BankingAccountType } from '../../types/ViewComponentType';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

function createRecord({ ...props }: BankingAccountType) {
    return {
        ...props,
    };
}

function BankingAccountList() {
    // const theme = useTheme();
    const [data, setData] = useState([]);

    const hostname = window.location.hostname;

    const url = `http://${hostname}:8000/api/banking/`;

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                // console.log(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            type: 'number',
            flex: 1,
        },
        {
            field: 'account_name',
            headerName: 'Account Name',
            type: 'string',
            flex: 1,
            editable: true,
        },
        {
            field: 'account_number',
            headerName: 'Account Number',
            type: 'number',
            flex: 1,
            editable: true,
        },
        {
            field: 'account_sort_code',
            headerName: 'Sort Code',
            type: 'string',
            flex: 1,
            editable: true,
        },
        {
            field: 'account_status',
            headerName: 'Account Status',
            type: 'singleSelect',
            flex: 1,
            editable: true,
            valueOptions: ['Active', 'Inactive'],
        },
        {
            field: 'account_type',
            headerName: 'Account Type',
            type: 'string',
            flex: 1,
            editable: true,
        },
        {
            field: 'balance',
            headerName: 'Balance',
            type: 'number',
            flex: 1,
            editable: true,
        },
        {
            field: 'credit_limit',
            headerName: 'Credit Limit',
            type: 'number',
            flex: 1,
            editable: true,
        },
        {
            field: 'currency',
            headerName: 'Currency',
            type: 'string',
            flex: 1,
            editable: true,
        },
        {
            field: 'opening_balance',
            headerName: 'Opening Balance',
            type: 'number',
            flex: 1,
            editable: true,
        },
        {
            field: 'opening_balance_date',
            headerName: 'Opening Balance Date',
            type: 'string',
            flex: 1,
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            type: 'string',
            flex: 1,
        },
        {
            field: 'updated_at',
            headerName: 'Updated At',
            type: 'string',
            flex: 1,
        },
    ];

    const rows: BankingAccountType[] = [];

    data.map((item: BankingAccountType) =>
        rows.push(
            createRecord({
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

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Banking" dialog="BankingAccountListDialog" url={url} />;
}

export default BankingAccountList;
