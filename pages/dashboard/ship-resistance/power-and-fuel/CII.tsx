import {useContext, ReactElement, useState} from 'react';
import { MyContext } from '../../../contexts/MyContext';
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    TablePagination,
    Box,
    Tab
} from '@mui/material';
import FullLayout from '../../../../src/layouts/full/FullLayout';
import toFixNumber from '../../../../src/components/function/toFixNumber';

const Ship = () => {
    const contex = useContext(MyContext);
    const data = contex?.CII;

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardCard title="CII">
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table stickyHeader aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No.</TableCell>
                                <TableCell align="center">Timestamp</TableCell>
                                <TableCell align="center">Δ TIME (m)</TableCell>
                                <TableCell align="center">Lat</TableCell>
                                <TableCell align="center">Long</TableCell>
                                <TableCell align="center">Knot</TableCell>
                                <TableCell align="center">S (Nm)</TableCell>
                                <TableCell align="center">S Komulatif(Nm)</TableCell>
                                <TableCell align="center">FOC M/E(Ton)</TableCell>
                                <TableCell align="center">FOC M/E Komulaitf(Ton)</TableCell>
                                <TableCell align="center">Attained CII M/E</TableCell>
                                <TableCell align="center">FOC G/E(Ton)</TableCell>
                                <TableCell align="center">FOC G/E Komulaitf(Ton)</TableCell>
                                <TableCell align="center">Attained CII G/E</TableCell>
                                <TableCell align="center">Attained CII M/E+G/E(g/ton mile)</TableCell>
                                <TableCell align="center">CII Reff</TableCell>
                                <TableCell align="center">Required CII on 2023</TableCell>
                                <TableCell align="center">Att. CII/Requier CII FOC</TableCell>
                                <TableCell align="center">CII Rating</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>                    
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: any) => (
                                <TableRow
                                    key={index}
                                    >
                                    <TableCell align='center'>
                                        {index + 1 + (10 * page)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.timestamp}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.duration}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.lat}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.long}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.knot}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.s}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.skom}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.focME}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.focMEKom}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.attainedME}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.focGE}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.focGEKom}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.attainedGE}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.attainedCII}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.CIIRef}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.ReqCII}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.ReqCIIFOC}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.rating}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </DashboardCard>
    )
}

export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};