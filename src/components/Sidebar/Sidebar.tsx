import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import logo from "../../assets/weather.svg";
import { useAppSelector } from "../../app/hooks";
import {
  selectActivePosition,
  selectHasGeopositionAccess,
  selectSavedPositions,
} from "../../features/weather/selectors";
import { AddPositionModal } from "../Modals/AddPositionModal";

export function Sidebar() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);
  const activePosition = useAppSelector(selectActivePosition);
  const savedPositions = useAppSelector(selectSavedPositions);
  const activeId =
    !!activePosition && "id" in activePosition ? activePosition.id : "current";

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
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
            selectedKeys={[activeId]}
            className="py-4"
            items={[
              {
                key: "current",
                label: "Текущая позиция",
                onClick: () => alert("1"),
              },
              {
                key: "saved",
                label: "Сохраненные",
                children: savedPositions.map((position) => ({
                  key: position.id,
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
