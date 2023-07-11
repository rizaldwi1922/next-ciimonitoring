import { ReactElement, useState, useEffect } from 'react';
import { 
    TextField,
    Box
} from '@mui/material';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import moment from 'moment';

const ShipVoyage = () => {

    const [date, setDate] = useState(moment().format("YYYY-MM-DD"))

    const [mmsi, setMMSI] = useState("525125017")
    const [name, setName] = useState("MERATUS PADANG")
    const [company, setCompany] = useState("PT. Meratus")

  return (
    <PageContainer title="Ship Voyage">
        <DashboardCard title="Ship Voyage">
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
                        label="Voyage Number"
                        type={"number"}
                    />
                    <TextField
                        required
                        label="Nama Kapal"
                        type="text"
                        value={name}
                    />
                    <TextField
                        required
                        label="Jenis Kapal"
                        type="text"
                    />
                    <TextField
                        required
                        label="MMSI"
                        type="text"
                        value={mmsi}
                    />
                    <TextField
                        required
                        label="Owner"
                        type="text"
                        value={company}
                    />
                </div>
            </Box>
        </DashboardCard>
    </PageContainer>
  );
};

export default ShipVoyage;
ShipVoyage.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};