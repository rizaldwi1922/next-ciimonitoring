import { ReactElement, useState, useEffect } from 'react';
import { 
    TextField,
    Box,
    Button
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';
import Breadcrumbs from '../../../src/components/header/breadcrumbs';
import { useRouter } from 'next/router';
import axios from 'axios';

const Ship = () => {
    const route = useRouter();
    const baseURl = process.env.NEXT_PUBLIC_URL;
    const [owner, setOwner] = useState('');
    const [tipe, setTipe] = useState('');
    const [loa, setLoa] = useState(0);
    const [lpp, setLpp] = useState(0);
    const [b, setB] = useState(0);
    const [h, setH] = useState(0);
    const [t, setT] = useState(0);
    const [gt, setGt] = useState(0);
    const [dwt, setDwt] = useState(0);
    const [v, setV] = useState(0);

    const breadcrumb = [
        {
            title: "Ship",
            url: "/dashboard/master-ship"
        },
        {
            title: "Form"
        }
    ];

    const onSave = () => {
        if(localStorage.getItem('token')){
          const token = localStorage.getItem('token');
          axios.post(`${baseURl}/api/ship/storeOrUpdate`, {
             owner: owner,
             tipe: tipe,
             loa: loa,
             lpp: lpp,
             b: b,
             h: h,
             t: t,
             gt: gt,
             dwt: dwt,
             v: v
          }, 
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
            })
            .then(response => {
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        }    
    }

  return (
    <PageContainer title="Form Master Ship">
        <Breadcrumbs breadcrumb={breadcrumb} />
        <DashboardCard title="Form Master Ship">
            <div>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
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
                </Box>
                <Box sx={{ p: 2}}>
                    <Button variant="contained" onClick={() => onSave()}>Save</Button>
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