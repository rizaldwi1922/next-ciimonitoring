import {useContext, ReactElement} from 'react'
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Box,
} from '@mui/material';
import toFixNumber from '../../../../src/components/function/toFixNumber';
import { MyContext } from '../../../contexts/MyContext';
import FullLayout from '../../../../src/layouts/full/FullLayout';
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
  const context = useContext(MyContext);
  const data = context?.dataResultCalculate;
  if (!data) {
    return <div>Loading...</div>;
  }

    const dataChart = {
        labels: data.map((item) => item.knot),
        datasets: [
          {
            label: 'Tahanan',
            data: data.map((item) => item.rt),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Tahahan + Sea Margin',
            data: data.map((item) => item.seaMargin),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return (
        <DashboardCard title="Tahanan Total">
            <Box>
                <Line options={options} data={dataChart} />
            </Box>
        </DashboardCard>
    )
}
export default Ship;

Ship.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};