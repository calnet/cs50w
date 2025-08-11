import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { apiService } from '../../services/api';
import { SupplierType } from '../../types/ledgers';
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
            field: 'account_status',
            headerName: 'Status',
            type: 'string',
            flex: 1,
        },
        {
            field: 'balance',
            headerName: 'Balance',
            type: 'number',
            flex: 1,
            valueFormatter: (params) => {
                const value = params.value;
                return new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                }).format(value);
            },
        },
        {
            field: 'contact_name',
            headerName: 'Contact Name',
            type: 'string',
            flex: 1,
        },
        {
            field: 'credit_limit',
            headerName: 'Credit Limit',
            type: 'number',
            flex: 1,
            valueFormatter: (params) => {
                const value = params.value;
                return new Intl.NumberFormat('en-GB', {
                    style: 'currency',
                    currency: 'GBP',
                }).format(value);
            },
        },
        {
            field: 'telephone_number',
            headerName: 'Telephone',
            type: 'string',
            flex: 1,
        },
        {
            field: 'created_at',
            headerName: 'Created',
            type: 'dateTime',
            flex: 1,
            valueFormatter: (params) => {
                const value = params.value;
                return formatTimestamp(value);
            },
        },
        {
            field: 'updated_at',
            headerName: 'Updated',
            type: 'dateTime',
            flex: 1,
            valueFormatter: (params) => {
                const value = params.value;
                return formatTimestamp(value);
            },
        },
    ];

    return (
        <div style={{ margin: '20px' }}>
            <h1 style={{ color: '#2E7D32' }}>Suppliers</h1>
            {error && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    {error}
                </div>
            )}
        <CapstoneDataGrid
                rows={data.map(createRecord)}
            columns={columns}
            heading="Suppliers"
            dialog="SupplierDialog"
            url={url}
            handleDataChanged={handleDataChanged}
        />
        </div>
    );
}

export default SuppliersList;
