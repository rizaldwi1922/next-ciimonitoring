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
import { MyContext } from '../../../contexts/MyContext';
import toFixNumber from '../../../../src/components/function/toFixNumber';
import FullLayout from '../../../../src/layouts/full/FullLayout';

export default function Ship(){
    const contex = useContext(MyContext);
    const data = contex?.dataResultCalculate;

    if (!data) {
        return <div>Loading...</div>;
      }
      
    return (
        <DashboardCard title="Tahanan Gelombang">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Fn</TableCell>
                            <TableCell align="center">m2</TableCell>
                            <TableCell align="center">Rw</TableCell>
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
                                    {toFixNumber(row.ms, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.fn, 4)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.m2, 5)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rw, 4)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    )
}

Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};