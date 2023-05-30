import {useContext, ReactElement} from 'react';
import { MyContext } from '../../../contexts/MyContext';
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead
} from '@mui/material';
import FullLayout from '../../../../src/layouts/full/FullLayout';
import toFixNumber from '../../../../src/components/function/toFixNumber';

const Ship = () => {
    const contex = useContext(MyContext);
    const data = contex?.dataResultCalculate;

    if (!data) {
        return <div>Loading...</div>;
      }
    return (
        <DashboardCard title="Total Resistance Stawave Method">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No.</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">ms</TableCell>
                            <TableCell align="center">RADIS (N)</TableCell>
                            <TableCell align="center">RAA (N)</TableCell>
                            <TableCell align="center">RAS (N)</TableCell>
                            <TableCell align="center">RAWL (N)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                    
                        {data.map((row: any, index) => (
                            <TableRow
                                key={row.knot}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align='center'>
                                    {index + 1}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.knot}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.ywr}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.actualKnot}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.knotVair, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.msVair, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.raa, 2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    )
}
export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};