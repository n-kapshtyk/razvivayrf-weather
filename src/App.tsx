import React from "react";
import { Layout } from "antd";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { WeatherDetail } from "./components/WeatherDetail/WeatherDetail";
import { NoPositionAccessModal } from "./components/Modals/NoPositionAccessModal";
import { LoadingScreen } from "./components/LoadingScreen";
import { usePositionInitialize } from "./hooks/usePositionInitialize";
import { useAppSelector } from "./app/hooks";
import { selectHasGeopositionAccess } from "./features/weather/selectors";

const { Content } = Layout;

function App() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);
  const { isInitialized } = usePositionInitialize();

  if (!isInitialized) {
    return (
      <div className="w-screen h-screen">
        <LoadingScreen />
      </div>
    );
  }

  return (
    <Layout className="h-full !min-h-screen w-full">
      <NoPositionAccessModal />
      {hasAccess && (
        <>
          <Sidebar />
          <Layout>
            <Content className="p-6">
              <WeatherDetail />
            </Content>
          </Layout>
        </>
      )}
    </Layout>
  );
}

export default App;
