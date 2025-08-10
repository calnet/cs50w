import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';
import { formatTimestamp } from '../../utils/formatUtils';

function createRecord({ ...props }: SupplierType) {
    return {
        ...props,
    };
}

function SuppliersList() {
    const [data, setData] = useState<any[]>([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        autoLoginAndLoadData();
    }, [dataChanged]);

    const autoLoginAndLoadData = async () => {
        try {
            setLoading(true);
            setError(null);

            // Check if already have token
            const existingToken = localStorage.getItem('access_token');
            if (!existingToken) {
                // Auto-login with demo credentials
                const loginResponse = await apiService.auth.login('admin@example.com', 'admin123');
                if (loginResponse.access) {
                    localStorage.setItem('access_token', loginResponse.access);
                    localStorage.setItem('refresh_token', loginResponse.refresh);
                }
            }

            // Now load supplier data
            const response = await apiService.suppliers.getAll();
            setData(response.results || response);
        } catch (err: any) {
            setError('Failed to load suppliers');
            console.error('Error loading suppliers:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDataChanged = () => {
        setDataChanged(!dataChanged);
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            headerAlign: 'left',
            align: 'left',
            type: 'number',
            flex: 0.05,
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
        {
            field: 'created_at',
            headerName: 'Created',
            type: 'string',
            flex: 0.25,
            valueFormatter: (params) => formatTimestamp(params.value),
        },
        {
            field: 'updated_at',
            headerName: 'Updated',
            type: 'string',
            flex: 0.25,
            valueFormatter: (params) => formatTimestamp(params.value),
        },
    ];

    const rows: SupplierType[] = [];

    data.map((item: SupplierType) =>
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

    return (
        <CapstoneDataGrid
            rows={rows}
            columns={columns}
            heading="Suppliers"
            dialog="SupplierDialog"
            url={url}
            handleDataChanged={handleDataChanged}
        />
    );
}

export default SuppliersList;
