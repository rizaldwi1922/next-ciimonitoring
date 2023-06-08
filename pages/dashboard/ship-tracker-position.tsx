import { ReactElement, useEffect, useState } from 'react';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import dynamic from 'next/dynamic';
import { io, Socket } from 'socket.io-client';
import AisDecoder from 'ais-stream-decoder';
import Ship from './master-ship';
import L from 'leaflet';

interface Coordinates {
  lon: number;
  lat: number;
}

const ShipTrackerPosition = () => {
  const [isMounted, setIsMounted] = useState(false);
  const aisDecoder = new AisDecoder();

  const [coordinates, setCoordinates] = useState<Coordinates>({
    lon: 0,
    lat: 0,
  });

  const AIS = "http://172.105.112.202:3333";

  useEffect(() => {
   // aisDecoder.on('error', err => console.error("Malah Error", err));
    aisDecoder.on('data', decodedMessage => {
      const Ships = JSON.parse(decodedMessage);
     // console.log("KM. DHARMA FERRY V", Ships);
      if(Ships.mmsi == 525125017){
        console.log("Meratus Padang", Ships);
        //setCoordinates({ lon: Ships.lon, lat: Ships.lat });
      }
    });
   
    const socket:Socket = io(AIS, {
      withCredentials: true
    });

    socket.on('ais_mesg', (data) => {
      var txtList = data.ais_mesg.split("\n");
      txtList.map((item: string) => {
        if(item){
          var actualAIS = item.replace('\r','');
          //console.log("AIS ->", item);
          aisDecoder.write(actualAIS);
        }
      })
   });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || typeof window === "undefined") return null;

  const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
    ssr: false,
  });
  const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
    ssr: false,
  });
  const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
    ssr: false,
  });
  const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
    ssr: false,
  });

  // const icon = new L.Icon({
  //   iconUrl: './../../public/images/marker-icon.png',
  //   iconSize: [32, 32],
  //   iconAnchor: [16, 32],
  // });

  return (
    <PageContainer title="Ship Tracker Position">
        <DashboardCard title="Ship Tracker Position">
            <MapContainer center={[-7.196713333333333, 112.73029166666667]} zoom={13} scrollWheelZoom={true} style={{ height: 700 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[coordinates.lat, coordinates.lon]}>
                    <Popup>
                      KM. DHARMA FERRY V
                    </Popup>
                </Marker>
            </MapContainer>
        </DashboardCard>
    </PageContainer>
             
  );
};

export default ShipTrackerPosition;
ShipTrackerPosition.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};