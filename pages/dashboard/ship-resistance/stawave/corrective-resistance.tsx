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

    const ParseJson = (jsonText: string) => {
        return JSON.parse(jsonText);
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
                            <TableCell align="center">Nm</TableCell>
                            <TableCell align="center">RADIS x d</TableCell>
                            <TableCell align="center">RAA x d</TableCell>
                            <TableCell align="center">RAS x d</TableCell>
                            <TableCell align="center">RAWL x d</TableCell>
                            <TableCell align="center">EHP</TableCell>
                            <TableCell align="center">RCorrect</TableCell>
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
                                    {row.ms}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.Nm}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.correctiveResistance).radisXd? toFixNumber(ParseJson(row.correctiveResistance).radisXd, 2) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                     {ParseJson(row.correctiveResistance).raaXd? toFixNumber(ParseJson(row.correctiveResistance).raaXd, 2) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.correctiveResistance).RASxD? toFixNumber(ParseJson(row.correctiveResistance).RASxD, 2) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.correctiveResistance).RawlxD? toFixNumber(ParseJson(row.correctiveResistance).RawlxD, 2) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.correctiveResistance).ehp? toFixNumber(ParseJson(row.correctiveResistance).ehp, 2) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                  
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