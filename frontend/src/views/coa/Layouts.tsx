import { GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

type createDataProps = {
    id: number;
    layout_name: string;
    description: string;
    created_at: string;
    updated_at: string;
};

function Layouts() {
    // const theme = useTheme();

    function createData({ id, layout_name, description, created_at, updated_at }: createDataProps) {
        return {
            id,
            layout_name,
            description,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/layouts/')
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
            field: 'layout_name',
            headerName: 'Coa Name',
            type: 'string',
            flex: 0.25,
        },
        {
            field: 'description',
            headerName: 'Description',
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

    const rows: createDataProps[] = [];

    data.map((item: createDataProps) =>
        rows.push(
            createData({
                id: item.id,
                layout_name: item.layout_name,
                description: item.description,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Layouts" />;
}

export default Layouts;
