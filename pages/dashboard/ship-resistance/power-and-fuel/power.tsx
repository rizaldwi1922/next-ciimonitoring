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
        text: 'BHP Main Engine Kapal',
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
        <DashboardCard title="Power">
            <div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Surabaya - Banjarmasin" value="1" />
                            <Tab label="Banjarmasin - Surabaya" value="2" />
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
                                <TableCell align="center">Rholtrop (N)</TableCell>
                                <TableCell align="center">Stawave (N)</TableCell>
                                <TableCell align="center">Rtotal (N)</TableCell>
                                <TableCell align="center">EHP (kW)</TableCell>
                                <TableCell align="center">THP (kW)</TableCell>
                                <TableCell align="center">DHP (kW)</TableCell>
                                <TableCell align="center">SHP (kW)</TableCell>
                                <TableCell align="center">BHP (kW)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>                    
                            {props.data.map((row: any, index: any) => (
                                <TableRow
                                    key={row.index}
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
                                        {ParseJson(row.stawaveMethod).Rholtrop? toFixNumber(ParseJson(row.stawaveMethod).Rholtrop, 2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.stawaveMethod).Rstawave? toFixNumber(ParseJson(row.stawaveMethod).Rstawave, 2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.stawaveMethod).RTotal? toFixNumber(ParseJson(row.stawaveMethod).RTotal, 2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.power).EHP? Math.round(ParseJson(row.power).EHP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.power).THP? Math.round(ParseJson(row.power).THP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.power).DHP? Math.round(ParseJson(row.power).DHP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.power).SHP? Math.round(ParseJson(row.power).SHP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {ParseJson(row.power).BHP? Math.round(ParseJson(row.power).BHP) : 0}
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
                                label: 'BHP Engine Kapal',
                                data: props.data.map((row: any) => ParseJson(row.power).EHP? Math.round(ParseJson(row.power).EHP) : 0),
                                borderColor: '#0079FF',
                                backgroundColor: '#00C4FF',
                            }
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