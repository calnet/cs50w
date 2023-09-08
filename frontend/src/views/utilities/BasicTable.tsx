import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { theme } from '../../themes';

type createDataProps = {
    name: string;
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
};

function BasicTable() {
    function createData({ name, calories, fat, carbs, protein }: createDataProps) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData({ name: 'Frozen yoghurt', calories: 159, fat: 6, carbs: 24, protein: 4 }),
        createData({ name: 'Ice cream sandwich', calories: 237, fat: 9, carbs: 37, protein: 4.3 }),
        createData({ name: 'Eclair', calories: 262, fat: 16, carbs: 24, protein: 6 }),
        createData({ name: 'Cupcake', calories: 305, fat: 3.7, carbs: 67, protein: 4.3 }),
        createData({ name: 'Gingerbread', calories: 356, fat: 16, carbs: 49, protein: 3.9 }),
    ];
    return (
        <>
            <TableContainer component={Paper} sx={{ border: 1 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ bgcolor: theme.palette.grey[400] }}>
                        <TableRow>
                            <TableCell>Dessert (100g serving)</TableCell>
                            <TableCell align="right">Calories</TableCell>
                            <TableCell align="right">Fat&nbsp;(g)</TableCell>
                            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                            <TableCell align="right">Protein&nbsp;(g)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    '&:nth-of-type( even )': { bgcolor: theme.palette.grey[200] },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.calories}</TableCell>
                                <TableCell align="right">{row.fat}</TableCell>
                                <TableCell align="right">{row.carbs}</TableCell>
                                <TableCell align="right">{row.protein}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default BasicTable;
