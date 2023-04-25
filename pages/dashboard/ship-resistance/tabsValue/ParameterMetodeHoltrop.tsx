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
} from '@mui/material';
import RenderIf from '../../../../src/components/container/RenderIf';

interface ParameterHoltrop {
    name: string,
    value: number,
    status: string
}

interface MyComponentProps {
    data: ParameterHoltrop[];
}

export default function(props: MyComponentProps){
    const data = props.data;

    if (!props.data) {
        return <div>Loading...</div>;
      }

    return (
        <DashboardCard title="Parameter metode Holtrop">
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>                    
                        <RenderIf condition={data.length < 1}>
                            <Box sx={{ p:5, textAlign: 'center' }}>
                                <Typography variant="h6" component="h6">Belum ada data</Typography>
                            </Box>
                        </RenderIf>
                        {data.map((row: any) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </DashboardCard>
    )
}