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
  const [rt, setRt] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  const AIS = "http://172.105.112.202:3333";

  useEffect(() => {
    console.log("win", window);
  
    aisDecoder.on('error', err => console.error("Error", err));
    aisDecoder.on('data', decodedMessage => {
      const Ships = JSON.parse(decodedMessage);
      if (Ships.mmsi == 525125017) {
        if(Ships.lon){
          console.log("Data Kapal", Ships);
          
          setSpeed(Ships.speedOverGround);
          setRt(calculateData(Ships.speedOverGround));
          setCoordinates({ lon: Ships.lon, lat: Ships.lat });
          
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
              Speed: {speed}
            </Popup>
          </Marker>
          <Polyline positions={lines.map(coord => [coord.lat, coord.lon])} color="red" />
        </MapContainer>
  ), [coordinates]);

  return (
    <PageContainer title="Ship Tracker Position">
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
          </List>
          <Divider />
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              Weather Condition
            </Typography>
          </Toolbar>
        </Drawer>
      </Box>
    </PageContainer>
  )
 
};

export default ShipTrackerPosition;
ShipTrackerPosition.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};