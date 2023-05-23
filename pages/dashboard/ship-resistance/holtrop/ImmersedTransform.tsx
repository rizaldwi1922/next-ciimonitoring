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


export default function Ship(){
    const context = useContext(MyContext);
    const data = context?.dataResultCalculate;

    if (!data) {
        return <div>Loading...</div>;
    }
      
    return (
        <DashboardCard title="Tahanan akibat adanya bulbous bow">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">FnT</TableCell>
                            <TableCell align="center">C6</TableCell>
                            <TableCell align="center">Rtr</TableCell>
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
                                    {toFixNumber(row.fnt, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.c6, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rtr, 2)}
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