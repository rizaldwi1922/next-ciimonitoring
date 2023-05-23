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
import { useContext, ReactElement } from 'react';
import { MyContext } from '../../../contexts/MyContext';
import toFixNumber from '../../../../src/components/function/toFixNumber';
import FullLayout from '../../../../src/layouts/full/FullLayout';

export default function Ship(){
    const context = useContext(MyContext);
    const data = context?.dataResultCalculate;

    if (!data) {
        return <div>Loading...</div>;
      }
      
    return (
        <DashboardCard title="Parhitungan Tahanan">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No.</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rn</TableCell>
                            <TableCell align="center">Cf</TableCell>
                            <TableCell align="center">Rf (KN)</TableCell>
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
                                    {row.rn}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.cf, 9)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rf, 3)}
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