import { GridColDef } from '@mui/x-data-grid';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CapstoneDataGrid from '../../utils/CapstoneDataGrid';

export type NominalRecordProps = {
    id: number;
    layout_name: string;
    nominal_code: number;
    nominal_name: string;
    type_name: string;
    created_at: string;
    updated_at: string;
};

function nominalRecord({ id, layout_name, nominal_code, nominal_name, type_name, created_at, updated_at }: NominalRecordProps) {
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

function NominalCodeGet() {
    // const theme = useTheme();
    const [data, setData] = useState([]);
    // const [openDialog, setOpenDialog] = useState(false);

    const { nominal_code } = useParams();

    const url = 'http://localhost:8000/api/nominal_code/' + nominal_code;

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

    const rows: NominalRecordProps[] = [];

    data.map((item: NominalRecordProps) =>
        rows.push(
            nominalRecord({
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

    // return NominalCodeDialog(rows, columns, 'Nominal Code Details');

    return (
        <>
            {/* <NominalCodeDialog open={openDialog} handleClose={() => setOpenDialog(false)} selectedRow={data[0]} /> */}
            <CapstoneDataGrid rows={rows} columns={columns} heading="Nominal Code Details" />;
        </>
    );
}

export default NominalCodeGet;
