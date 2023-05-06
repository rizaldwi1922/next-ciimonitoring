import { ReactElement, useEffect, useState } from 'react';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import dynamic from 'next/dynamic';
import io from 'socket.io-client';

const ShipTrackerPosition = () => {
  const [isMounted, setIsMounted] = useState(false);
  const AIS = "http://172.105.112.202:3333";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const socket = io(AIS); // Ubah URL sesuai dengan URL server WebSocket Anda

    // Mengatur penanganan pesan yang diterima dari server WebSocket
    socket.on('message', (data) => {
      console.log('Menerima pesan:', data);
    });

    // Mengirim pesan ke server WebSocket
    //socket.emit('message', 'Halo server!');

    return () => {
      // Membersihkan koneksi WebSocket saat komponen dilepas
      socket.disconnect();
    };
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

  return (
    <PageContainer title="Ship Tracker Position">
        <DashboardCard title="Ship Tracker Position">
            <MapContainer center={[-7.310188814312793, 112.77348308343285]} zoom={13} scrollWheelZoom={true} style={{ height: 700 }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[-7.309671115757343, 112.77289479012505]}>
                    <Popup>
                        Rawon Mantap
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