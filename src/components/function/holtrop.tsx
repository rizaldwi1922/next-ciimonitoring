
    export const calculateData = (
        knot: number, 
        aops: number, 
        heading: number, 
        actualKnot: number, 
        H: number, 
        fita: number, 
        loa: number, 
        lpp: number, 
        b: number,
        h: number,
        t: number,
        gt: number,
        dwt: number,
        v: number,
        lwl: number,
        bwl: number,
        cp: number,
        time: number
    ) => {
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
        //const tops = 5.75;
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

        const sfocData: { load: number; sfoc: number }[] = [
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
            return jsonObj;
        }

        const power = (ms: number, Rtotal: number) => {
          
           const EHP = ms * Rtotal;
           const CB1 = 0.7;	
           const w1 = 0.091;
           const CB2 = 0.75
           const w2 = 0.143;
           const w =  (((CB - CB1) * (w2 - w1)) / (CB2 - CB1)) + w1;
           const Tpower = 0.7 * w + 0.06;
           const nH = (1 - Tpower) / (1 -w);
           const THP = EHP / nH;
           const nR = 0.95;
           const nO = 0.55;
           const nB = nO * nR;
           const DHP = THP / nB;
           const nS = 0.98;
           const SHP = DHP / nS;
           const nG = 0.98;
           const BHP = SHP / nG;
           console.log("NB", nB);
    
           const obj = {EHP: EHP, THP: THP, DHP: DHP, SHP: SHP, BHP: BHP};
           
           return JSON.stringify(obj);
        }
    
        const getSfoc = (load: number) => {
            let result: number = 0;
            if(load < sfocData[0].load){
                result = sfocData[0].sfoc;
            } else {
                const searchResult = sfocData.find(item => item.load === load);
                if(searchResult){
                    result = searchResult?.sfoc;
                }
            }
    
            return result;
        }
    
        const foc = (ms: number, time: number , powerObj: string) => {
            const parsePower = JSON.parse(powerObj);
            const usedEngine = 2;
            const powerEngine = 2500;
            const engineLoad = Math.round(((parsePower.BHP / (usedEngine * powerEngine)) * 100));
            const sfoc = engineLoad > 0 ? getSfoc(engineLoad) : 0;
            const hour = time / 60;
            const gram = sfoc * (parsePower.BHP * hour);
            const ton = gram / 1000000;
            const densityDO = (1000/859.1)*1000;
            const liter = ton * densityDO;
            return {gr: gram, ton: ton, liter: liter, load: engineLoad, sfoc: sfoc, hour: hour}
        }

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
        const seaMargin = rt + (0.15 * rt);
        const draft = efekDraft(aops);
        const ywr = heading > 90 ? sudutAngin - heading: (360 - sudutAngin) + heading;
        const angin = efekAngin(actualKnot, ywr);
        const vs = 0.90331;
        const PsuhuGaram = 1022.7626/1000;
        const efekSuhuGaram = efekSuhuDanGaram(ms, hitunganTahanan.cf, vs, PsuhuGaram, rt * 1000, k1 * 1000);
        const waveResistance = efekGelombang(H, ms, PsuhuGaram, fita);
        const waveMethod = stawaveMethod(draft.N, angin.raa, rt, efekSuhuGaram, waveResistance);
        const powerShip = power(ms, waveMethod.RTotal);
        const dataFoc = foc(ms, time, powerShip);

        return {rt: rt, Rtotal: waveMethod.RTotal, foc: dataFoc.liter}
    }