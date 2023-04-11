import { ReactElement, useState, useEffect } from 'react';
import { 
    TextField,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TableHead,
    Paper,
    Typography,
    Button
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';
import Breadcrumbs from '../../../src/components/header/breadcrumbs';
import { useRouter } from 'next/router';
import RenderIf from '../../../src/components/container/RenderIf';

const Ship = () => {

    interface FormFactor {
        knot: number,
        ms: number,
        rn: number,
        cf: number,
        rf: number,
        k1: number
      }
      
    interface Tahanan {
        knot: number,
        ms: number,
        rn: number,
        cf: number,
        rf: number,
    }

    const baseURl = process.env.NEXT_PUBLIC_URL;
    const [owner, setOwner] = useState('Kemenhub/BPSDM-Poltekpel');
    const [tipe, setTipe] = useState('Kapal latih');
    // const [loa, setLoa] = useState(63);
    // const [lpp, setLpp] = useState(59.16);
    // const [b, setB] = useState(12);
    // const [h, setH] = useState(4);
    // const [t, setT] = useState(2.8);
    // const [gt, setGt] = useState(1200);
    // const [dwt, setDwt] = useState(186.824);
    // const [v, setV] = useState(12);
    // const [lwl, setLwl] = useState(59.626);
    // const [bwl, setBwl] = useState(12);
    // const [cp, setCp] = useState(0.678);
    const [loa, setLoa] = useState(0);
    const [lpp, setLpp] = useState(0);
    const [b, setB] = useState(0);
    const [h, setH] = useState(0);
    const [t, setT] = useState(0);
    const [gt, setGt] = useState(0);
    const [dwt, setDwt] = useState(0);
    const [v, setV] = useState(0);
    const [lwl, setLwl] = useState(0);
    const [bwl, setBwl] = useState(0);
    const [cp, setCp] = useState(0);
    const [data, setData] = useState([
        {
            name: 'FN',
            value: 0,
            status: ''
        },
        {
            name: 'CP',
            value: 0,
            status: ''
        },
        {
            name: 'L/B',
            value: 0,
            status: ''
        },
        {
            name: 'B/T',
            value: 0,
            status: ''
        }
    ])
    const tops = (2.3+2.8)/2;
    const g = 9.81;

    const [dataTahanan, setDataTahanan] = useState<Tahanan[]>([]);
    const [dataFormFactor, setDataFormFactor] = useState<FormFactor[]>([]);


    const breadcrumb = [
        {
            title: "Ship Resistance",
        }
    ];


    const onProcessPart1 = () => {
        const txtQualify = "Memenuhi parameter Holtrop";
        const txtNotQualify = "Tidak memenuhi parameter Holtrop";

        const Vms = v * 0.514444;
        const fn = Vms / Math.pow(g*lwl, 0.5);
        const LB = lwl / b;
        const BT = b/tops;

        const statusFN = fn < 1 ? txtQualify : txtNotQualify;
        const statusLB = LB > 3.90 && LB < 14.90 ? txtQualify : txtNotQualify;
        const statusBT = BT > 2.10 && BT < 4 ? txtQualify : txtNotQualify;
        const statusCP = cp > 0.55 && cp < 0.85 ? txtQualify : txtNotQualify;
        

        const Rows = [
            {
                name: 'FN',
                value: fn,
                status: statusFN
            },
            {
                name: 'CP',
                value: cp,
                status: statusCP
            },
            {
                name: 'L/B',
                value: LB,
                status: statusLB
            },
            {
                name: 'B/T',
                value: BT,
                status: statusBT
            }
        ]

        setData(Rows)

    }

    const perhitunganTahanan = () => {
        const hasilTahanan = [];
        const viskositas = 0.94252 * 10 ** -6;
        const p = 1.025;
        const ABT = (618811/1000000)*2;
        const CM = 0.976;
        const CB = 0.662;
        const CW = 0.808;
        const S = lwl * (2*tops+bwl) * CM ** 0.5 * (0.453 + 0.4425 * CB - 0.2862 * CM - 0.003467 * (bwl/tops) + 0.3696 * CW) + 2.38 * ABT/CB;
        for (let i = 0; i < 15; i++) {
            const knot = i + 1;
            const ms = knot * 0.514444;
            const rn = Math.round(ms * lwl / viskositas);
            const cf = 0.075 / (Math.log10(rn)-2) ** 2;
            const rf = (0.5 * p * ms ** 2 * S) * cf;
            hasilTahanan.push({
                knot: knot,
                ms: ms,
                rn: rn,
                cf: cf,
                rf: rf
            });
        }
        setDataTahanan(hasilTahanan);
    }

    const formFactor = () => {
        const midship = lpp/2;
        const LCB = 26.533;
        const fromMidship = LCB - midship;
        const LR = lwl * (1-cp+(0.06*cp*(fromMidship / (4*cp)-1)));
        const Cstern = -22;
        const C14 = 1+0.001*Cstern;
        const Displ = 1238;
        const p = 1.025;
        const Vdispl  = Displ / p;
        const K1 = 0.93 + 0.487118 * C14 * ((bwl/lwl) ** 1.06806) * ((tops/lwl) ** 0.46106) * ((lwl/LR) ** 0.121563) * ((lwl ** 3 / Vdispl) ** 0.36486) * ((1-cp) ** -0.604247);
        
        const hasilFormFactor: FormFactor[] = [];

        dataTahanan.forEach((item: Tahanan) => {
            hasilFormFactor.push({
                knot: item.knot,
                ms: item.ms,
                rn: item.rn,
                cf: item.cf,
                rf: item.rf,
                k1: K1 * item.rf
            });
        });
        setDataFormFactor(hasilFormFactor);
    }


  return (
    <PageContainer title="Ship Resistance">
        <Breadcrumbs breadcrumb={breadcrumb} />
        <DashboardCard title="Ship Resistance">
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
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
                            label={loa}
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
                </div>
            </Box>
        </DashboardCard>
        <DashboardCard title="Parameter metode Holtrop">
            <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableBody>                    
                        <RenderIf condition={data.length < 1}>
                            <Box sx={{ p:5, textAlign: 'center' }}>
                                <Typography variant="h6" component="h6">Belum ada data</Typography>
                            </Box>
                        </RenderIf>
                        {data.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">{row.value}</TableCell>
                                <TableCell align="right">{row.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ p: 2, textAlign: 'right'}}>
                <Button variant="contained" onClick={onProcessPart1}>Kalkulasi</Button>
            </Box>
            </div>
        </DashboardCard>
        <DashboardCard title="Perhitungan Tahanan">
            <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rn</TableCell>
                            <TableCell align="center">Cf</TableCell>
                            <TableCell align="center">Rf (KN)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                    
                        <RenderIf condition={data.length < 1}>
                            <Box sx={{ p:5, textAlign: 'center' }}>
                                <Typography variant="h6" component="h6">Belum ada data</Typography>
                            </Box>
                        </RenderIf>
                        {dataTahanan.map((row) => (
                            <TableRow
                                key={row.knot}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align='center'>
                                    {row.knot}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.ms}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.rn}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.cf}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.rf}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ p: 2, textAlign: 'right'}}>
                <Button variant="contained" onClick={perhitunganTahanan}>Kalkulasi</Button>
            </Box>
            </div>
        </DashboardCard>
         <DashboardCard title="Form Factor">
            <div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rn</TableCell>
                            <TableCell align="center">Cf</TableCell>
                            <TableCell align="center">Rf (KN)</TableCell>
                             <TableCell align="center">Rf(1 + K1)(KN)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                    
                        <RenderIf condition={data.length < 1}>
                            <Box sx={{ p:5, textAlign: 'center' }}>
                                <Typography variant="h6" component="h6">Belum ada data</Typography>
                            </Box>
                        </RenderIf>
                        {dataFormFactor.map((row) => (
                            <TableRow
                                key={row.knot}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align='center'>
                                    {row.knot}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.ms}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.rn}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.cf}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.rf}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.k1}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ p: 2, textAlign: 'right'}}>
                <Button variant="contained" onClick={formFactor}>Kalkulasi</Button>
            </Box>
            </div>
        </DashboardCard>
    </PageContainer>
  );
};

export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};