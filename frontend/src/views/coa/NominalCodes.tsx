import { GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

type createDataProps = {
    id: number;
    layout_name: string;
    nominal_code: number;
    nominal_name: string;
    type_name: string;
    created_at: string;
    updated_at: string;
};

function NominalCodesList() {
    // const theme = useTheme();

    function createData({ id, layout_name, nominal_code, nominal_name, type_name, created_at, updated_at }: createDataProps) {
        return {
            id,
            layout_name,
            nominal_code,
            nominal_name,
            type_name,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/nominal_codes/')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const columns: GridColDef[] = [
        // {
        //     field: 'layout_name',
        //     headerName: 'Layout Name',
        //     type: 'string',
        //     flex: 0.25,
        // },
        // {
        //     field: 'id',
        //     headerName: 'ID',
        //     headerAlign: 'left',
        //     align: 'left',
        //     type: 'number',
        //     flex: 0.1,
        // },
        {
            field: 'nominal_code',
            headerName: 'Nominal Code',
            headerAlign: 'left',
            align: 'left',
            type: 'number',
            flex: 0.25,
            valueFormatter: (params) => {
                return String(params.value).padStart(4, '0');
            },
        },
        {
            field: 'nominal_name',
            headerName: 'Nominal Ledger Name',
            type: 'string',
            flex: 0.5,
        },
        {
            field: 'type_name',
            headerName: 'Nominal Type',
            headerAlign: 'left',
            align: 'left',
            type: 'string',
            flex: 0.5,
        },
        // {
        //     field: 'nominal_type',
        //     headerName: 'Nominal Type',
        //     headerAlign: 'left',
        //     align: 'left',
        //     type: 'number',
        //     flex: 0.5,
        // },
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

    const rows: createDataProps[] = [];

    data.map((item: createDataProps) =>
        rows.push(
            createData({
                id: item.id,
                layout_name: item.layout_name,
                nominal_code: item.nominal_code,
                nominal_name: item.nominal_name,
                type_name: item.type_name,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Nominal Codes" />;
}

export default NominalCodesList;
