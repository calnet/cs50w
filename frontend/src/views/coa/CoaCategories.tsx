import { GridColDef } from '@mui/x-data-grid';

import { useEffect, useState } from 'react';

import axios from 'axios';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

type createDataProps = {
    id: number;
    category_name: string;
    created_at: string;
    updated_at: string;
};

function CoaCategoriesList() {
    // const theme = useTheme();

    function createData({ id, category_name, created_at, updated_at }: createDataProps) {
        return {
            id,
            category_name,
            created_at,
            updated_at,
        };
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8000/api/coa_categories/')
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
            field: 'category_name',
            headerName: 'Category Name',
            type: 'string',
            flex: 1.25,
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
                category_name: item.category_name,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Coa Categories" />;
}

export default CoaCategoriesList;
