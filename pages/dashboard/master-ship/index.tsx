import { ReactElement, useState } from 'react';
import { 
    Box,
    Button
} from '@mui/material';
import PageContainer from '../../../src/components/container/PageContainer';
import DashboardCard from '../../../src/components/shared/DashboardCard';
import FullLayout from '../../../src/layouts/full/FullLayout';
import Breadcrumbs from '../../../src/components/header/breadcrumbs';
import { useRouter } from 'next/router';

import DataTable from 'react-data-table-component';

const Ship = () => {
    const route = useRouter()

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

const breadcrumb = [
    {
        title: "Ship",
    }
];
    

  return (
    <PageContainer title="Master Ship">
        <Breadcrumbs breadcrumb={breadcrumb} />
        <DashboardCard title="Master Ship">
            <div>
                <Box sx={{ p: 2, textAlign: 'right'}}>
                    <Button variant="contained" onClick={() => route.push('/dashboard/master-ship/form?test=halo')}>Add Ship</Button>
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