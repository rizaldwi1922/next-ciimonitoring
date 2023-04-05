import { ReactElement, useState } from 'react';
import { 
    Box,
    Button
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';

import DataTable from 'react-data-table-component';

const Ship = () => {

    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!open)
    }

    const columns = [
        {
            name: 'Title',
            selector: (row: { title: any; }) => row.title,
        },
        {
            name: 'Year',
            selector: (row: { year: any; }) => row.year,
        },
    ];
    
    const data = [
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
    ]
    

  return (
    <PageContainer title="Master Ship">
        <DashboardCard title="Master Ship">
            <div>
                <Box sx={{ p: 2, textAlign: 'right'}}>
                    <Button variant="contained" onClick={toggle}>Add Ship</Button>
                </Box>
                <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >
                    <DataTable
                        columns={columns}
                        data={data}
                    />
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