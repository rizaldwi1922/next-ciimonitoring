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
        text: 'SFOC GENERAL MARINE ENGINE',
      },
    },
  };

const Ship = () => {
    const contex = useContext(MyContext);
    const data = contex?.power;
    const data2 = contex?.power2;
    const [value, setValue] = useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!data || !data2) {
        return <div>Loading...</div>;
    }

    const dataSfoc: { load: number; sfoc: number }[] = [
        { load: 7, sfoc: 305.7 },
        { load: 8, sfoc: 296.7 },
        { load: 9, sfoc: 288.4 },
        { load: 10, sfoc: 280.6 },
        { load: 11, sfoc: 273.4 },
        { load: 12, sfoc: 266.7 },
        { load: 13, sfoc: 260.5 },
        { load: 14, sfoc: 254.8 },
        { load: 15, sfoc: 249.4 },
        { load: 16, sfoc: 244.5 },
        { load: 17, sfoc: 239.9 },
        { load: 18, sfoc: 235.6 },
        { load: 19, sfoc: 231.6 },
        { load: 20, sfoc: 227.9 },
        { load: 21, sfoc: 224.5 },
        { load: 22, sfoc: 221.3 },
        { load: 23, sfoc: 218.4 },
        { load: 24, sfoc: 215.6 },
        { load: 25, sfoc: 213.1 },
        { load: 26, sfoc: 210.7 },
        { load: 27, sfoc: 208.5 },
        { load: 28, sfoc: 206.5 },
        { load: 29, sfoc: 204.6 },
        { load: 30, sfoc: 202.8 },
        { load: 31, sfoc: 201.2 },
        { load: 32, sfoc: 199.7 },
        { load: 33, sfoc: 198.3 },
        { load: 34, sfoc: 197 },
        { load: 35, sfoc: 195.7 },
        { load: 36, sfoc: 194.6 },
        { load: 37, sfoc: 193.6 },
        { load: 38, sfoc: 192.6 },
        { load: 39, sfoc: 191.7 },
        { load: 40, sfoc: 190.9 },
        { load: 41, sfoc: 190.1 },
        { load: 42, sfoc: 189.4 },
        { load: 43, sfoc: 188.7 },
        { load: 44, sfoc: 188.1 },
        { load: 45, sfoc: 187.5 },
        { load: 46, sfoc: 187 },
        { load: 47, sfoc: 186.5 },
        { load: 48, sfoc: 186 },
        { load: 49, sfoc: 185.6 },
        { load: 50, sfoc: 185.2 },
        { load: 51, sfoc: 184.8 },
        { load: 52, sfoc: 184.5 },
        { load: 53, sfoc: 184.1 },
        { load: 54, sfoc: 183.8 },
        { load: 55, sfoc: 183.6 },
        { load: 56, sfoc: 183.3 },
        { load: 57, sfoc: 183.1 },
        { load: 58, sfoc: 182.9 },
        { load: 59, sfoc: 182.7 },
        { load: 60, sfoc: 182.5 },
        { load: 61, sfoc: 182.3 },
        { load: 62, sfoc: 182.1 },
        { load: 63, sfoc: 182 },
        { load: 64, sfoc: 181.8 },
        { load: 65, sfoc: 181.7 },
        { load: 66, sfoc: 181.6 },
        { load: 67, sfoc: 181.5 },
        { load: 68, sfoc: 181.4 },
        { load: 69, sfoc: 181.3 },
        { load: 70, sfoc: 181.2 },
        { load: 71, sfoc: 181.1 },
        { load: 72, sfoc: 181 },
        { load: 73, sfoc: 180.9 },
        { load: 74, sfoc: 180.9 },
        { load: 75, sfoc: 180.8 },
        { load: 76, sfoc: 180.8 },
        { load: 77, sfoc: 180.7 },
        { load: 78, sfoc: 180.6 },
        { load: 79, sfoc: 180.6 },
        { load: 80, sfoc: 180.6 },
        { load: 81, sfoc: 180.5 },
        { load: 82, sfoc: 180.5 },
        { load: 83, sfoc: 180.4 },
        { load: 84, sfoc: 180.4 },
        { load: 85, sfoc: 180.4 },
        { load: 86, sfoc: 180.4 },
        { load: 87, sfoc: 180.3 },
        { load: 88, sfoc: 180.3 },
        { load: 89, sfoc: 180.3 },
        { load: 90, sfoc: 180.3 },
        { load: 91, sfoc: 180.2 },
        { load: 92, sfoc: 180.2 },
        { load: 93, sfoc: 180.2 },
        { load: 94, sfoc: 180.2 },
        { load: 95, sfoc: 180.2 },
        { load: 96, sfoc: 180.2 },
        { load: 97, sfoc: 180.2 },
        { load: 98, sfoc: 180.1 },
        { load: 99, sfoc: 180.1 },
        { load: 100, sfoc: 180.1 },
      ];

    return (
        <DashboardCard title="Fuel">
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
                    <Box sx={{ marginTop: 10 }}>
                    <Line 
                        options={options} 
                        data={{ 
                            labels: dataSfoc.map((item: any) => item.load),
                            datasets: [
                                {
                                    label: 'BHP Engine Kapal',
                                    data: dataSfoc.map((item: any) => item.sfoc),
                                    borderColor: '#0079FF',
                                    backgroundColor: '#00C4FF',
                                }
                            ],
                        }}  
                    />
            </Box>
                </TabContext>
                
            </div>
        </DashboardCard>
    )
}

const ContentStawave = (props: any) => {
    
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
                                <TableCell align="center">RCorrect (N)</TableCell>
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
                                        {row.Rholtrop ? toFixNumber(row.Rholtrop, 2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {toFixNumber(row.Stawave, 2)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {toFixNumber(row.Rcorrect, 2)}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.Rtotal ? toFixNumber(row.Rtotal, 2) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.EHP ? Math.round(row.EHP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.THP ? Math.round(row.THP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.DHP ? Math.round(row.DHP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.SHP ? Math.round(row.SHP) : 0}
                                    </TableCell>
                                    <TableCell align='center'>
                                        {row.BHP ? Math.round(row.BHP) : 0}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    )
}
export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};