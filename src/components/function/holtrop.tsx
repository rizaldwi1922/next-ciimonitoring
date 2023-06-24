    const loa = 117;
    const lpp = 110;
    const b = 19.7;
    const h = 8.5;
    const t = 6.4;
    const gt = 5745;
    const dwt = 7664.6;
    const v = 13.8;
    const lwl = 112.39;
    const bwl = 19.7;
    const cp = 0.784;
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

    export const calculateData = (knot: number) => {
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
        //const seaMargin = rt + (0.15 * rt);

        return rt;
    }