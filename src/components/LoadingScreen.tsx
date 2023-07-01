import { Spin } from "antd";
import React from "react";

export function LoadingScreen() {
  return (
    <div className="flex w-full h-full items-center justify-center">
      <Spin />
    </div>
  );
}
