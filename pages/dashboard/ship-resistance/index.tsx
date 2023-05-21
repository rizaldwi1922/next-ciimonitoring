import { ReactElement, useState } from 'react';
import { 
    TextField,
    Box,
    Typography,
    Button,
    Drawer,
    Toolbar,
    Divider,
    List,
    ListItem,
    ListItemButton
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';
import RenderIf from '../../../src/components/container/RenderIf';
import ParameterMetodeHoltrop from './tabsValue/ParameterMetodeHoltrop';
import PerhitunganTahan from './tabsValue/PerhitunganTahanan';
import FormFactor from './tabsValue/FormFactor';
import TambahanTahanan from './tabsValue/TambahanTahanan';
import TahananGelombang from './tabsValue/TahananGelombang';
import TahananBulbousBow from './tabsValue/TahananBulbousBow';
import TahananKorelasiModelKapal from './tabsValue/TahananKorelasiModelKapal';
import TahananTotal from './tabsValue/TahananTotal';
import TahananKapal from './tabsValue/TahananKapal';
import ListItemText from '@mui/material/ListItemText';
import HullRoughness from './tabsValue/HullRoughness';
import ImmersedTransform from './tabsValue/ImmersedTransform';
import { IconClockHour6 } from '@tabler/icons';

const Ship = () => {

    const drawerWidth = 200;

    interface TabPanelProps {
        children?: React.ReactNode;
        index: number;
        value: number;
    }

    interface ParameterHoltrop {
        name: string,
        value: number,
        status: string
    }

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
        fnt:number,
        c6: number,
        rtr: number,
        ra: number,
        rt: number,
        RAf: number,
        seaMargin: number
    }

    const baseURl = process.env.NEXT_PUBLIC_URL;
    const [selectedMenu, setSelectedMenu] = useState(0);
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
    const tops = t;
    const g = 9.81;
    const p = 1.0234;
    const LCB = 55.078;
    const Displ = 11034.4;
    const ABT = (7725837/1000000)*2;
    const hB = 3507.5201/1000;
    const CB = 0.7736;
    const C7 = bwl / lwl;
    const C15 = -1.69385;
    const TB = tops / bwl;
    const viskositas = 0.94252 * 10 ** -6;
    const CM = 0.987;
    const CW = 0.8551;
    const midship = lpp/2;
    const fromMidship = LCB - midship;
    const LR = lwl * (1-cp+(0.06*cp*(fromMidship / (4*cp)-1)));
    const LRB = LR / bwl;
    const LT = lwl/tops;
    const BL = bwl/lwl;
    const Vdispl  = Math.round(Displ / p);
    const iE = 1 + 89 * Math.exp(-((lwl/bwl) ** 0.80856) * ((1-CW) ** 0.30484) * ((1 - cp - 0.0225 * fromMidship) ** 0.6367) * LRB ** 0.34574) * ((100 * Vdispl / (lwl ** 3)) ** 0.16302);
    const AT = (2237963*2)/1000000;
    const C1 =  222.3105 * (C7 ** 3.78613) * (TB ** 1.07961) * ((90 - iE ) ** 1.07961);
    const C3 = (0.56 * (ABT ** 1.5)) / (bwl * tops * (0.31 * (ABT ** 0.5) + tops - hB));
    const C2 = Math.exp(-1.89 * (C3 ** 0.5));
    const C5 = 1-((0.8 * AT)/(bwl * tops * CM));
    const C4 = 0.04;
    const CA = 0.00546 * ((lwl + 100) ** -0.16) - 0.002 + 0.003 * ((lwl / 7.5) ** 0.5) * (CB ** 4) * C2 * (0.04 - C4);
    const TFLWL = tops / lwl;
    const Cstern = -22;
    const C14 = 1+0.001*Cstern;
    const K1 = 0.93 + 0.487118 * C14 * ((bwl/lwl) ** 1.06806) * ((tops/lwl) ** 0.46106) * ((lwl/LR) ** 0.121563) * ((lwl ** 3 / Vdispl) ** 0.36486) * ((1-cp) ** -0.604247);
    const lamda = (1.446 * cp) * (0.03 * (lwl/bwl));
    const C16 = 8.07981 * cp - 13.8673 * (cp ** 2) + 6.984388 * (cp ** 3);
    const m1 = 0.0140407 * LT - 1.75254 * ((Vdispl ** (1/3))/lwl) - 4.79323 * BL - C16;
    const m4 = 0.4 * C15 * Math.exp(-0.034 * (0.4 ** -3.29));
    const d = -0.9;
    const PB = 0.56 * ABT ** 0.5 / (tops - 1.5 * hB);
    const S = lwl * (2*tops+bwl) * CM ** 0.5 * (0.453 + 0.4425 * CB - 0.2862 * CM - 0.003467 * (bwl/tops) + 0.3696 * CW) + 2.38 * ABT/CB;
    const mikrometer = 150;
    const Ks = mikrometer * 10 ** -6;
    const Acf = (105 * ((Ks/lwl) ** (1/3)) - 0.64) / 10 ** 3;

    const [dataParameterHoltrop, setDataParameterHoltrop] = useState<ParameterHoltrop[]>([]);
    const [dataResultCalculate, setDataResultCalculate] = useState<ResultCalculate[]>([]);

    const ListItemNav = [
        "Form",
        "Parameter Metode Holtrop",
        "Tahanan Gesek",
        "Form Factor",
        "Tahanan Tambahan",
        "Tahanan Gelombang",
        "Tahanan akibat adanya bulbous bow",
        "Tahanan immersed transom",
        "Tahanan Korelasi Model Kapal",
        "Hull Roughness",
        "Tahanan Total",
        "Tahanan Kapal"
    ];

    const listKnot = [
        0,
        3.8,
        4.3,
        4.7,
        5.8,
        7.4,
        7.9,
        8.7,
        9.8,
        10.9,
        11.2,
        11.2,
        11.8,
        11.8,
        11.7,
        11.3,
        10.1,
        9.7,
        9.6,
        9.7,
        9.7,
        9.6,
        9.8,
        9.7,
        9.7,
        9.8,
        9.8,
        9.6,
        9.8,
        9.8,
        9.8,
        9.7,
        9.9,
        9.3,
        9.2,
        9.2,
        9.3,
        9.3,
        9.3,
        9.1,
        9,
        8.6,
        8.8,
        8.7,
        7.6,
        7.7,
        7.6,
        7.5,
        6.7,
        5.4
      ];

    const toFixNumber = (value: number, length: number) => {
        return Number(value.toFixed(length));
    }

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

        setDataParameterHoltrop(Rows)

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
        const fni = ms / (g * (tops - hB - 0.25 * ABT ** 0.5 ) + 0.15 * ms ** 2) ** 0.5;
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

    const onCalculate = () => {
        console.log("C2", C2);
        console.log("C3", C3);
        console.log("C5", C5);
        paramterHoltrop()
        const result: ResultCalculate[] = [];
        listKnot.map((knot) => {
            const ms = knot * 0.514444;
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
            result.push({
                knot: knot,
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
                seaMargin: seaMargin
            })
        })
        setDataResultCalculate(result);
    }


  return (
    <Box>
                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <PageContainer title="Ship Resistance">
                        <Box sx={{ width: '90%' }}>
                            <RenderIf condition={selectedMenu == 0}>
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
                                                <TextField
                                                    required
                                                    label="TOPS"
                                                    type="number"
                                                    value={tops}
                                                />
                                        </Box>
                                        <Box sx={{ p: 2, textAlign: 'right'}}>
                                            <Button variant="contained" onClick={onCalculate}>Kalkulasi</Button>
                                        </Box>
                                    </div>
                                </DashboardCard>
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 1}>
                                <ParameterMetodeHoltrop data={dataParameterHoltrop} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 2}>
                                <PerhitunganTahan data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 3}>
                                <FormFactor data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 4}>
                                <TambahanTahanan data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 5}>
                                 <TahananGelombang data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 6}>
                                <TahananBulbousBow data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 7}>
                                <ImmersedTransform data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 8}>
                                <TahananKorelasiModelKapal data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 9}>
                                <HullRoughness data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 10}>
                                <TahananTotal data={dataResultCalculate} toFixNumber={toFixNumber} />
                            </RenderIf>
                            <RenderIf condition={selectedMenu == 11}>
                                <TahananKapal data={dataResultCalculate} />
                            </RenderIf>
                        </Box>
                    </PageContainer>
                </Box>
                <Drawer
                    sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    <Toolbar>
                        <Typography variant="h5" component="h2">
                        Ship Resistance
                        </Typography>
                    </Toolbar>
                    <Divider />
                    <List>
                    {ListItemNav.map((text, index) => (
                        <ListItem key={text} disablePadding selected={selectedMenu === index}>
                            <ListItemButton onClick={() => setSelectedMenu(index)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                </Box>
  );
};

export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};