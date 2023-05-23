import {useContext, ReactElement} from 'react'
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
import toFixNumber from '../../../../src/components/function/toFixNumber';
import { MyContext } from '../../../contexts/MyContext';
import FullLayout from '../../../../src/layouts/full/FullLayout';


const Ship = () => {
    const context = useContext(MyContext);
    const data = context?.dataResultCalculate;

    if (!data) {
        return <div>Loading...</div>;
    }
      
    return (
        <DashboardCard title="Tahanan Total">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rf(1 + K1)(KN)</TableCell>
                            <TableCell align="center">Rapp (kN)</TableCell>
                            <TableCell align="center">Rw (kN)</TableCell>
                            <TableCell align="center">RB (kN)</TableCell>
                            <TableCell align="center">Rtr (kN)</TableCell>
                            <TableCell align="center">RA (kN)</TableCell>
                            <TableCell align="center">RΔf (kN)</TableCell>
                            <TableCell align="center">RT (kN)</TableCell>
                            <TableCell align="center">RT + sea margin (kN)</TableCell>
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
                                    {toFixNumber(row.ms, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.k1, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rapp, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rw, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rb, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rtr, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.ra, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.RAf, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rt,2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.seaMargin, 2)}
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