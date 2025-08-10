import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiService } from '../../services/api';
import { NominalCode } from '../../types/accounting';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';
import { formatTimestamp } from '../../utils/formatUtils';

function createRecord({ ...props }: NominalCode) {
    return {
        ...props,
    };
}

function NominalCodesList() {
    const [data, setData] = useState<any[]>([]);
    const [dataChanged, setDataChanged] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { nominal_code } = useParams();

    useEffect(() => {
        autoLoginAndLoadData();
    }, [dataChanged, nominal_code]);

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

            // Now load nominal codes data
            if (nominal_code) {
                const response = await apiService.get(`/nominal_codes/${nominal_code}/`);
                setData([response]);
            } else {
                const response = await apiService.chartOfAccounts.getNominalCodes();
                setData(response.results || response);
            }
        } catch (err: any) {
            setError('Failed to load nominal codes');
            console.error('Error loading nominal codes:', err);
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
            field: 'code',
            headerName: 'Code',
            type: 'string',
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Name',
            type: 'string',
            flex: 1,
        },
        {
            field: 'type',
            headerName: 'Type',
            type: 'string',
            flex: 1,
        },
        {
            field: 'category',
            headerName: 'Category',
            type: 'string',
            flex: 1,
        },
        {
            field: 'active',
            headerName: 'Active',
            type: 'boolean',
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
            <h1 style={{ color: '#2E7D32' }}>Nominal Codes</h1>
            {error && (
                <div style={{ color: 'red', marginBottom: '20px' }}>
                    {error}
                </div>
            )}
            <CapstoneDataGrid
                rows={data.map(createRecord)}
                columns={columns}
                heading="Nominal Codes"
                dialog="NominalCodeDialog"
                url="http://localhost:8000/api/nominal_codes/"
                handleDataChanged={handleDataChanged}
            />
        </div>
    );
}

export default NominalCodesList;
