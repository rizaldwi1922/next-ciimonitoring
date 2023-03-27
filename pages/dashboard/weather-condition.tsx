import { ReactElement, useState, useEffect } from 'react';
import PageContainer from '../../src/components/container/PageContainer';
import DashboardCard from '../../src/components/shared/DashboardCard';
import FullLayout from '../../src/layouts/full/FullLayout';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'


const WeatherCondition = () => {

    const [data, setData] = useState(null);
    const position = [-7.310188814312793, 112.77348308343285];
    const zoom = 13;
    const accessToken = "ca5af98dd9cd6da7f1d8134aff3d51e0";

    useEffect(() => {
        async function fetchData() {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position[0]}&lon=${position[1]}&appid=${accessToken}`
          );
          const data = await response.json();
          setData(data);
        }
        fetchData();
      }, []);

  return (
    <PageContainer title="Weather Condition">
        <DashboardCard title="Weather Condition">
            <MapContainer center={position} zoom={zoom} style={{ height: "400px" }}>
                {data && (
                    <TileLayer
                    attribution='&copy; <a href="https://openweathermap.org/">OpenWeatherMap</a> contributors'
                    url={`https://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=${accessToken}`}
                    />
                )}
                <Marker position={position}>
                    {data && (
                    <Popup>
                        {/* <p>{data.name}</p>
                        <p>{data.weather[0].main}</p>
                        <p>{data.weather[0].description}</p> */}
                    </Popup>
                    )}
                </Marker>
            </MapContainer>
        </DashboardCard>
    </PageContainer>
             
  );
};

export default WeatherCondition;
WeatherCondition.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};