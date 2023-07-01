import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import logo from "../../assets/weather.svg";
import { useAppSelector } from "../../app/hooks";
import {
  selectHasGeopositionAccess,
  selectSavedPositions,
} from "../../features/weather/selectors";
import { AddPositionModal } from "../Modals/AddPositionModal";
import { useSidebar } from "../../hooks/useSidebar";

export function Sidebar() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);
  const savedPositions = useAppSelector(selectSavedPositions);

  const {
    activeId,
    isOpenAddModal,
    setCurrentPositionAsActive,
    setIsOpenAddModal,
  } = useSidebar();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      className="flex flex-col items-center space-y-2 overflow-auto h-screen fixed left-0 top-0 bottom-0"
    >
      <div className="flex justify-center py-4">
        <img className="h-14" src={logo} alt="Logo" />
      </div>
      {hasAccess && (
        <>
          <div className="text-center">
            <Button
              ghost
              onClick={() => {
                setIsOpenAddModal(true);
              }}
            >
              Новое местоположение
            </Button>
          </div>

          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["current"]}
            selectedKeys={[String(activeId)]}
            className="py-4"
            items={[
              {
                key: "current",
                label: "Текущая позиция",
                onClick: setCurrentPositionAsActive,
              },
              {
                key: "saved",
                label: "Сохраненные",
                children: savedPositions.map((position) => ({
                  key: String(position.id),
                  label: position.name,
                })),
              },
            ]}
          />
        </>
      )}
      {isOpenAddModal && (
        <AddPositionModal setIsOpenAddModal={setIsOpenAddModal} />
      )}
    </Sider>
  );
}
