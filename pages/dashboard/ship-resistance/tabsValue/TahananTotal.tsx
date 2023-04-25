import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Typography,
    TableHead
} from '@mui/material';
import RenderIf from '../../../../src/components/container/RenderIf';

interface ResultCalculate {
    knot: number,
    ms: number,
    rn: number,
    cf: number,
    rf: number
    k1: number,
    rapp: number,
    fn: number,
    m2: number,
    rw: number,
    fni: number,
    rb: number,
    ra: number,
    rt: number,
    seaMargin: number
}

interface MyComponentProps {
    toFixNumber(value: number, lenth: number): import("react").ReactNode;
    data: ResultCalculate[];
}

export default function(props: MyComponentProps){
    const data = props.data;

    if (!props.data) {
        return <div>Loading...</div>;
      }
      
    return (
        <DashboardCard title="Tahanan Total">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rf(1 + K1)(KN)</TableCell>
                            <TableCell align="center">Rapp (kN)</TableCell>
                            <TableCell align="center">Rw (kN)</TableCell>
                            <TableCell align="center">RB (kN)</TableCell>
                            <TableCell align="center">Rtr (kN)</TableCell>
                            <TableCell align="center">RA (kN)</TableCell>
                            <TableCell align="center">RT (kN)</TableCell>
                            <TableCell align="center">RT + sea margin (kN)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                    
                        <RenderIf condition={data.length < 1}>
                            <Box sx={{ p:5, textAlign: 'center' }}>
                                <Typography variant="h6" component="h6">Belum ada data</Typography>
                            </Box>
                        </RenderIf>
                        {data.map((row: any) => (
                            <TableRow
                                key={row.knot}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align='center'>
                                    {row.knot}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.ms, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.k1, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.rapp, 4)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.rw, 3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.rb, 6)}
                                </TableCell>
                                <TableCell align='center'>
                                    0
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.ra, 4)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.rt,3)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.seaMargin, 2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    )
}