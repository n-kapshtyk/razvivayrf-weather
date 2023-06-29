import React, { useCallback, useEffect, useState } from "react";
import { Layout, Menu, Modal, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;
import { useAppDispatch, useAppSelector } from "./app/hooks";
import {
  setActivePosition,
  setGeopositionAccess,
} from "./features/weather/slice";
import { selectHasGeopositionAccess } from "./features/weather/selectors";
import { fetchWeatherByCoords } from "./features/weather/api";

function App() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);
  const dispatch = useAppDispatch();

  const receiveGeopositionHandler = useCallback(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
      dispatch(setGeopositionAccess(true));
      dispatch(setActivePosition(coords));
      dispatch(fetchWeatherByCoords(coords));
    });
  }, [dispatch]);

  useEffect(() => {
    receiveGeopositionHandler();
  }, [receiveGeopositionHandler]);

  return (
    <Layout hasSider>
      <Modal
        title="Нет доступа к Вашей позиции"
        open={!hasAccess}
        onOk={receiveGeopositionHandler}
        okText="Разрешить"
      >
        <p>
          Пожалуйста, разрешите получить Вашу текущую геопозицию. Без этого
          приложение не будет корректно функционировать
        </p>
      </Modal>
      <Sider className="overflow-auto h-screen fixed left-0 top-0 bottom-0">
        <div className="demo-logo-vertical">123</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={[
            {
              key: 1,
              label: "Текущая позиция",
              onClick: () => alert("1"),
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout ml-[200px] h-screen">
        <Content className="mt-[24px] mx-[16px]">
          <div className="p-6 text-center">Content</div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
