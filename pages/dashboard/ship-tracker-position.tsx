import { ReactElement, useEffect, useState, useMemo } from 'react';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import dynamic from 'next/dynamic';
import { io, Socket } from 'socket.io-client';
import AisDecoder from 'ais-stream-decoder';
import { calculateData } from '../../src/components/function/holtrop';
import toFixNumber from '../../src/components/function/toFixNumber';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from '@mui/material';
import axios from 'axios';
import RenderIf from '../../src/components/container/RenderIf';
import { calculateCII } from '../../src/components/function/calculateCII';

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});
const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), {
  ssr: false,
});

const Circle = dynamic(() => import("react-leaflet").then((mod) => mod.Circle), {
  ssr: false,
});

interface Coordinates {
  lon: number;
  lat: number;
}

const ShipTrackerPosition = () => {
  const aisDecoder = new AisDecoder();

  const [coordinates, setCoordinates] = useState<Coordinates>({
    lon: 0,
    lat: 0,
  });

  const [lines, setLines] = useState<Coordinates[]>([]);

  const [speed, setSpeed] = useState(0);
  const [Rtotal, setRtotal] = useState(0);
  const [rt, setRt] = useState(0);
  const [foc, setFoc] = useState(0);

  const [aops, setAops] = useState(9804.4);
  const [heading, setHeading] = useState(0);
  const [actualKnot, setActualKnot] = useState(6);
  const [H, setHh] = useState(1);
  const [fita, setFita] = useState(3.59);
  const [temp, setTemp] = useState(27);
  const [minute, setMinute] = useState(20);

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
  const [tops, setTops] = useState( 5.75);
  const [power, setPower] = useState(250);

  const [dataAis, setDataAis] = useState<any[]>([]);
  const [dataAis2, setDataAis2] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);

  const AIS = "http://172.105.112.202:3333";



  useEffect(() => {
     axios.get('http://api.focnciimonitoring.com/api/getAis?mmsi=525125017')
      .then(function (response) {
        let paramCII = {
          lastSKom: 0, 
          lastFocMEKom: 0, 
          lastFocGEKom: 0,
          lastLat: 0,
          lastLon: 0
        };
        const dataResult: any[] = [];
        const dataResult2: any[] = [];
        response.data.map((item: any, index: number) => {
          const result = calculateData(
            item.speedOverGround, 
            aops, 
            item.courseOverGround, 
            actualKnot, 
            H, 
            fita,
            loa, 
            lpp, 
            b,
            h,
            t,
            gt,
            dwt,
            v,
            lwl,
            bwl,
            cp,
            minute,
            power
          );
          const CII = calculateCII(dwt, paramCII, item.lat, item.lon, result.focMe.ton, result.focGE.ton);
          paramCII['lastSKom'] = CII.lastSKom;
          paramCII['lastFocMEKom'] = CII.lastFocMEKom;
          paramCII['lastFocGEKom'] = CII.lastFocGEKom;
          paramCII['lastLat'] = item.lat;
          paramCII['lastLon'] = item.lon;

          // if(index > 897){  
          //   dataResult2.push(
          //     {
          //       lat: item.lat,
          //       lon: item.lon,
          //       rt: result.rt,
          //       foc: result.focMe.liter,
          //       cii: CII.rating,
          //       s: CII.s,
          //       speed: item.speedOverGround
          //     }
          //   )
          // } else {
          //   dataResult.push(
          //     {
          //       lat: item.lat,
          //       lon: item.lon,
          //       rt: result.rt,
          //       foc: result.focMe.liter,
          //       cii: CII.rating,
          //       s: CII.s,
          //       speed: item.speedOverGround
          //     }
          //   )
          // }
          dataResult.push(
            {
              lat: item.lat,
              lon: item.lon,
              rt: result.rt,
              foc: result.focMe.liter,
              cii: CII.rating,
              s: CII.s,
              speed: item.speedOverGround
            }
          )
        })
        setDataAis(dataResult);
        // setDataAis2(dataResult2);
        setIsLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])
  // let count = 0;
  // useEffect(() => {
  //   if(dataAis2){
  //     const interval = setInterval(() => {
  //       const newData = dataAis2[count];
  //       if(newData){
  //          setDataAis(prevData => [...prevData, dataAis2[count]]);
  //          console.log()
  //         console.log(count)
  //       }
  //       count++;
       
  //     }, 20000);
  
  //     return () => {
  //       clearInterval(interval);
  //     };
  //   }
    
  // }, [dataAis2]); 


  // useEffect(() => {
  //   aisDecoder.on('error', err => console.error("Error", err));
  //   aisDecoder.on('data', decodedMessage => {
  //     const Ships = JSON.parse(decodedMessage);
  //     if (Ships.mmsi == 525021189) {
  //       if(Ships.lon){
  //         console.log("Data Kapal", Ships);
          // const result = calculateData(
          //   Ships.speedOverGround, 
          //   aops, 
          //   Ships.heading, 
          //   actualKnot, 
          //   H, 
          //   fita,
          //   loa, 
          //   lpp, 
          //   b,
          //   h,
          //   t,
          //   gt,
          //   dwt,
          //   v,
          //   lwl,
          //   bwl,
          //   cp,
          //   minute
          // );
  //         setSpeed(Ships.speedOverGround);
  //         setRt(result.rt);
  //         setRtotal(result.Rtotal);
  //         setCoordinates({ lon: Ships.lon, lat: Ships.lat });
  //         setFoc(result.foc);
          
  //         const newCoordinate: Coordinates = {
  //           lon: Ships.lon,
  //           lat: Ships.lat
  //         };
          
  //         setLines(prevLines => [...prevLines, newCoordinate]);
  //       }
  //     }
  //   });

  //   const socket: Socket = io(AIS, {
  //     withCredentials: true
  //   });

  //   socket.on('ais_mesg', (data) => {
  //     var txtList = data.ais_mesg.split("\n");
  //     txtList.map((item: string) => {
  //       if (item) {
  //         var actualAIS = item.replace('\r', '');
  //        // console.log(actualAIS)
  //         aisDecoder.write(actualAIS);
  //       }
  //     })
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  if (typeof window === "undefined") return null;

  const MapContainer = useMemo(
    () => dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false }),
    []
  );

  const TileLayer = useMemo(
    () => dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false }),
    []
  );


  const CircleMarker = (props: any) => {
    const circleOptions = {
      radius: 20, // radius dalam meter
      color: 'blue',
      fillColor: 'blue',
    };

    if(props.indexData == dataAis.length -1){
     
      return (
        <Marker key={props.indexData} position={[props.data.lat, props.data.lon]}>
            <Popup>
              KM. Meratus Padang <br />
              Speed: {props.data.speed} Knot <br />
              RT: {toFixNumber(props.data.rt, 2)} <br />
              FOC: {toFixNumber(props.data.foc, 2)} <br />
              CII Rating: {props.data.cii} <br />
            
              {/* index: {props.indexData} */}
            </Popup>
        </Marker>
      )
    } else {
      return (
        <Circle
            key={props.indexData}
            center={[props.data.lat, props.data.lon]}
            radius={circleOptions.radius}
            pathOptions={{
              color: circleOptions.color,
              fillColor: circleOptions.fillColor,
              fillOpacity: 1
            }}
        >
            <Popup>
              KM. Meratus Padang <br />
              Speed: {props.data.speed} Knot <br />
              RT: {toFixNumber(props.data.rt, 2)} <br />
              FOC: {toFixNumber(props.data.foc, 2)} <br />
              CII Rating: {props.data.cii} <br />
              {/* {props.data.lat} : {props.data.lon} <br />
              index: {props.indexData} */}
            </Popup>
        </Circle>
      )
    }
  }


  const mapMemo = useMemo(() => (
    <MapContainer center={[-7.1150785020007925, 112.6635587850215]} zoom={13} scrollWheelZoom={true} style={{ height: 700 }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={dataAis.map(coord => [coord.lat, coord.lon])} color="red" />
      {dataAis.map((item, index) => 
        <Box>
            <CircleMarker data={item} key={index} indexData={index} />
        </Box>
      )}
  </MapContainer>
  ), [dataAis]);

  return (
    <Box>
        <PageContainer title="Ship Tracker Position">
          <DashboardCard title="Form">
            <Box>
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
                    onChange={e => setTops(parseFloat(e.target.value))}
                />
            </Box>
          </Box>
      </DashboardCard>
      <DashboardCard title="Ship Tracker Position">
        <Box>
          <RenderIf condition={isLoading}>
            <Box sx={{ display: 'flex', height: 700, justifyContent: 'center', alignItems: 'center' }}>
              <CircularProgress />
            </Box>
          </RenderIf>
          <RenderIf condition={!isLoading}>
              {mapMemo}
          </RenderIf>
        </Box>
      </DashboardCard>
      <Box>
        <Drawer
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="right"
        >
          <Toolbar />
          <Divider />
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Weather Condition
            </Typography>
          </Toolbar>
          <List>
            <ListItem>
              <TextField
                  label="Temp"
                  type="number"
                  value={temp}
                  onChange={e => setTemp(parseFloat(e.target.value))}
              />
            </ListItem>
            {/* <ListItem>
              <TextField
                  label="Sudut Heading"
                  type="number"
                  value={heading}
                  onChange={e => setHeading(parseFloat(e.target.value))}
              />
            </ListItem> */}
            <ListItem>
              <TextField
                  label="Actual Knot"
                  type="number"
                  value={actualKnot}
                  onChange={e => setActualKnot(parseFloat(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                  label="H"
                  type="number"
                  value={H}
                  onChange={e => setHh(parseFloat(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                  label="ꙍ"
                  type="number"
                  value={fita}
                  onChange={e => setFita(parseFloat(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                  label="Δops"
                  type="number"
                  value={aops}
                  onChange={e => setAops(parseFloat(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                  label="Time"
                  type="number"
                  value={minute}
                  onChange={e => setMinute(parseFloat(e.target.value))}
              />
            </ListItem>
            <ListItem>
              <TextField
                  label="Power"
                  type="number"
                  value={power}
                  onChange={e => setPower(parseFloat(e.target.value))}
              />
            </ListItem>
          </List>
        </Drawer>
      </Box>
    </PageContainer>
    </Box>
  )
 
};

export default ShipTrackerPosition;
ShipTrackerPosition.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};