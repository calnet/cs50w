import { GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

type createDataProps = {
    id: number;
    type_name: string;
    coa_category: number;
    created_at: string;
    updated_at: string;
};

function NominalTypesList() {
    // const theme = useTheme();

    function createData({ id, type_name, coa_category, created_at, updated_at }: createDataProps) {
        return {
            id,
            type_name,
            coa_category,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/nominal_types/')
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
            headerAlign: 'left',
            align: 'left',
            type: 'number',
            flex: 0.1,
        },
        {
            field: 'type_name',
            headerName: 'Type Name',
            type: 'string',
            flex: 0.25,
        },
        {
            field: 'coa_category',
            headerName: 'Coa Category',
            headerAlign: 'left',
            align: 'left',
            type: 'number',
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

    const rows: createDataProps[] = [];

    data.map((item: createDataProps) =>
        rows.push(
            createData({
                id: item.id,
                type_name: item.type_name,
                coa_category: item.coa_category,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Nominal Types" />;
}

export default NominalTypesList;
