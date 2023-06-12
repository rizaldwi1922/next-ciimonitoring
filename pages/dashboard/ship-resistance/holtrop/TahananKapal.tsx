import {useContext, ReactElement, useState} from 'react'
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Box,
    Tab
} from '@mui/material';
import toFixNumber from '../../../../src/components/function/toFixNumber';
import { MyContext } from '../../../contexts/MyContext';
import FullLayout from '../../../../src/layouts/full/FullLayout';
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
        text: 'Tahanan kapal (holtrop)',
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
        <DashboardCard title="Tahanan Kapal">
          <div>
              <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                          <Tab label="SUB-BAJ" value="1" />
                          <Tab label="BAJ-SUB" value="2" />
                      </TabList>
                  </Box>
                  <TabPanel value="1">
                    <Line 
                      options={options} 
                      data={{ 
                        labels: data.map((item, index) => index + 1),
                        datasets: [
                          {
                            label: 'Tahanan',
                            data: data.map((item) => item.rt),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                          },
                          {
                            label: 'Knot',
                            data: data.map((item) => item.knot),
                            borderColor: '#F79327',
                            backgroundColor: '#FFE569',
                          },
                        ],
                      }}  
                    />
                  </TabPanel>
                  <TabPanel value="2">
                    <Line 
                      options={options} 
                      data={{ 
                        labels: data2.map((item, index) => index + 1),
                        datasets: [
                          {
                            label: 'Tahanan',
                            data: data2.map((item) => item.rt),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                          },
                          {
                            label: 'Knot',
                            data: data2.map((item) => item.knot),
                            borderColor: '#F79327',
                            backgroundColor: '#FFE569',
                          },
                        ],
                      }}  
                    />
                  </TabPanel>
              </TabContext>
          </div>
        </DashboardCard>
    )
}
export default Ship;

Ship.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};
