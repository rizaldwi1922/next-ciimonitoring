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
import { TextField } from '@mui/material';
import L from 'leaflet';
import axios from 'axios';

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

  const AIS = "http://172.105.112.202:3333";

  useEffect(() => {
    console.log("win", window);
  
    aisDecoder.on('error', err => console.error("Error", err));
    aisDecoder.on('data', decodedMessage => {
      const Ships = JSON.parse(decodedMessage);
      if (Ships.mmsi == 525021189) {
        if(Ships.lon){
          console.log("Data Kapal", Ships);
          const result = calculateData(
            Ships.speedOverGround, 
            aops, 
            Ships.heading, 
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
            minute
          );
          setSpeed(Ships.speedOverGround);
          setRt(result.rt);
          setRtotal(result.Rtotal);
          setCoordinates({ lon: Ships.lon, lat: Ships.lat });
          setFoc(result.foc);
          
          const newCoordinate: Coordinates = {
            lon: Ships.lon,
            lat: Ships.lat
          };
          
          setLines(prevLines => [...prevLines, newCoordinate]);
        }
      }
    });

    const socket: Socket = io(AIS, {
      withCredentials: true
    });

    socket.on('ais_mesg', (data) => {
      var txtList = data.ais_mesg.split("\n");
      txtList.map((item: string) => {
        if (item) {
          var actualAIS = item.replace('\r', '');
         // console.log(actualAIS)
          aisDecoder.write(actualAIS);
        }
      })
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  if (typeof window === "undefined") return null;

  const MapContainer = useMemo(
    () => dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false }),
    []
  );

  const TileLayer = useMemo(
    () => dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false }),
    []
  );
  
  const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
    ssr: false,
  });
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  });
  const Polyline = dynamic(() => import("react-leaflet").then((mod) => mod.Polyline), {
    ssr: false,
  });

  // const customIcon = L.icon({
  //   iconUrl: "/dashboard/record.png",
  //   iconSize: [32, 32], // Atur ukuran ikon sesuai kebutuhan
  // });

  const mapMemo = useMemo(() => (
        <MapContainer center={[-7.1150785020007925, 112.6635587850215]} zoom={13} scrollWheelZoom={true} style={{ height: 700 }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>
              KM. Meratus Padang <br/>
              RT: {toFixNumber(rt, 2)} <br />
              Speed: {speed} <br />
              RTotal: {toFixNumber(Rtotal, 2)} <br />
              FOC: {foc}
            </Popup>
          </Marker>
          <Polyline positions={lines.map(coord => [coord.lat, coord.lon])} color="red" />
        </MapContainer>
  ), [coordinates]);

  return (
    <Box>
        <PageContainer title="Ship Tracker Position">
          <DashboardCard title="Form">
            <div>
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
          </div>
      </DashboardCard>
      <DashboardCard title="Ship Tracker Position">
        {mapMemo}
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
          <List>
            <ListItem>
              <Typography>
                Lat: {coordinates.lat}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Lon: {coordinates.lon}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Speed: {speed}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                RT: {toFixNumber(rt, 2)}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                RTotal: {toFixNumber(Rtotal, 2)}
              </Typography>
            </ListItem>
          </List>
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