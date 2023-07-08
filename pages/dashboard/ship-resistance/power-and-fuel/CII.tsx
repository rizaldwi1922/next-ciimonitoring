import {useContext, ReactElement, useState, useEffect} from 'react';
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
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

const Ship = () => {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tahanan kapal (holtrop)',
      },
    },
  };



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

    const [dataAis, setDataAis] = useState<any[]>([]);



//   const GetDataAis = async() => {
//       await axios.get('http://api.focnciimonitoring.com/api/getAis?mmsi=525125017')
//       .then(function (response) {
//         setDataAis(response.data);
//       })
//       .catch(function (error) {
//         // handle error
//         console.log(error);
//       })
//   }

  useEffect(() => {
    setDataAis([{
      lat: -6.567723333333333,
      lon: 114.47997333333333
    }
    ])
    //GetDataAis();
  }, [])

    return (
        <Box>
            <button onClick={() => console.log(dataAis)}>Tets</button>
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
                                            {toFixNumber(row.skom, 2)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.focME, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.focMEKom, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.attainedME, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.focGE, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.focGEKom, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.attainedGE, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.attainedCII, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.CIIRef, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.ReqCII, 3)}
                                        </TableCell>
                                        <TableCell align='center'>
                                            {toFixNumber(row.ReqCIIFOC, 3)}
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
            <DashboardCard title="CII Rating Grafik">
                <Box>
                    <Line 
                        options={options} 
                        data={{ 
                            labels: data.map((item, index) => index + 1),
                            datasets: [
                            {
                                label: 'CII Rating',
                                data: data.map((item) => toFixNumber(item.ReqCIIFOC, 3)),
                                borderColor: 'rgb(255, 99, 132)',
                                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                            },
                            ],
                        }}  
                    />
                </Box>
            </DashboardCard>
        </Box>
    )
}

export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};