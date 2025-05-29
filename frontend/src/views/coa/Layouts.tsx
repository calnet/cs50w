import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { LayoutType } from '../../types/ViewComponentType';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

function createRecord({ ...props }: LayoutType) {
    return {
        ...props,
    };
}

function Layouts() {
    // const theme = useTheme();
    const [data, setData] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);

    const hostname = window.location.hostname;

    const url = `http://${hostname}:8000/api/layouts/`;

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

    const rows: LayoutType[] = [];

    data.map((item: LayoutType) =>
        rows.push(
            createRecord({
                id: item.id,
                layout_name: item.layout_name,
                description: item.description,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return (
        <CapstoneDataGrid
            rows={rows}
            columns={columns}
            heading="Layouts"
            dialog="LayoutDialog"
            url={url}
            handleDataChanged={handleDataChanged}
        />
    );
}

export default Layouts;
