import React, { useEffect, useState } from "react";
import { Layout } from "antd";
import { useAppDispatch } from "./app/hooks";
import {
  setActivePosition,
  setCurrentPosition,
  setGeopositionAccess,
} from "./features/weather/slice";
import { fetchWeatherByCoords } from "./features/weather/api";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { WeatherDetail } from "./components/WeatherDetail/WeatherDetail";
import { NoPositionAccessModal } from "./components/Modals/NopositionAccessModal";
import { LoadingScreen } from "./components/LoadingScreen";

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        dispatch(setGeopositionAccess(true));
        dispatch(setActivePosition(coords));
        dispatch(setCurrentPosition(coords));
        dispatch(fetchWeatherByCoords(coords));
        setIsInitialized(true);
      },
      () => {
        dispatch(setGeopositionAccess(false));
        dispatch(setActivePosition(null));
        dispatch(setCurrentPosition(null));
        setIsInitialized(true);
      }
    );
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <Layout hasSider>
      <NoPositionAccessModal />
      <Sidebar />
      <WeatherDetail />
    </Layout>
  );
}

export default App;
