import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";
import logo from "../../assets/weather.svg";
import { useAppSelector } from "../../app/hooks";
import { selectHasGeopositionAccess } from "../../features/weather/selectors";
import { AddPositionModal } from "../Modals/AddPositionModal";
import { useSidebar } from "../../hooks/useSidebar";
import { MenuItemType } from "antd/es/menu/hooks/useItems";

export function Sidebar() {
  const hasAccess = useAppSelector(selectHasGeopositionAccess);

  const { activeId, isOpenAddModal, menuItems, setIsOpenAddModal } =
    useSidebar();

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      /* className="flex flex-col items-center space-y-4 overflow-x-hidden overflow-y-auto h-full fixed left-0 top-0 bottom-0" */
    >
      <div className="flex justify-center py-4">
        <img className="h-14" src={logo} alt="Logo" />
      </div>
      {hasAccess && (
        <>
          <div className="text-center py-3">
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
            items={menuItems as MenuItemType[]}
          />
        </>
      )}
      {isOpenAddModal && (
        <AddPositionModal setIsOpenAddModal={setIsOpenAddModal} />
      )}
    </Sider>
  );
}
