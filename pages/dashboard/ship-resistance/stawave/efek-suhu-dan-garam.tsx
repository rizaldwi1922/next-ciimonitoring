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
import { json } from 'stream/consumers';

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
        <DashboardCard title="Resistance increase due to water temperature and salt content">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No.</TableCell>
                            <TableCell align="center">Vs (Knot)</TableCell>
                            <TableCell align="center">Temp ( °C )</TableCell>
                            <TableCell align="center">⍴ (ton/m^3)</TableCell>
                            <TableCell align="center">ʋ (m^2/s)</TableCell>
                            <TableCell align="center">(m/s)</TableCell>
                            <TableCell align="center">RN</TableCell>
                            <TableCell align="center">Cf</TableCell>
                            <TableCell align="center">Cfo</TableCell>
                            <TableCell align="center">RAS</TableCell>
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
                                    {row.temp}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekSuhuGaram).PsuhuGaram}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekSuhuGaram).nu}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.ms, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(ParseJson(row.efekSuhuGaram).RNSuhuGaram, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(ParseJson(row.efekSuhuGaram).CFSuhuGaram, 5)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.cf, 5)}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(row.efekSuhuGaram).RAS? toFixNumber(ParseJson(row.efekSuhuGaram).RAS, 7) : 0}
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