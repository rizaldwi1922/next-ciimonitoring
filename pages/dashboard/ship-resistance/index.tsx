import { ReactElement, useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../contexts/MyContext';
import { ParameterHoltrop } from '../../../src/interface/ParameterHoltrop';
import { ResultCalculate } from '../../../src/interface/ResultCalculate';
import toFixNumber from '../../../src/components/function/toFixNumber';
import { 
    TextField,
    Box,
    Button,
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DataTime } from '../../../src/interface/DataTime';
import { CIIEntry } from '../../../src/interface/CIIEntry';

const Ship = () => {

    const context = useContext(MyContext);

    const baseURl = process.env.NEXT_PUBLIC_URL;
    const [owner, setOwner] = useState('PT Meratus');
    const [tipe, setTipe] = useState('General cargo, container');
    const [loa, setLoa] = useState(117);
    const [lpp, setLpp] = useState(110);
    const [b, setB] = useState(19.7);
    const [h, setH] = useState(8.5);
    const [t, setT] = useState(6.4);
    const [gt, setGt] = useState(5745);
    const [dwt, setDwt] = useState(7664.6);
    const [v, setV] = useState(13.8);
    const [lwl, setLwl] = useState(112.39);
    const [bwl, setBwl] = useState(19.7);
    const [cp, setCp] = useState(0.784);
    // const [loa, setLoa] = useState(0);
    // const [lpp, setLpp] = useState(0);
    // const [b, setB] = useState(0);
    // const [h, setH] = useState(0);
    // const [t, setT] = useState(0);
    // const [gt, setGt] = useState(0);
    // const [dwt, setDwt] = useState(0);
    // const [v, setV] = useState(0);
    // const [lwl, setLwl] = useState(0);
    // const [bwl, setBwl] = useState(0);
    // const [cp, setCp] = useState(0);
   // const fita = 0.1;
    const tops = 5.75;
    //const aops = 9804.4;
    const g = 9.81;
    const p = 1023.3873/1000;
    const LCB = 55.078;
    const Displ = 11034.4;
    const ABT = (7725837/1000000)*2;
    const hB = 3507.5201/1000;
    const CB = 0.7736;
    const C7 = bwl / lwl;
    const C15 = -1.69385;
    const TB = t / bwl;
    const viskositas = 0.94252 * 10 ** -6;
    const CM = 0.987;
    const CW = 0.8551;
    const midship = lpp/2;
    const fromMidship = LCB - midship;
    const LR = lwl * (1-cp+(0.06*cp*(fromMidship / (4*cp)-1)));
    const LRB = LR / bwl;
    const LT = lwl/t;
    const BL = bwl/lwl;
    const Vdispl  = Math.round(Displ / p);
    const iE = 1 + 89 * Math.exp(-((lwl/bwl) ** 0.80856) * ((1-CW) ** 0.30484) * ((1 - cp - 0.0225 * fromMidship) ** 0.6367) * LRB ** 0.34574) * ((100 * Vdispl / (lwl ** 3)) ** 0.16302);
    const AT = (2237963*2)/1000000;
    const C1 =  222.3105 * (C7 ** 3.78613) * (TB ** 1.07961) * ((90 - iE ) ** 1.07961);
    const C3 = (0.56 * (ABT ** 1.5)) / (bwl * t * (0.31 * (ABT ** 0.5) + t - hB));
    const C2 = Math.exp(-1.89 * (C3 ** 0.5));
    const C5 = 1-((0.8 * AT)/(bwl * t * CM));
    const C4 = 0.04;
    const CA = 0.00546 * ((lwl + 100) ** -0.16) - 0.002 + 0.003 * ((lwl / 7.5) ** 0.5) * (CB ** 4) * C2 * (0.04 - C4);
    const TFLWL = t / lwl;
    const Cstern = -22;
    const C14 = 1+0.001*Cstern;
    const K1 = 0.93 + 0.487118 * C14 * ((bwl/lwl) ** 1.06806) * ((t/lwl) ** 0.46106) * ((lwl/LR) ** 0.121563) * ((lwl ** 3 / Vdispl) ** 0.36486) * ((1-cp) ** -0.604247);
    const lamda = (1.446 * cp) * (0.03 * (lwl/bwl));
    const C16 = 8.07981 * cp - 13.8673 * (cp ** 2) + 6.984388 * (cp ** 3);
    const m1 = 0.0140407 * LT - 1.75254 * ((Vdispl ** (1/3))/lwl) - 4.79323 * BL - C16;
    const m4 = 0.4 * C15 * Math.exp(-0.034 * (0.4 ** -3.29));
    const d = -0.9;
    const PB = 0.56 * ABT ** 0.5 / (t - 1.5 * hB);
    const S = lwl * (2*t+bwl) * CM ** 0.5 * (0.453 + 0.4425 * CB - 0.2862 * CM - 0.003467 * (bwl/t) + 0.3696 * CW) + 2.38 * ABT/CB;
    const mikrometer = 150;
    const Ks = mikrometer * 10 ** -6;
    const Acf = (105 * ((Ks/lwl) ** (1/3)) - 0.64) / 10 ** 3;
    const sudutAngin = 270+45+22.5;

const dataTimeSubBaj: DataTime[] = [
    {
      timestamp: '13:49',
      duration: 0,
      lat: '07°12.4\' S',
      long: '112°43.9\' E',
    },
    {
      timestamp: '13:58',
      duration: 9,
      lat: '07°11.9\' S',
      long: '112°43.3\' E',
    },
    {
      timestamp: '14:08',
      duration: 10,
      lat: '07°11.8\' S',
      long: '112°42.4\' E',
    },
    {
      timestamp: '14:21',
      duration: 13,
      lat: '07°11.3\' S',
      long: '112°41.9\' E',
    },
    {
      timestamp: '14:32',
      duration: 11,
      lat: '07°10.6\' S',
      long: '112°40.9\' E',
    },
    {
      timestamp: '14:59',
      duration: 27,
      lat: '07°07.6\' S',
      long: '112°39.6\' E',
    },
    {
      timestamp: '15:18',
      duration: 19,
      lat: '07°05.1\' S',
      long: '112°39.4\' E',
    },
    {
      timestamp: '15:39',
      duration: 21,
      lat: '07°02.0\' S',
      long: '112°39.9\' E',
    },
    {
      timestamp: '16:00',
      duration: 8,
      lat: '07°00.9\' S',
      long: '112°40.5\' E',
    },
    {
      timestamp: '16:18',
      duration: 18,
      lat: '06°58.2\' S',
      long: '112°42.4\' E',
    },
    {
      timestamp: '16:45',
      duration: 27,
      lat: '06°53.4\' S',
      long: '112°44.1\' E',
    },
    {
      timestamp: '16:52',
      duration: 7,
      lat: '06°52.4\' S',
      long: '112°44.1\' E',
    },
    {
      timestamp: '17:01',
      duration: 9,
      lat: '06°50.7\' S',
      long: '112°44.9\' E',
    },
    {
      timestamp: '17:43',
      duration: 42,
      lat: '06°43.4\' S',
      long: '112°48.7\' E',
    },
    {
      timestamp: '18:48',
      duration: 65,
      lat: '06°32.2\' S',
      long: '112°54.5\' E',
    },
    {
      timestamp: '19:36',
      duration: 48,
      lat: '06°24.0\' S',
      long: '112°59.0\' E',
    },
    {
      timestamp: '20:09',
      duration: 33,
      lat: '06°18.3\' S',
      long: '113°02.2\' E',
    },
    {
      timestamp: '20:55',
      duration: 46,
      lat: '06°10.6\' S',
      long: '113°06.5\' E',
    },
    {
      timestamp: '21:42',
      duration: 47,
      lat: '06°02.4\' S',
      long: '113°10.9\' E',
    },
    {
      timestamp: '22:32',
      duration: 49,
      lat: '05°54.0\' S',
      long: '113°15.5\' E',
    },
    {
      timestamp: '23:28',
      duration: 56,
      lat: '05°44.3\' S',
      long: '113°20.5\' E',
    },
    {
      timestamp: '00:04',
      duration: 36,
      lat: '05°38.0\' S',
      long: '113°23.9\' E',
    },
    {
      timestamp: '00:35',
      duration: 30,
      lat: '05°32.8\' S',
      long: '113°26.9\' E',
    },
    {
      timestamp: '01:12',
      duration: 37,
      lat: '05°26.5\' S',
      long: '113°30.4\' E',
    },
    {
      timestamp: '01:50',
      duration: 38,
      lat: '05°20.0\' S',
      long: '113°34.0\' E',
    },
    {
      timestamp: '02:48',
      duration: 58,
      lat: '05°10.0\' S',
      long: '113°39.4\' E',
    },
    {
      timestamp: '03:41',
      duration: 53,
      lat: '05°01.1\' S',
      long: '113°44.7\' E',
    },
    {
      timestamp: '04:37',
      duration: 55,
      lat: '04°51.6\' S',
      long: '113°49.8\' E',
    },
    {
      timestamp: '05:50',
      duration: 74,
      lat: '04°39.3\' S',
      long: '113°56.8\' E',
    },
    {
      timestamp: '06:26',
      duration: 36,
      lat: '04°33.1\' S',
      long: '114°00.1\' E',
    },
    {
      timestamp: '07:15',
      duration: 49,
      lat: '04°25.2\' S',
      long: '114°05.5\' E',
    },
    {
      timestamp: '07:56',
      duration: 41,
      lat: '04°18.3\' S',
      long: '114°09.7\' E',
    },
    {
      timestamp: '08:25',
      duration: 29,
      lat: '04°13.2\' S',
      long: '114°12.2\' E',
    },
    {
      timestamp: '09:16',
      duration: 51,
      lat: '04°04.5\' S',
      long: '114°17.1\' E',
    },
    {
      timestamp: '10:34',
      duration: 78,
      lat: '03°50.8\' S',
      long: '114°23.6\' E',
    },
    {
      timestamp: '11:33',
      duration: 59,
      lat: '03°40.3\' S',
      long: '114°28.1\' E',
    },
    {
      timestamp: '11:37',
      duration: 4,
      lat: '03°39.7\' S',
      long: '114°28.7\' E',
    },
    {
      timestamp: '12:31',
      duration: 54,
      lat: '03°31.5\' S',
      long: '114°29.5\' E',
    },
    {
      timestamp: '12:35',
      duration: 4,
      lat: '03°30.9\' S',
      long: '114°29.7\' E',
    },
    {
      timestamp: '12:56',
      duration: 21,
      lat: '03°27.8\' S',
      long: '114°30.3\' E',
    },
    {
      timestamp: '13:03',
      duration: 7,
      lat: '03°26.7 S',
      long: '114°30.4 E',
    },
    {
      timestamp: '13:07',
      duration: 4,
      lat: '03°26.2 S',
      long: '114°30.2\' E',
    },
    {
      timestamp: '13:11',
      duration: 4,
      lat: '03°25.6\' S',
      long: '114°29.9\' E',
    },
    {
      timestamp: '13:16',
      duration: 5,
      lat: '03°24.9\' S',
      long: '114°29.8\' E',
    },
    {
      timestamp: '13:25',
      duration: 9,
      lat: '03°24.2\' S',
      long: '114°29.9\' E',
    },
    {
      timestamp: '13:35',
      duration: 10,
      lat: '03°22.9\' S',
      long: '114°30.3 E',
    },
    {
      timestamp: '13:56',
      duration: 21,
      lat: '03°21.4\' S',
      long: '114°31.8 E',
    },
    {
      timestamp: '14:18',
      duration: 22,
      lat: '03°20.0\' S',
      long: '114°33.1\' E',
    },
  ];

  const dataTimeBajPort: DataTime[] = [
    {
      timestamp: '16:00',
      duration: 102,
      lat: "03°20.0' S",
      long: "114°33.1' E",
    },
    {
      timestamp: '20:00',
      duration: 240,
      lat: "03°20.0' S",
      long: "114°33.1' E",
    },
    {
      timestamp: '00:00',
      duration: 240,
      lat: "03°20.0' S",
      long: "114°33.1' E",
    },
    {
      timestamp: '04:00',
      duration: 240,
      lat: "03°20.0' S",
      long: "114°33.1' E",
    },
    {
      timestamp: '08:00',
      duration: 240,
      lat: "03°20.0' S",
      long: "114°33.1' E",
    },
  ];

  const dataTimeBajSub: DataTime[] = [
    {
      timestamp: '08:56',
      duration: 56,
      lat: "03°20.0' S",
      long: "114°33.1' E",
    },
    {
      timestamp: '09:17',
      duration: 21.38181818,
      lat: "03°21.3' S",
      long: "114°31.8' E",
    },
    {
      timestamp: '09:39',
      duration: 21.50769231,
      lat: "03°22.9' S",
      long: "114°30.3' E",
    },
    {
      timestamp: '09:49',
      duration: 9.710526316,
      lat: "03°24.2' S",
      long: "114°29.9' E",
    },
    {
      timestamp: '09:55',
      duration: 6.233766234,
      lat: "03°24.9' S",
      long: "114°29.8' E",
    },
    {
      timestamp: '10:00',
      duration: 4.551724138,
      lat: "03°25.6' S",
      long: "114°29.9' E",
    },
    {
      timestamp: '10:04',
      duration: 3.793103448,
      lat: "03°26.2' S",
      long: "114°30.2' E",
    },
    {
      timestamp: '10:08',
      duration: 4.275862069,
      lat: "03°26.7' S",
      long: "114°30.4' E",
    },
    {
      timestamp: '10:15',
      duration: 7.2,
      lat: "03°27.8' S",
      long: "114°30.3' E",
    },
    {
      timestamp: '10:36',
      duration: 21.41860465,
      lat: "03°30.9' S",
      long: "114°29.7' E",
    },
    {
      timestamp: '10:41',
      duration: 4.620689655,
      lat: "03°31.5' S",
      long: "114°29.5' E",
    },
    {
      timestamp: '11:34',
      duration: 52.70967742,
      lat: "03°39.7' S",
      long: "114°28.6' E",
    },
    {
      timestamp: '11:37',
      duration: 3.290322581,
      lat: "03°40.0' S",
      long: "114°28.6' E",
    },
    {
      timestamp: '11:46',
      duration: 9,
      lat: "03°41.4' S",
      long: "114°27.6' E",
    },
    {
      timestamp: '12:07',
      duration: 20,
      lat: "03°44.8' S",
      long: "114°25.5' E",
    },
    {
      timestamp: '12:39',
      duration: 32,
      lat: "03°50.3' S",
      long: "114°22.5' E",
    },
    {
      timestamp: '13:10',
      duration: 32,
      lat: "03°55.9' S",
      long: "114°19.9' E",
    },
    {
      timestamp: '13:55',
      duration: 45,
      lat: "04°03.7' S",
      long: "114°16.1' E",
    },
    {
      timestamp: '14:47',
      duration: 51,
      lat: "04°12.7' S",
      long: "114°11.6' E",
    },
    {
      timestamp: '15:19',
      duration: 32,
      lat: "04°18.2' S",
      long: "114°08.6' E",
    },
    {
      timestamp: '15:52',
      duration: 33,
      lat: "04°23.7' S",
      long: "114°05.1' E",
    },
    {
      timestamp: '16:26',
      duration: 33,
      lat: "04°29.4' S",
      long: "114°01.9' E",
    },
    {
      timestamp: '17:11',
      duration: 45,
      lat: "04°37.3' S",
      long: "113°57.9' E",
    },
    {
      timestamp: '17:53',
      duration: 42,
      lat: "04°44.4' S",
      long: "113°54.0' E",
    },
    {
      timestamp: '19:03',
      duration: 70,
      lat: "04°56.1' S",
      long: "113°46.9' E",
    },
    {
      timestamp: '19:50',
      duration: 47,
      lat: "05°04.2' S",
      long: "113°42.5' E",
    },
    {
      timestamp: '21:01',
      duration: 71,
      lat: "05°16.5' S",
      long: "113°36.3' E",
    },
    {
      timestamp: '21:54',
      duration: 53,
      lat: "05°26.0' S",
      long: "113°32.1' E",
    },
    {
      timestamp: '23:03',
      duration: 68,
      lat: "05°38.1' S",
      long: "113°26.5' E",
    },
    {
      timestamp: '00:03',
      duration: 60,
      lat: "05°48.8' S",
      long: "113°21.6' E",
    },
    {
      timestamp: '01:06',
      duration: 63,
      lat: "05°59.4' S",
      long: "113°15.4' E",
    },
    {
      timestamp: '02:07',
      duration: 61,
      lat: "06°09.3' S",
      long: "113°08.9' E",
    },
    {
      timestamp: '03:09',
      duration: 62,
      lat: "06°20.1' S",
      long: "113°03.1' E",
    },
    {
      timestamp: '03:44',
      duration: 35,
      lat: "06°25.7' S",
      long: "112°59.2' E",
    },
    {
      timestamp: '04:24',
      duration: 40,
      lat: "06°32.6' S",
      long: "112°55.8' E",
    },
    {
      timestamp: '05:06',
      duration: 42,
      lat: "06°39.7' S",
      long: "112°51.6' E",
    },
    {
      timestamp: '05:54',
      duration: 48,
      lat: "06°47.6' S",
      long: "112°46.8' E",
    },
    {
      timestamp: '06:20',
      duration: 27,
      lat: "06°52.4' S",
      long: "112°44.8' E",
    },
    {
      timestamp: '06:55',
      duration: 35,
      lat: "06°53.2' S",
      long: "112°44.2' E",
    },
    {
      timestamp: '07:20',
      duration: 25,
      lat: "06°58.1' S",
      long: "112°42.5' E",
    },
    {
      timestamp: '07:32',
      duration: 12,
      lat: "07°00.9' S",
      long: "112°40.5' E",
    },
    {
      timestamp: '07:54',
      duration: 22,
      lat: "07°02.2' S",
      long: "112°39.9' E",
    },
    {
      timestamp: '08:08',
      duration: 24,
      lat: "07°04.9' S",
      long: "112°39.6' E",
    },
    {
      timestamp: '08:31',
      duration: 23,
      lat: "07°07.6' S",
      long: "112°39.7' E",
    },
    {
      timestamp: '08:44',
      duration: 13,
      lat: "07°10.2' S",
      long: "112°40.5' E",
    },
    {
      timestamp: '09:16',
      duration: 28,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
  ];

 const dataTimeSubPort: DataTime[] = [
    {
      timestamp: '12:00',
      duration: 164,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '16:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '20:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '00:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '04:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '08:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '12:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '04:00',
      duration: 240,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
    {
      timestamp: '06:45',
      duration: 165,
      lat: "07°12.5' S",
      long: "112°43.7' E",
    },
  ];

    const listKnot = [
        { Knot: 0, Temp: 27, Heading: 0, actualKnot: 0, H: 0, Fita: 0 },
        { Knot: 5.2, Temp: 27, Heading: 335, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 6.3, Temp: 27, Heading: 276, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 6.8, Temp: 27, Heading: 310, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 8.1, Temp: 27, Heading: 306, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 8.3, Temp: 27, Heading: 334, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 8.6, Temp: 27, Heading: 357, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 8.9, Temp: 27, Heading: 10, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 9.2, Temp: 27, Heading: 25, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 9.7, Temp: 27, Heading: 35, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 10.3, Temp: 27, Heading: 20, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 10.5, Temp: 27, Heading: 36, actualKnot: 6, H: 0.18, Fita: 3.59 },
        { Knot: 11.7, Temp: 27, Heading: 27, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 27, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 29, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 29, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 29, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 28, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 28, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 27, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 28, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 30, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 29, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 29, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 28, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 31, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 28, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 30, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 28, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 34, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 31, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 26, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 30, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 26, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 23, actualKnot: 11, H: 1.0, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 46, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 10.3, Temp: 27, Heading: 2, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 9.5, Temp: 27, Heading: 10, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 9.1, Temp: 27, Heading: 6, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 8.7, Temp: 27, Heading: 4, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 8.3, Temp: 27, Heading: 11, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 7.8, Temp: 27, Heading: 4, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 7.6, Temp: 27, Heading: 333, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 7.4, Temp: 27, Heading: 349, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 6.8, Temp: 27, Heading: 7, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 6.7, Temp: 27, Heading: 16, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 6.1, Temp: 27, Heading: 44, actualKnot: 11, H: 1.0, Fita: 39.46 },
        { Knot: 5.4, Temp: 27, Heading: 45, actualKnot: 11, H: 1.0, Fita: 39.46 }
      ];

      const listKnot2 = [
        { Knot: 0, Temp: 0, Heading: 0, actualKnot: 0, H: 0, Fita: 0 },
        { Knot: 5.5, Temp: 27, Heading: 225, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 6.5, Temp: 27, Heading: 224, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 7.6, Temp: 27, Heading: 196, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 7.7, Temp: 27, Heading: 187, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 8.7, Temp: 27, Heading: 169, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 8.7, Temp: 27, Heading: 153, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 8.7, Temp: 27, Heading: 184, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 8.5, Temp: 27, Heading: 191, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 8.6, Temp: 27, Heading: 194, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 8.7, Temp: 27, Heading: 186, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 9.3, Temp: 27, Heading: 190, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 9.3, Temp: 27, Heading: 182, actualKnot: 9, H: 0.87, Fita: 39.46 },
        { Knot: 11.7, Temp: 27, Heading: 212, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 208, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 206, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 207, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 208, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 212, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 210, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 207, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 209, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 212, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 208, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 207, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 204, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 210, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 213, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.9, Temp: 27, Heading: 208, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 215, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.7, Temp: 27, Heading: 206, actualKnot: 8, H: 0.7, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 210, actualKnot: 8, H: 0.7, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 211, actualKnot: 8, H: 0.7, Fita: 7.89 },
        { Knot: 11.6, Temp: 27, Heading: 203, actualKnot: 8, H: 0.7, Fita: 3.59 },
        { Knot: 11.7, Temp: 27, Heading: 212, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 8.5, Temp: 27, Heading: 200, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 8.3, Temp: 27, Heading: 215, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 7.6, Temp: 27, Heading: 203, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 7.5, Temp: 27, Heading: 190, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 6.8, Temp: 27, Heading: 178, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 6.7, Temp: 27, Heading: 175, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 6.5, Temp: 27, Heading: 58, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 5.3, Temp: 27, Heading: 58, actualKnot: 5, H: 0.18, Fita: 3.59 }
      ];

      const Nm = [
        0,
        0.60,
        0.73,
        1.03,
        1.05,
        3.32,
        2.53,
        3.10,
        1.31,
        3.24,
        5.11,
        1.34,
        1.90,
        8.20,
        12.60,
        9.30,
        6.50,
        8.90,
        9.20,
        9.60,
        10.90,
        7.20,
        6.00,
        7.30,
        7.40,
        11.30,
        10.40,
        10.80,
        14.20,
        7.00,
        9.60,
        8.10,
        5.60,
        10.00,
        15.20,
        11.40,
        0.80,
        8.17,
        0.67,
        3.07,
        1.02,
        0.62,
        0.55,
        0.66,
        0.80,
        1.23,
        2.33,
        1.96,
      ]

const Nm2 = [
      0,
      1.96,
      2.33,
      1.23,
      0.80,
      0.66,
      0.55,
      0.62,
      1.02,
      3.07,
      0.67,
      8.17,
      0.51,
      1.70,
      4.00,
      6.30,
      6.20,
      8.70,
      10.00,
      6.30,
      6.50,
      6.50,
      8.80,
      8.10,
      13.70,
      9.20,
      13.80,
      10.30,
      13.40,
      11.80,
      12.30,
      11.90,
      12.20,
      6.80,
      7.70,
      8.20,
      9.30,
      5.20,
      5.00,
      3.40,
      1.50,
      2.80,
      2.70,
      2.60,
      1.40,
      2.50,
  ];

  const sfocDataME: { load: number; sfoc: number }[] = [
    { load: 30, sfoc: 201.4 },
    { load: 31, sfoc: 200.7 },
    { load: 32, sfoc: 200.0 },
    { load: 33, sfoc: 199.4 },
    { load: 34, sfoc: 198.8 },
    { load: 35, sfoc: 198.2 },
    { load: 36, sfoc: 197.6 },
    { load: 37, sfoc: 197.0 },
    { load: 38, sfoc: 196.4 },
    { load: 39, sfoc: 195.8 },
    { load: 40, sfoc: 195.3 },
    { load: 41, sfoc: 194.8 },
    { load: 42, sfoc: 194.2 },
    { load: 43, sfoc: 193.7 },
    { load: 44, sfoc: 193.2 },
    { load: 45, sfoc: 192.8 },
    { load: 46, sfoc: 192.3 },
    { load: 47, sfoc: 191.8 },
    { load: 48, sfoc: 191.4 },
    { load: 49, sfoc: 191.0 },
    { load: 50, sfoc: 190.6 },
    { load: 51, sfoc: 190.1 },
    { load: 52, sfoc: 189.8 },
    { load: 53, sfoc: 189.4 },
    { load: 54, sfoc: 189.0 },
    { load: 55, sfoc: 188.7 },
    { load: 56, sfoc: 188.3 },
    { load: 57, sfoc: 188.0 },
    { load: 58, sfoc: 187.7 },
    { load: 59, sfoc: 187.4 },
    { load: 60, sfoc: 187.1 },
    { load: 61, sfoc: 186.9 },
    { load: 62, sfoc: 186.6 },
    { load: 63, sfoc: 186.4 },
    { load: 64, sfoc: 186.2 },
    { load: 65, sfoc: 185.9 },
    { load: 66, sfoc: 185.7 },
    { load: 67, sfoc: 185.6 },
    { load: 68, sfoc: 185.4 },
    { load: 69, sfoc: 185.2 },
    { load: 70, sfoc: 185.1 },
    { load: 71, sfoc: 184.9 },
    { load: 72, sfoc: 184.8 },
    { load: 73, sfoc: 184.7 },
    { load: 74, sfoc: 184.6 },
    { load: 75, sfoc: 184.5 },
    { load: 76, sfoc: 184.5 },
    { load: 77, sfoc: 184.4 },
    { load: 78, sfoc: 184.4 },
    { load: 79, sfoc: 184.3 },
    { load: 80, sfoc: 184.3 },
    { load: 81, sfoc: 184.3 },
    { load: 82, sfoc: 184.3 },
    { load: 83, sfoc: 184.4 },
    { load: 84, sfoc: 184.4 },
    { load: 85, sfoc: 184.5 },
    { load: 86, sfoc: 184.5 },
    { load: 87, sfoc: 184.6 },
    { load: 88, sfoc: 184.7 },
    { load: 89, sfoc: 184.8 },
    { load: 90, sfoc: 184.9 },
    { load: 91, sfoc: 185.1 },
    { load: 92, sfoc: 185.2 },
    { load: 93, sfoc: 185.4 },
    { load: 94, sfoc: 185.5 },
    { load: 95, sfoc: 185.7 },
    { load: 96, sfoc: 185.9 },
    { load: 97, sfoc: 186.1 },
    { load: 98, sfoc: 186.4 },
    { load: 99, sfoc: 186.6 },
    { load: 100, sfoc: 186.9 }
  ];

  const sfocDataGE: { load: number; sfoc: number }[] = [
    { load: 30, sfoc: 228.6 },
    { load: 31, sfoc: 227.8 },
    { load: 32, sfoc: 227.1 },
    { load: 33, sfoc: 226.3 },
    { load: 34, sfoc: 225.6 },
    { load: 35, sfoc: 224.9 },
    { load: 36, sfoc: 224.2 },
    { load: 37, sfoc: 223.6 },
    { load: 38, sfoc: 222.9 },
    { load: 39, sfoc: 222.3 },
    { load: 40, sfoc: 221.7 },
    { load: 41, sfoc: 221.1 },
    { load: 42, sfoc: 220.5 },
    { load: 43, sfoc: 219.9 },
    { load: 44, sfoc: 219.3 },
    { load: 45, sfoc: 218.8 },
    { load: 46, sfoc: 218.3 },
    { load: 47, sfoc: 217.8 },
    { load: 48, sfoc: 217.3 },
    { load: 49, sfoc: 216.8 },
    { load: 50, sfoc: 216.3 },
    { load: 51, sfoc: 215.8 },
    { load: 52, sfoc: 215.4 },
    { load: 53, sfoc: 215.0 },
    { load: 54, sfoc: 214.6 },
    { load: 55, sfoc: 214.2 },
    { load: 56, sfoc: 213.8 },
    { load: 57, sfoc: 213.4 },
    { load: 58, sfoc: 213.1 },
    { load: 59, sfoc: 212.8 },
    { load: 60, sfoc: 212.4 },
    { load: 61, sfoc: 212.1 },
    { load: 62, sfoc: 211.8 },
    { load: 63, sfoc: 211.6 },
    { load: 64, sfoc: 211.3 },
    { load: 65, sfoc: 211.1 },
    { load: 66, sfoc: 210.8 },
    { load: 67, sfoc: 210.6 },
    { load: 68, sfoc: 210.4 },
    { load: 69, sfoc: 210.3 },
    { load: 70, sfoc: 210.1 },
    { load: 71, sfoc: 209.9 },
    { load: 72, sfoc: 209.8 },
    { load: 73, sfoc: 209.7 },
    { load: 74, sfoc: 209.6 },
    { load: 75, sfoc: 209.5 },
    { load: 76, sfoc: 209.4 },
    { load: 77, sfoc: 209.3 },
    { load: 78, sfoc: 209.3 },
    { load: 79, sfoc: 209.3 },
    { load: 80, sfoc: 209.2 },
    { load: 81, sfoc: 209.2 },
    { load: 82, sfoc: 209.3 },
    { load: 83, sfoc: 209.3 },
    { load: 84, sfoc: 209.3 },
    { load: 85, sfoc: 209.4 },
    { load: 86, sfoc: 209.5 },
    { load: 87, sfoc: 209.6 },
    { load: 88, sfoc: 209.7 },
    { load: 89, sfoc: 209.8 },
    { load: 90, sfoc: 209.9 },
    { load: 91, sfoc: 210.1 },
    { load: 92, sfoc: 210.2 },
    { load: 93, sfoc: 210.4 },
    { load: 94, sfoc: 210.6 },
    { load: 95, sfoc: 210.8 },
    { load: 96, sfoc: 211.0 },
    { load: 97, sfoc: 211.3 },
    { load: 98, sfoc: 211.5 },
    { load: 99, sfoc: 211.8 },
    { load: 100, sfoc: 212.1 },
  ];

  const timeList: number[] = [
    0,
    9,
    10,
    13,
    11,
    27,
    19,
    21,
    8,
    18,
    27,
    7,
    9,
    42,
    65,
    48,
    33,
    46,
    47,
    49,
    56,
    36,
    30,
    37,
    38,
    58,
    53,
    55,
    74,
    36,
    49,
    41,
    29,
    51,
    78,
    59,
    4,
    54,
    4,
    21,
    7,
    4,
    4,
    5,
    9,
    10,
    21,
    22
  ];

  const timeList2: number[] = [
    0,
    21.38181818,
    21.50769231,
    9.710526316,
    6.233766234,
    4.551724138,
    3.793103448,
    4.275862069,
    7.2,
    21.41860465,
    4.620689655,
    52.70967742,
    3.290322581,
    9,
    20,
    32,
    32,
    45,
    51,
    32,
    33,
    33,
    45,
    42,
    70,
    47,
    71,
    53,
    68,
    60,
    63,
    61,
    62,
    35,
    40,
    42,
    48,
    27,
    35,
    25,
    12,
    22,
    24,
    23,
    13,
    28
  ];

  const powerGE1 = [
    250,
    245,
    250,
    250,
    245,
    250,
    250,
    250,
    245,
    250,
    245,
    250,
    170,
    170,
    165,
    170,
    170,
    170,
    170,
    170,
    170,
    170,
    165,
    170,
    170,
    170,
    165,
    170,
    170,
    165,
    170,
    170,
    170,
    170,
    170,
    170,
    250,
    250,
    245,
    250,
    250,
    250,
    245,
    250,
    250,
    250,
    250,
    245
  ];

  const powerGE2 = [
    245,
    245,
    250,
    250,
    250,
    250,
    250,
    245,
    245,
    250,
    250,
    250,
    250,
    170,
    165,
    170,
    165,
    170,
    170,
    165,
    170,
    170,
    170,
    170,
    170,
    165,
    165,
    170,
    170,
    165,
    170,
    170,
    170,
    165,
    170,
    165,
    170,
    245,
    245,
    250,
    250,
    250,
    245,
    245,
    250,
    250,
  ]

  const sbyFocPort: number[] = [
    0.07332358,
    0.1073028,
    0.111573,
    0.111573,
    0.111573,
    0.1161072,
    0.111573,
    0.111573,
    0.0798237,
  ];



    const paramterHoltrop = () => {
        const txtQualify = "Memenuhi parameter Holtrop";
        const txtNotQualify = "Tidak memenuhi parameter Holtrop";

        const Vms = v * 0.514444;
        const fn = Vms / Math.pow(g*lwl, 0.5);
        const LB = lwl / b;
        const BT = b/t;

        const statusFN = fn < 1 ? txtQualify : txtNotQualify;
        const statusLB = LB > 3.90 && LB < 14.90 ? txtQualify : txtNotQualify;
        const statusBT = BT > 2.10 && BT < 4 ? txtQualify : txtNotQualify;
        const statusCP = cp > 0.55 && cp < 0.85 ? txtQualify : txtNotQualify;

        const Rows: ParameterHoltrop[] = [
            {
                name: 'FN',
                value: toFixNumber(fn,3),
                status: statusFN
            },
            {
                name: 'CP',
                value: toFixNumber(cp, 3),
                status: statusCP
            },
            {
                name: 'L/B',
                value: toFixNumber(LB, 3),
                status: statusLB
            },
            {
                name: 'B/T',
                value: toFixNumber(BT, 3),
                status: statusBT
            }
        ]

        context?.setDataParameterHoltrop(Rows);

    }

    const perhitunganTahanan = (ms: number) => {
        const rn = Math.round(ms * lwl / viskositas);
        const cf = 0.075 / (Math.log10(rn)-2) ** 2;
        const rf = (0.5 * p * ms ** 2 * S) * cf;
        return {rn: rn, cf:cf, rf: rf}
    }

    const formFactor = (rf:number) => {
        return K1 * rf;
    }


    const tambahanTahanan = (ms:number, cf:number) => {
        const K2Skeg = 2;
        const K2TwinScrewBalanceRudder = 2.8;
        //const sigmaK2 = K2Skeg + K2TwinScrewBalanceRudder;
        const c1 = 1;
        const c2 = 1;
        const c3 = 1;
        const c4 = 1.5;
        const Saap = c1 * c2 * c3 * c4 * ((1.75*lwl*t)/100);
        const K2eq = (K2TwinScrewBalanceRudder * Saap) / Saap;//(sigmaK2 * Saap) / Saap;
        const rapp = 0.5 * p * (ms ** 2) * Saap * K2eq * cf;

        return rapp;
    }

    const tahananGelombang = (ms: number) => {
        const fn = ms / ((g * lwl) ** 0.5); 
        const m2 = C15 * (cp ** 2) * Math.exp(-0.1 * fn ** -2);
        const Rw = C1 * C2 * C5 * p * g * Vdispl * Math.exp(m1 * (fn ** d) + m4 * Math.cos(lamda * fn ** -2));

        return {fn: fn, m2: m2, Rw: Rw}
    }


    const tahananBulbousBow = (ms:number) => {
        const fni = ms / (g * (t - hB - 0.25 * ABT ** 0.5 ) + 0.15 * ms ** 2) ** 0.5;
        const RB = 0.11 * Math.exp(-3 * PB ** -2) * fni ** 3 * ABT ** 1.5 * p * g / (1 + fni ** 2);

        return {fni: fni, RB:RB}
    }

    const immersedTransform = (ms: number) => {
        const Fnt = ms / (((2 * g * AT) / (b + b * CW)) ** 0.5);
        const C6 = 0.2*(1-0.2*Fnt);
        const Rtr = 0.5 * p * ms ** 2 * AT * C6;
        return {Fnt: Fnt, Rtr: Rtr, C6: C6};
    }


    const tahananKorelasiKapal = (ms: number) => {
        const ra = 0.5 * CA * p * S * ms ** 2;
        return ra;
    }

    const hullRoughness = (ms: number) => {
        return 0.5 * Acf * p * S * ms ** 2;
    }

    const efekDraft = (aops: number) => {
        const eRT = 163135.9611;
        const N = 0.65 * eRT * ((Displ / aops) - 1);
        const kN = N/1000;
        return {N: N, kN: kN}
    }

    const efekAngin = (actualKnot: number, ywr: number) => {
        const pA = 1.184/1000;
        const CxDefault = 0.8;
        const Af = 3*10+(2.7*13)*5+2.7*b+(h-t)*b;
        const angleInDegrees = ywr;
        const angleInRadians = angleInDegrees * (Math.PI / 180);
        const knotVair = ywr > 90 ? 0 : Math.cos(angleInRadians) * actualKnot;
        const msVair = knotVair * 0.514444;
        const raa = 0.5 * pA * msVair ** 2 * CxDefault * Af;
        return {knotVair: knotVair, msVair: msVair, raa: raa}
    }


    const efekSuhuDanGaram = (ms: number, cf: number, vs:number, PsuhuGaram: number, rt: number, rf: number) => {
        const nu = vs*(10 ** -6);
        const RNSuhuGaram = (lwl * ms) / nu;
        const CFSuhuGaram = 0.075 / (Math.log10(RNSuhuGaram)-2) ** 2;
        const RAS = rt * (1 - (PsuhuGaram / p)) - rf * (1 - (CFSuhuGaram / cf));
        const obj = {PsuhuGaram: PsuhuGaram, nu: nu, RNSuhuGaram: RNSuhuGaram, CFSuhuGaram: CFSuhuGaram, RAS:RAS};
        //console.log("Rt", toFixNumber(RT, 4));
        return JSON.stringify(obj);
    }
    const efekGelombang = (h: number, ms: number, PsuhuGaram: number, fita: number) => {
        const amplitudo = 0.5 * h;
        const fn = ms / (g * lwl);
        const LE = 26.185;
        const E = (Math.atan(b / (2 * LE))) * (180 / Math.PI);
        const radians = (angle: number) => (angle * Math.PI) / 180;
        const Bf = 2.25 * ((1 - Math.cos(radians(2 * E)) / 2));
        const CU = Math.max(-30 * Bf + 68.1);
        const aU = 1 + CU * fn;
        const aT = 1;
        const Rawr = 0.5 * PsuhuGaram * g * (amplitudo ** 2) * b * Bf * aT * aU;
        const a1 = 60.3 * CB ** 1.34 * ((1/CB) ** (1 + fn));
        const a2 = 0.0072 + 0.24 * fn;
        const kyy = 0.25;
        const cC1 =0.4567*(CB/kyy)+1.689;
        const b1 = -8.5;
        const d1 = -566*(lpp/b) ** -2.66;
        const omega = (((lpp / g ) ** 0.5 * (kyy / lpp) ** (1 / cC1) * 0.05 ** 0.143) / (1.09 +(kyy / 0.25) * 0.08)) * fita;
        const Rawm = 4 * PsuhuGaram * g * amplitudo ** 2 * b ** 2 / lpp * omega ** b1 * Math.exp((b1 / d1) * (1 - omega ** d1)) * a1* a2;
        const Raw = Rawm + Rawr;
        const Tgel = 1;
        const y = 3.3;
        const sigma = 0.07;
        const sn = (320 * h ** 2) / (Tgel ** 4 * fita ** 5) * Math.exp(-1950/(Tgel ** 4 * fita ** 4)) * y ** Math.exp((fita - fita) ** 2 / (2 * sigma ** 2 * fita ** 2));
        const Rawl = 2*(Raw/Math.pow(amplitudo, 2))*sn;

        const obj = {sn: sn, rwave: Raw, amp: amplitudo,rawl: Rawl};
        return JSON.stringify(obj);
    }


    const stawaveMethod = (rds: number, raa: number, rt: number, objSuhuGaram: string, objStw: string) => {
        const Stawave = JSON.parse(objStw);
        const SuhuGaram = JSON.parse(objSuhuGaram);
        const Rstawave = (rds + raa + SuhuGaram.RAS + Stawave.rawl) / 1000;
        const Rholtrop = rt;
        const RTotal = Rstawave + Rholtrop;
        const jsonObj =  {Rstawave: Rstawave, Rholtrop: Rholtrop, RTotal: RTotal};
        return JSON.stringify(jsonObj);
    }

    // const correctiveResistance = (Nm: number, radis: number, raa: number, objSuhuGaram: string, objStw: string, objMethod: string) => {
    //     const m = 1852 * Nm;
    //     const radisXd = radis * m;
    //     const raaXd = raa * m;
    //     const Stawave = JSON.parse(objStw);
    //     const SuhuGaram = JSON.parse(objSuhuGaram);
    //     const stwvMthod = JSON.parse(objMethod);
    //     const RASxD = SuhuGaram.RAS * m;
    //     const RawlxD = Stawave.rawl * m;
    //     const ehp = stwvMthod.RTotal * m;

    //     const obj = {m: m, radisXd:radisXd, raaXd: raaXd, RASxD: RASxD, RawlxD: RawlxD, ehp: ehp};
    //     return obj;

    // }

    // const calculateRcorrect = (ehp: any, m: number, radisXd:number, raaXd: number, RASxD: number, RawlxD: number) => {
    //     const result: number[] = [];
    //     ehp.map((item: any) => {
    //         const res = (item - radisXd - raaXd - RASxD - RawlxD) / m;
    //         result.push(res)
    //     })
    //     return result;
    // }

    const power = (ms: number, stawaveObj: string) => {
        const stawave = JSON.parse(stawaveObj);
      
       const EHP = ms * stawave.RTotal;
       const CB1 = 0.7;	
       const w1 = 0.091;
       const CB2 = 0.75
       const w2 = 0.143;
       const w =  (((CB - CB1) * (w2 - w1)) / (CB2 - CB1)) + w1;
       const Tpower = 0.7 * w + 0.06;
       const nH = (1 - Tpower) / (1 -w);
       const THP = EHP / nH;
       const nR = 0.95;
       const nO = 0.5;
       const nB = nO * nR;
       const DHP = THP / nB;
       const nS = 0.98;
       const SHP = DHP / nS;
       const nG = 0.98;
       const BHP = SHP / nG;

       const obj = {EHP: EHP, THP: THP, DHP: DHP, SHP: SHP, BHP: BHP};
       
       return JSON.stringify(obj);
    }

    const getSfoc = (load: number, multiplier: number, dataSfoc: any) => {
        let result: number = 0;
        if(load < dataSfoc[0].load){
            result = dataSfoc[0].sfoc * multiplier;
        } else {
            const searchResult = dataSfoc.find((item: { load: number; }) => item.load === load);
            if(searchResult){
                result = searchResult?.sfoc * multiplier;
            }
        }

        return result;
    }

    const foc = (ms: number, time: number , powerObj: string, type: string, sfocList: any, powerGE: number) => {
        const multiplier = type == "ME" ? 1.095 : 1.1;
        const parsePower = JSON.parse(powerObj);
        const bhp = type == "ME" ? parsePower.BHP : powerGE;
        const usedEngine = 2;
        const powerEngine = type == "ME" ? 2500 : 276;
        const engineLoad = Math.round(((bhp / (usedEngine * powerEngine)) * 100));
        const sfoc = engineLoad > 0 ? getSfoc(engineLoad, multiplier, sfocList) : 0;
        const hour = time / 60;
        const gram = sfoc * (bhp * hour);
        const ton = gram / 1000000;
        const densityDO = (1000/859.1)*1000;
        const liter = ton * densityDO;
        const obj = {gr: gram, ton: ton, liter: liter, load: engineLoad, sfoc: sfoc, hour: hour, power: bhp}
        return JSON.stringify(obj);
        
    }


    const calculateData = (arrayData: any, aops: number, isSUBBAJ: boolean) => {
        const result: ResultCalculate[] = [];

        arrayData.map((item: any, index: number) => {
            const time = isSUBBAJ ? timeList[index] : timeList2[index];
            const ms = item.Knot * 0.514444;
            const hitunganTahanan = perhitunganTahanan(ms);
            const k1 = formFactor(hitunganTahanan.rf);
            const rapp = tambahanTahanan(ms, hitunganTahanan.cf);
            const gelombang = tahananGelombang(ms);
            const bulbousBow = tahananBulbousBow(ms);
            const ra = tahananKorelasiKapal(ms);
            const RAf = hullRoughness(ms);
            const immersed = immersedTransform(ms);
            const rt = k1 + rapp + gelombang.Rw + bulbousBow.RB + ra + RAf + immersed.Rtr;
            const seaMargin = rt + (0.15 * rt);
            const draft = efekDraft(aops);
            const ywr = item.Heading > 90 ? sudutAngin - item.Heading : (360 - sudutAngin) + item.Heading;
            const angin = efekAngin(item.actualKnot, ywr);
            const vs = 0.90331;
            const PsuhuGaram = 1022.7626/1000;
            const efekSuhuGaram = efekSuhuDanGaram(ms, hitunganTahanan.cf, vs, PsuhuGaram, rt * 1000, k1 * 1000);
            const waveResistance = efekGelombang(item.H, ms, PsuhuGaram, item.Fita);
            const waveMethod = stawaveMethod(draft.N, angin.raa, rt, efekSuhuGaram, waveResistance);
            const powerShip = power(ms, waveMethod);
            const dataFocME = foc(ms, time, powerShip, "ME", sfocDataME, isSUBBAJ ? powerGE1[index] : powerGE2[index]);
            const dataFocGE = foc(ms, time, powerShip, "GE", sfocDataGE, isSUBBAJ ? powerGE1[index] : powerGE2[index]);
           

            result.push({
                time: time,
                knot: item.Knot,
                h: item.H,
                fita: item.Fita,
                ms: ms,
                rn: hitunganTahanan.rn,
                cf: hitunganTahanan.cf,
                rf: hitunganTahanan.rf,
                k1: k1,
                rapp: rapp,
                fn: gelombang.fn,
                m2: gelombang.m2,
                rw: gelombang.Rw,
                fni: bulbousBow.fni,
                rb: bulbousBow.RB,
                fnt: immersed.Fnt,
                c6: immersed.C6,
                rtr: immersed.Rtr,
                ra: ra,
                rt: rt,
                RAf: RAf,
                seaMargin: seaMargin,
                tops: tops,
                aops: aops,
                radis: draft.N,
                drafKn: draft.kN,
                knotVair: angin.knotVair, 
                msVair: angin.msVair, 
                raa: angin.raa,
                ywr: ywr,
                actualKnot: item.actualKnot,
                temp: item.Temp,
                efekSuhuGaram: efekSuhuGaram,
                efekGelombang: waveResistance,
                stawaveMethod: waveMethod, 
                power: powerShip,
                focME: dataFocME,
                focGE: dataFocGE
            })
        })


        return result;
    }

    const getCIIRating = (score: number) => {
        score = isNaN(score) ? 0 : score;
        switch (true) {
            case score < 0.83:
              return 'A';
            case score < 0.94:
              return 'B';
            case score < 1.06:
              return 'C';
            case score < 1.19:
              return 'D';
            default:
              return 'E';
          }
    }

    const calculateCII = (dataTIme: DataTime[], dataResistance: ResultCalculate[], nmS: any, lastSKom: number, lastFocME: number, lastFocGE: number) => {
        let lastNm = lastSKom;
        let lastFocMEton = lastFocME;
        let lastFocGEton = lastFocGE;
        const dataCII: CIIEntry[] = [];
        dataTIme.map((item, index) => {
            const focME = JSON.parse(dataResistance[index].focME);
            const focGE = JSON.parse(dataResistance[index].focGE);
            const knot = dataResistance[index].knot;
            const nm = nmS[index];
            const mulkom = 3.206;
            const Skomulatif = nm + lastNm;
            lastNm = Skomulatif;
            const focMEton = focME.ton;
            const focMEtonKomulatif = focMEton + lastFocMEton;
            lastFocMEton = focMEtonKomulatif;
            const attainedME = (focMEtonKomulatif * mulkom)/(dwt * Skomulatif) * 10 ** 6;
            const focGEton = focGE.ton;
            const focGEtonKomulatif = focGEton + lastFocGEton;
            lastFocGEton = focGEtonKomulatif;
            const attainedGE = (focGEtonKomulatif * mulkom) / (dwt * Skomulatif) * 10 ** 6;
            const attainedCII = attainedME + attainedGE;
            const CIIRef = 588 * (dwt ** -0.3885);
            const ReqCII = ((100 - 5) / 100) * CIIRef;
            const ReqCIIFOC = attainedCII / ReqCII;
            const CIIRating = getCIIRating(ReqCIIFOC);
            dataCII.push({
                timestamp: item.timestamp,
                duration: item.duration,
                lat: item.lat,
                long: item.long,
                knot: knot,
                s: nm,
                skom: Skomulatif,
                focME: focMEton,
                focMEKom: focMEtonKomulatif,
                attainedME: attainedME,
                focGE: focGEton,
                focGEKom: focGEtonKomulatif,
                attainedGE: attainedGE,
                attainedCII: attainedCII,
                CIIRef: CIIRef,
                ReqCII: ReqCII,
                ReqCIIFOC: ReqCIIFOC,
                rating: CIIRating
            })
        })

        return dataCII;
    }

    const calculateCIIPort = (dataTIme: DataTime[], lastSKom: number, lastFocME: number, lastFocGE: number, location: string) => {
        let lastNm = lastSKom;
        let lastFocMEton = lastFocME;
        let lastFocGEton = lastFocGE;
        const dataCII: CIIEntry[] = [];
        dataTIme.map((item, index) => {
            const knot = 0;
            const nm = 0;
            const mulkom = 3.206;
            const Skomulatif = nm + lastNm;
            lastNm = Skomulatif;
            const focMEton = 0;
            const focMEtonKomulatif = focMEton + lastFocMEton;
            lastFocMEton = focMEtonKomulatif;
            const attainedME = (focMEtonKomulatif * mulkom)/(dwt * Skomulatif) * 10 ** 6;
            const focGEton = location == "SBY" ? sbyFocPort[index] : 0;
            const focGEtonKomulatif = focGEton + lastFocGEton;
            lastFocGEton = focGEtonKomulatif;
            const attainedGE = (focGEtonKomulatif * mulkom) / (dwt * Skomulatif) * 10 ** 6;
            const attainedCII = attainedME + attainedGE;
            const CIIRef = 588 * (dwt ** -0.3885);
            const ReqCII = ((100 - 5) / 100) * CIIRef;
            const ReqCIIFOC = attainedCII / ReqCII;
            const CIIRating = getCIIRating(ReqCIIFOC);
            dataCII.push({
                timestamp: item.timestamp,
                duration: item.duration,
                lat: item.lat,
                long: item.long,
                knot: knot,
                s: nm,
                skom: Skomulatif,
                focME: focMEton,
                focMEKom: focMEtonKomulatif,
                attainedME: attainedME,
                focGE: focGEton,
                focGEKom: focGEtonKomulatif,
                attainedGE: attainedGE,
                attainedCII: attainedCII,
                CIIRef: CIIRef,
                ReqCII: ReqCII,
                ReqCIIFOC: ReqCIIFOC,
                rating: CIIRating
            })
        })

        return dataCII;
    }

    const onCalculate = () => {
        paramterHoltrop()
        const resCal = calculateData(listKnot, 9804.4, true);
        const resCal2 = calculateData(listKnot2, 9710.4, false);
        context?.setDataResultCalculate(resCal);
        context?.setDataResultCalculate2(resCal2);
        const CIISubBaj = calculateCII(dataTimeSubBaj, resCal, Nm, 0, 0, 0);
        const BajPort = calculateCIIPort(dataTimeBajPort, CIISubBaj[CIISubBaj.length - 1].skom, CIISubBaj[CIISubBaj.length - 1].focMEKom, CIISubBaj[CIISubBaj.length - 1].focGEKom, "BAJ");
        const CIIBajSub = calculateCII(dataTimeBajSub, resCal2, Nm2, BajPort[BajPort.length - 1].skom, BajPort[BajPort.length - 1].focMEKom, BajPort[BajPort.length - 1].focGEKom);
        const SubPort = calculateCIIPort(dataTimeSubPort, CIIBajSub[CIIBajSub.length - 1].skom, CIIBajSub[CIIBajSub.length - 1].focMEKom, CIIBajSub[CIIBajSub.length - 1].focGEKom, "SBY");

        const combinedArray = CIISubBaj.concat(BajPort, CIIBajSub, SubPort);

        context?.setCII(combinedArray);
        console.log(combinedArray);
        
        toast.success('Perhitungan selesai!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }


  return (
    <Box>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
        />
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <PageContainer title="Ship Resistance">
                        <Box sx={{ width: '90%' }}>
                                <DashboardCard title="Form">
                                    <div>
                                        <Box
                                        component="form"
                                        sx={{
                                            '& .MuiTextField-root': { m: 1},
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                            <TextField
                                                required
                                                label="Owner"
                                                type="text"
                                                value={owner}
                                                onChange={e => setOwner(e.target.value)}
                                            />
                                            <TextField
                                                required
                                                label="Tipe"
                                                type="text"
                                                value={tipe}
                                                onChange={e => setTipe(e.target.value)}
                                            />
                                            <TextField
                                                    required
                                                    label="LOA"
                                                    type="number"
                                                    value={loa}
                                                    onChange={e => setLoa(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="LPP"
                                                    type="number"
                                                    onChange={e => setLpp(parseFloat(e.target.value))}
                                                    value={lpp}
                                                />
                                                <TextField
                                                    required
                                                    label="B"
                                                    type="number"
                                                    value={b}
                                                    onChange={e => setB(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="H"
                                                    type="number"
                                                    value={h}
                                                    onChange={e => setH(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="T"
                                                    type="number"
                                                    value={t}
                                                    onChange={e => setT(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="GT"
                                                    type="number"
                                                    value={gt}
                                                    onChange={e => setGt(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="DWT"
                                                    type="number"
                                                    value={dwt}
                                                    onChange={e => setDwt(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="V"
                                                    type="number"
                                                    value={v}
                                                    onChange={e => setV(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="LWL"
                                                    type="number"
                                                    value={lwl}
                                                    onChange={e => setLwl(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="BWL"
                                                    type="number"
                                                    value={bwl}
                                                    onChange={e => setBwl(parseFloat(e.target.value))}
                                                />
                                                <TextField
                                                    required
                                                    label="CP"
                                                    type="number"
                                                    value={cp}
                                                    onChange={e => setCp(parseFloat(e.target.value))}
                                                />
                                                {/* <TextField
                                                    required
                                                    label="TOPS"
                                                    type="number"
                                                    value={tops}
                                                /> */}
                                        </Box>
                                        <Box sx={{ p: 2, textAlign: 'right'}}>
                                            <Button variant="contained" onClick={onCalculate}>Kalkulasi</Button>
                                        </Box>
                                    </div>
                                </DashboardCard>
                        </Box>
                    </PageContainer>
                </Box>
            </Box>
  );
};

export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};