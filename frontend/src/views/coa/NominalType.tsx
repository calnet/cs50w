import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NominalTypeProps } from '../../types/ViewComponentType';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

function createRecord({ ...props }: NominalTypeProps) {
    return {
        ...props,
    };
}

function NominalTypeGet() {
    // const theme = useTheme();
    const [data, setData] = useState([]);
    const { id } = useParams();

    const hostname = window.location.hostname

    const url = `http://${hostname}:8000/api/nominal_type/' + id;

    useEffect(() => {
        axios
            .get(url)
            .then((response) => {
                setData(response.data);
                console.log(response.data[0]);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, [url]);

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
            field: 'category_name',
            headerName: 'Category Name',
            headerAlign: 'left',
            align: 'left',
            type: 'string',
            flex: 1,
        },
        // {
        //     field: 'coa_category',
        //     headerName: 'Coa Category',
        //     headerAlign: 'left',
        //     align: 'left',
        //     type: 'number',
        //     flex: 1,
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

    const rows: NominalTypeProps[] = [];

    data.map((item: NominalTypeProps) =>
        rows.push(
            createRecord({
                id: item.id,
                type_name: item.type_name,
                category_name: item.category_name,
                created_at: item.created_at,
                updated_at: item.updated_at,
            })
        )
    );

    return <CapstoneDataGrid rows={rows} columns={columns} heading="Nominal Type Details" dialog="NominalTypeDialog" url={url} />;
}

export default NominalTypeGet;
