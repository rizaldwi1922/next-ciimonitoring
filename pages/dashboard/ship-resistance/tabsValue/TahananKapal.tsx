import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Box,
} from '@mui/material';
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
    data: ResultCalculate[];
}

export default function(props: MyComponentProps){

  if (!props.data) {
    return <div>Loading...</div>;
  }

    const dataChart = {
        labels: props.data.map((item: ResultCalculate) => item.knot),
        datasets: [
          {
            label: 'Tahanan',
            data: props.data.map((item: ResultCalculate) => item.rt),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Tahahan + Sea Margin',
            data: props.data.map((item: ResultCalculate) => item.seaMargin),
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