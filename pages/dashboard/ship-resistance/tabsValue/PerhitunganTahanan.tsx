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
        <DashboardCard title="Parhitungan Tahanan">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rn</TableCell>
                            <TableCell align="center">Cf</TableCell>
                            <TableCell align="center">Rf (KN)</TableCell>
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
                                    {row.rn}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.cf, 9)}
                                </TableCell>
                                <TableCell align='center'>
                                    {props.toFixNumber(row.rf, 3)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    )
}