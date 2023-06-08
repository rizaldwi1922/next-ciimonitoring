import {useContext, ReactElement, useState} from 'react';
import { MyContext } from '../../../contexts/MyContext';
import DashboardCard from '../../../../src/components/shared/DashboardCard';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TableHead,
    Box,
    Tab
} from '@mui/material';
import FullLayout from '../../../../src/layouts/full/FullLayout';
import toFixNumber from '../../../../src/components/function/toFixNumber';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const Ship = () => {
    const contex = useContext(MyContext);
    const data = contex?.dataResultCalculate;
    const data2 = contex?.dataResultCalculate2;
    const [value, setValue] = useState("1");

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    if (!data || !data2) {
        return <div>Loading...</div>;
    }
      
    return (
        <DashboardCard title="Tahanan Total">
            <div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="SUB-BAJ" value="1" />
                            <Tab label="BAJ-SUB" value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ContentStawave data={data} />
                    </TabPanel>
                    <TabPanel value="2">
                        <ContentStawave data={data2} />
                    </TabPanel>
                </TabContext>
            </div>
        </DashboardCard>
    )
}

const ContentStawave = (props: any) => {
    return (
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No</TableCell>
                            <TableCell align="center">Knot</TableCell>
                            <TableCell align="center">m/s</TableCell>
                            <TableCell align="center">Rf(1 + K1)(KN)</TableCell>
                            <TableCell align="center">Rapp (kN)</TableCell>
                            <TableCell align="center">Rw (kN)</TableCell>
                            <TableCell align="center">RB (kN)</TableCell>
                            <TableCell align="center">Rtr (kN)</TableCell>
                            <TableCell align="center">RA (kN)</TableCell>
                            <TableCell align="center">RΔf (kN)</TableCell>
                            <TableCell align="center">RT (kN)</TableCell>
                            <TableCell align="center">RT + sea margin (kN)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                   
                        {props.data.map((row: any, index: number) => (
                            <TableRow
                                key={row.knot}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align='center'>
                                    {index + 1}
                                </TableCell>
                                <TableCell align='center'>
                                    {row.knot}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.ms, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.k1, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rapp, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rw, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rb, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rtr, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.ra, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.RAf, 2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.rt,2)}
                                </TableCell>
                                <TableCell align='center'>
                                    {toFixNumber(row.seaMargin, 2)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export default Ship;

Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};