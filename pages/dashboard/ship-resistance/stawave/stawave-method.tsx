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
    Box,
    Tab
} from '@mui/material';
import FullLayout from '../../../../src/layouts/full/FullLayout';
import toFixNumber from '../../../../src/components/function/toFixNumber';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
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
        text: 'Tahanan kapal MV MERATUS PADANGPADA PELAYARAN SURABAYA - BANJARMASIN',
      },
    },
  };

const Ship = () => {
    const contex = useContext(MyContext);
    const data = contex?.dataResultCalculate;
    const data2 = contex?.dataResultCalculate2;
    const [value, setValue] = useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!data || !data2) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardCard title="Total Resistance Stawave Method">
            <div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="SUB-BAJ" value="1" />
                            <Tab label="BAJ-SUB" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ContentStawave data={data} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ContentStawave data={data2} />
                    </TabPanel>
                </TabContext>
                
            </div>
        </DashboardCard>
    )
}

const ContentStawave = (props: any) => {
    
    const ParseJson = (jsonText: string) => {
        return JSON.parse(jsonText);
    }
    
    return (
        <Box>
            <Box>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">No.</TableCell>
                                <TableCell align="center">Knot</TableCell>
                                <TableCell align="center">ms</TableCell>
                                <TableCell align="center">RADIS (N)</TableCell>
                                <TableCell align="center">RAA (N)</TableCell>
                                <TableCell align="center">RAS (N)</TableCell>
                                <TableCell align="center">RAWL (N)</TableCell>
                                <TableCell align="center">Rstawave (N)</TableCell>
                                <TableCell align="center">Rholtrop (N)</TableCell>
                                <TableCell align="center">Rtotal (N)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>                    
                            {props.data.map((row: any, index: any) => (
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
                                        {toFixNumber(row.ms, 1)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.radis? toFixNumber(row.radis, 2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {toFixNumber(row.raa, 2)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.efekSuhuGaram).RAS? toFixNumber(ParseJson(row.efekSuhuGaram).RAS, 7) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.efekGelombang).rawl ? toFixNumber(ParseJson(row.efekGelombang).rawl, 5) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {toFixNumber(ParseJson(row.stawaveMethod).Rstawave, 2)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.stawaveMethod).Rholtrop ? toFixNumber(ParseJson(row.stawaveMethod).Rholtrop,2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.stawaveMethod).RTotal ? ParseJson(row.stawaveMethod).RTotal : 0}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <Box sx={{ marginTop: 10 }}>
                <Line 
                      options={options} 
                      data={{ 
                        labels: props.data.map((item: any, index: number) => index + 1),
                        datasets: [
                            {
                                label: 'Kecepatan',
                                data: props.data.map((item: any) => item.knot),
                                borderColor: '#0079FF',
                                backgroundColor: '#00C4FF',
                            },
                            {
                                label: 'Holtrop',
                                data: props.data.map((item: any) => ParseJson(item.stawaveMethod).Rholtrop ? toFixNumber(ParseJson(item.stawaveMethod).Rholtrop,2) : 0),
                                borderColor: '#F29727',
                                backgroundColor: '#F24C3D',
                            },
                            {
                                label: 'Stawave',
                                data: props.data.map((item: any) => toFixNumber(ParseJson(item.stawaveMethod).Rstawave, 2)),
                                borderColor: '#9BCDD2',
                                backgroundColor: '#FAF0E4',
                            },
                            {
                                label: 'Tahanan Total',
                                data: props.data.map((item: any) => ParseJson(item.stawaveMethod).RTotal ? ParseJson(item.stawaveMethod).RTotal : 0),
                                borderColor: '#F2BE22',
                                backgroundColor: '#F6FA70',
                            },
                        ],
                      }}  
                />
            </Box>
        </Box>
    )
}
export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};