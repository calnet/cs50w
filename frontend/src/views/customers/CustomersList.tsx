import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CustomerType } from '../../types/ViewComponentType';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

function createRecord({ ...props }: CustomerType) {
    return {
        ...props,
    };
}

function CustomersList() {
    // const theme = useTheme();
    const [data, setData] = useState([]);

    const hostname = window.location.hostname;

    const url = `http://${hostname}:8000/api/customers/`;

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                console.log(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            headerAlign: 'left',
            align: 'left',
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
        // {
        //     field: 'created_at',
        //     headerName: 'Created',
        //     type: 'string',
        //     flex: 0.25,
        // },
        // {
        //     field: 'updated_at',
        //     headerName: 'Updated',
        //     type: 'string',
        //     flex: 0.25,
        // },
    ];

    const rows: CustomerType[] = [];

    data.map((item: CustomerType) =>
        rows.push(
            createRecord({
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

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Customers" dialog="CustomerDialog" url={url} />;
}

export default CustomersList;
