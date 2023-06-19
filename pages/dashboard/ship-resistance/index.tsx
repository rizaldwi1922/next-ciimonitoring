import { ReactElement, useState } from 'react';
import { useContext } from 'react';
import { MyContext } from '../../contexts/MyContext';
import { ParameterHoltrop } from '../../../src/interface/ParameterHoltrop';
import { ResultCalculate } from '../../../src/interface/ResultCalculate';
import { ResultPower } from '../../../src/interface/ResultPower';
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
        { Knot: 0, Temp: 27, Heading: 0, actualKnot: 0, H: 0, Fita: 0 },
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
        { Knot: 11.8, Temp: 27, Heading: 195, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 11.8, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 12.1, Temp: 27, Heading: 206, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 10.2, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.9, Temp: 27, Heading: 206, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.8, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 27, Heading: 205, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 27, Heading: 204, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.6, Temp: 27, Heading: 210, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 27, Heading: 210, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 27, Heading: 213, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.8, Temp: 27, Heading: 210, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 23, Heading: 211, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 23, Heading: 214, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.8, Temp: 23, Heading: 210, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.8, Temp: 23, Heading: 214, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 23, Heading: 214, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 23, Heading: 211, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 23, Heading: 213, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.7, Temp: 23, Heading: 212, actualKnot: 8, H: 0.87, Fita: 7.89 },
        { Knot: 9.6, Temp: 23, Heading: 212, actualKnot: 8, H: 0.7, Fita: 7.89 },
        { Knot: 9.6, Temp: 23, Heading: 214, actualKnot: 8, H: 0.7, Fita: 7.89 },
        { Knot: 9.2, Temp: 23, Heading: 215, actualKnot: 8, H: 0.7, Fita: 7.89 },
        { Knot: 9.1, Temp: 23, Heading: 212, actualKnot: 8, H: 0.7, Fita: 3.59 },
        { Knot: 9.1, Temp: 23, Heading: 212, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 8.5, Temp: 23, Heading: 200, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 8.3, Temp: 23, Heading: 215, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 7.6, Temp: 23, Heading: 203, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 7.5, Temp: 23, Heading: 190, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 6.8, Temp: 23, Heading: 178, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 6.7, Temp: 23, Heading: 175, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 6.5, Temp: 23, Heading: 58, actualKnot: 5, H: 0.18, Fita: 3.59 },
        { Knot: 5.3, Temp: 23, Heading: 58, actualKnot: 5, H: 0.18, Fita: 3.59 }
      ];

      const Nm = [
        0.00,
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
        6.90,
        6.50,
        6.20,
        7.00,
        8.50,
        8.30,
        7.00,
        6.60,
        7.00,
        10.10,
        8.00,
        7.50,
        8.70,
        9.50,
        8.50,
        7.00,
        7.00,
        6.90,
        10.20,
        11.30,
        7.60,
        9.80,
        16.70,
        8.00,
        8.10,
        10.70,
        0.51,
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
    0.00,
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
    10.70,
    16.10,
    16.70,
    9.80,
    7.60,
    11.00,
    10.20,
    6.90,
    7.00,
    7.00,
    8.50,
    9.50,
    8.70,
    7.50,
    8.00,
    10.10,
    7.00,
    6.60,
    7.30,
    8.30,
    8.50,
    7.00,
    6.20,
    6.50,
    6.90,
    5.00,
    3.40,
    1.50,
    2.80,
    2.70,
    2.60,
    1.40,
    2.50
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

    const correctiveResistance = (Nm: number, radis: number, raa: number, objSuhuGaram: string, objStw: string, objMethod: string) => {
        const m = 1852 * Nm;
        const radisXd = radis * m;
        const raaXd = raa * m;
        const Stawave = JSON.parse(objStw);
        const SuhuGaram = JSON.parse(objSuhuGaram);
        const stwvMthod = JSON.parse(objMethod);
        const RASxD = SuhuGaram.RAS * m;
        const RawlxD = Stawave.rawl * m;
        const ehp = stwvMthod.RTotal * m;

        // setMtot(Mtot + m);
        // setRadisTot(radisTot + radisXd);
        // setRaaTot(raaTot + raaXd);
        // setRasTot(rasTot + RASxD);
        // setRawlTot(rawlTot + RawlxD);
        // setEHP([...EHP, ehp]);

        const obj = {m: m, radisXd:radisXd, raaXd: raaXd, RASxD: RASxD, RawlxD: RawlxD, ehp: ehp};
        return obj;

    }

    const calculateRcorrect = (ehp: any, m: number, radisXd:number, raaXd: number, RASxD: number, RawlxD: number) => {
        const result: number[] = [];
        ehp.map((item: any) => {
            const res = (item - radisXd - raaXd - RASxD - RawlxD) / m;
            result.push(res)
        })
        return result;
    }

    const power = (Rcorrect: any, data: any) => {
        const result: ResultPower[] = [];
        data.map((item: any, index: number) => {
            const Stawave = JSON.parse(item.stawaveMethod);
            const CB1 =	0.7;	
            const w1 = 0.091;
            const CB2 =	0.75;
            const w2 = 0.143;
            const w = (((CB - CB1) * (w2-w1)) / (CB2-CB1) + w1);
            const Tt = 0.7 * w + 0.06;
            const nH = (1-Tt) / (1-w);
            const nR = 0.95;
            const nO = 0.45;
            const nB = nR * nO;
            const nS = 0.98;
            const nG = 0.98;
            const Rtotal = Stawave.Rholtrop + Stawave.Rstawave + (Rcorrect[index]/1000);

            const EHP = Rtotal * item.ms;
            const THP = EHP / nH;
            const DHP = THP / nB;
            const SHP = DHP / nS;
            const BHP = SHP / nG;

            result.push(
                {
                    knot: item.knot,
                    ms: item.ms,
                    Rtotal: Rtotal,
                    Rcorrect: Rcorrect[index]/1000,
                    Rholtrop: Stawave.Rholtrop,
                    Stawave: Stawave.Rstawave,
                    EHP: EHP,
                    THP: THP,
                    DHP: DHP,
                    SHP: SHP,
                    BHP: BHP
                }
            );
        })

        return result;
    }

    // const fuel = (power: ResultPower, data: ResultCalculate) => {
    //     const load = 
    // }

    const calculateData = (arrayData: any, aops: number, newton: any) => {
        const result: ResultCalculate[] = [];

        let mtot = 0;
        let RadisTot = 0;
        let RaaTot = 0;
        let RasTot = 0;
        let RawlTot = 0;
        const EHP: number[] = [];

        arrayData.map((item: any, index: number) => {
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
            const corrRest = correctiveResistance(newton[index],draft.N, angin.raa, efekSuhuGaram, waveResistance, waveMethod);

            EHP.push(corrRest.ehp);
            mtot += corrRest.m;
            RadisTot += corrRest.radisXd;
            RaaTot += corrRest.raaXd;
            RasTot += corrRest.RASxD;
            RawlTot += corrRest.RawlxD;

            result.push({
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
                stawaveMethod: waveMethod
            })
        })

        const Rcorrect = calculateRcorrect(EHP, mtot, RadisTot, RaaTot, RasTot, RawlTot);
        const resPower = power(Rcorrect, result);

        return {result: result, resPower: resPower};
    }

    const onCalculate = () => {
        paramterHoltrop()
        const resCal = calculateData(listKnot, 9804.4, Nm);
        const resCal2 = calculateData(listKnot2, 9710.4, Nm2);
        context?.setDataResultCalculate(resCal.result);
        context?.setDataResultCalculate2(resCal2.result);
        context?.setPower(resCal.resPower);
        context?.setPower2(resCal2.resPower);
        
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