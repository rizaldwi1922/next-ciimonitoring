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
        <DashboardCard title="Tahanan Korelasi Model Kapal">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">RA</TableCell>
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
                                    {toFixNumber(row.ra, 4)}
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