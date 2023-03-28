import { ReactElement, useEffect, useState } from 'react';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import dynamic from 'next/dynamic';


const ShipTrackerPosition = () => {
  const [isMounted, setIsMounted] = useState(false);

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