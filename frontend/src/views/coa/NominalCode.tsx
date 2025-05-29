import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NominalCodeType } from '../../types/ViewComponentType';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

function createRecord({ ...props }: NominalCodeType) {
    return {
        ...props,
    };
}

function NominalCodeGet() {
    // const theme = useTheme();
    const [data, setData] = useState([]);
    const [dataChanged, setDataChanged] = useState(false);
    const { nominal_code } = useParams();

    const hostname = window.location.hostname;

    const url = `http://${hostname}:8000/api/nominal_code/${nominal_code}`;

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
    ];

    const rows: NominalCodeType[] = [];

    data.map((item: NominalCodeType) =>
        rows.push(
            createRecord({
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

    return (
        <CapstoneDataGrid
            rows={rows}
            columns={columns}
            heading="Nominal Code Details"
            dialog="NominalCodeDialog"
            url={url}
            handleDataChanged={handleDataChanged}
        />
    );
}

export default NominalCodeGet;
