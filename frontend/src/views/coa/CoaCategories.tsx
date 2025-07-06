import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CoaCategoryType } from '../../types/ViewComponentType';
import { formatTimestamp } from '../../utils/formatUtils';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

function createRecord({ ...props }: CoaCategoryType) {
    return {
        ...props,
    };
}

function CoaCategoriesList() {
    // const theme = useTheme();
    const [data, setData] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);

    const hostname = window.location.hostname;

    const url = `http://${hostname}:8000/api/coa_categories/`;

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url, dataChanged]);

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
            flex: 0.1,
        },
        {
            field: 'category_name',
            headerName: 'Category Name',
            type: 'string',
            flex: 1.25,
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

    const rows: CoaCategoryType[] = [];

    data.map((item: CoaCategoryType) =>
        rows.push(
            createRecord({
                id: item.id,
                category_name: item.category_name,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return (
        <CapstoneDataGrid
            rows={rows}
            columns={columns}
            heading="Coa Categories"
            dialog="CoaCategoryDialog"
            url={url}
            handleDataChanged={handleDataChanged}
        />
    );
}

export default CoaCategoriesList;
