import { GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

type createDataProps = {
    id: number;
    layout_name: string;
    type_name: string;
    nominal_code_min: number;
    nominal_code_max: number;
    created_at: string;
    updated_at: string;
};

function CoaLayoutList() {
    // const theme = useTheme();

    function createData({ id, layout_name, type_name, nominal_code_min, nominal_code_max, created_at, updated_at }: createDataProps) {
        return {
            id,
            layout_name,
            type_name,
            nominal_code_min,
            nominal_code_max,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/coa_layout/')
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
            field: 'type_name',
            headerName: 'Nominal Type',
            headerAlign: 'left',
            align: 'left',
            type: 'string',
            flex: 0.75,
        },
        {
            field: 'nominal_code_min',
            headerName: 'N/C Min',
            headerAlign: 'center',
            align: 'center',
            type: 'number',
            flex: 0.15,
            valueFormatter: (params) => {
                return String(params.value).padStart(4, '0');
            },
        },
        {
            field: 'nominal_code_max',
            headerName: 'N/C Max',
            headerAlign: 'center',
            align: 'center',
            type: 'number',
            flex: 0.15,
            valueFormatter: (params) => {
                return String(params.value).padStart(4, '0');
            },
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

    const rows: createDataProps[] = [];

    data.map((item: createDataProps) =>
        rows.push(
            createData({
                id: item.id,
                layout_name: item.layout_name,
                type_name: item.type_name,
                nominal_code_min: item.nominal_code_min,
                nominal_code_max: item.nominal_code_max,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Chart of Accounts Layout" />;
}

export default CoaLayoutList;
