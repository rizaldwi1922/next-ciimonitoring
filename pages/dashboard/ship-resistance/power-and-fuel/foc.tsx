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
        <DashboardCard title="Foc">
             <div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Surabaya - Banjarmasin ME" value="1" />
                            <Tab label="Banjarmasin - Surabaya ME" value="2" />
                            <Tab label="Surabaya - Banjarmasin GE" value="3" />
                            <Tab label="Banjarmasin - Surabaya GE" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <ContentStawave data={data} type="ME"/>
                    </TabPanel>
                    <TabPanel value="2">
                        <ContentStawave data={data2} type="ME" halo="true"/>
                    </TabPanel>
                    <TabPanel value="3">
                        <ContentStawave data={data} type="GE"/>
                    </TabPanel>
                    <TabPanel value="4">
                        <ContentStawave data={data2} type="GE"/>
                    </TabPanel>
                </TabContext>
                
            </div>
        </DashboardCard>
    )
}

const ContentStawave = (props: any) => {
    
    const ParseJson = (jsonText: string) => {
        return JSON.parse(jsonText);
    }

    return(
        <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">No.</TableCell>
                            <TableCell align="center">Vs (Knot)</TableCell>
                            <TableCell align="center">Engine Load</TableCell>
                            <TableCell align="center">SFOC</TableCell>
                            <TableCell align="center">Minute</TableCell>
                            <TableCell align="center">Hour</TableCell>
                            <TableCell align="center">gr</TableCell>
                            <TableCell align="center">ton</TableCell>
                            <TableCell align="center">liter</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>                    
                        {props.data.map((row: any, index: any) => (
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
                                    {ParseJson(props.type == "ME" ? row.focME : row.focGE).load? toFixNumber(ParseJson(props.type == "ME" ? row.focME :  row.focGE).load, 0) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(props.type == "ME" ? row.focME :  row.focGE).sfoc? toFixNumber(ParseJson(props.type == "ME" ? row.focME :  row.focGE).sfoc, 1) : 0}
                                </TableCell>                    
                                <TableCell align='center'>
                                    {row.time}
                                </TableCell>            
                                <TableCell align='center'>
                                    {ParseJson(props.type == "ME" ? row.focME :  row.focGE).hour? toFixNumber(ParseJson(props.type == "ME" ? row.focME :  row.focGE).hour, 2) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(props.type == "ME" ? row.focME : row.focGE).gr? toFixNumber(ParseJson(props.type == "ME" ? row.focME : row.focGE).gr, 0) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(props.type == "ME" ? row.focME : row.focGE).ton? toFixNumber(ParseJson(props.type == "ME" ? row.focME : row.focGE).ton, 3) : 0}
                                </TableCell>
                                <TableCell align='center'>
                                    {ParseJson(props.type == "ME" ? row.focME : row.focGE).liter? toFixNumber(ParseJson(props.type == "ME" ? row.focME : row.focGE).liter, 3) : 0}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    );
}
export default Ship;
Ship.getLayout = function getLayout(page: ReactElement) {
    return <FullLayout type='ShipResistance'>{page}</FullLayout>;
};