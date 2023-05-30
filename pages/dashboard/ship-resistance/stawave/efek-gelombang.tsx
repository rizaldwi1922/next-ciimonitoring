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

    const ParseJson = (jsonText: string) => {
        return JSON.parse(jsonText);
    }

    if (!data) {
        return <div>Loading...</div>;
      }
    return (
        <DashboardCard title="Resistance increase due to the effects of 
        waves">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No.</TableCell>
                            <TableCell align="center">Vs (Knot)</TableCell>
                            <TableCell align="center">H (m)</TableCell>
                            <TableCell align="center">ꙍ (rad/s)</TableCell>
                            <TableCell align="center">S</TableCell>
                            <TableCell align="center">RWave (N)</TableCell>
                            <TableCell align="center">ζa</TableCell>
                            <TableCell align="center">Rawl (N)</TableCell>
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
                                    {row.h}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.fita}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekGelombang).sn ? toFixNumber(ParseJson(row.efekGelombang).sn, 9) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekGelombang).rwave ? toFixNumber(ParseJson(row.efekGelombang).rwave, 5) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekGelombang).amp}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekGelombang).rawl ? toFixNumber(ParseJson(row.efekGelombang).rawl, 5) : 0}
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