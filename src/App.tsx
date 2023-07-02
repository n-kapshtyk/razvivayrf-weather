import React from "react";
import { Layout } from "antd";
import { Sidebar } from "./components/Sidebar/Sidebar";
import { WeatherDetail } from "./components/WeatherDetail/WeatherDetail";
import { NoPositionAccessModal } from "./components/Modals/NoPositionAccessModal";
import { LoadingScreen } from "./components/LoadingScreen";
import { usePositionInitialize } from "./hooks/usePositionInitialize";

const { Content } = Layout;

function App() {
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
      <Sidebar />
      <Layout>
        <Content className="p-6">
          <WeatherDetail />
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
