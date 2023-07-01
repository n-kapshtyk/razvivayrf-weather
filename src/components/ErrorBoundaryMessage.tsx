import { Button } from "antd";
import React from "react";
import { locales } from "../locales";

export function ErrorBoundaryMessage() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center space-y-3">
      <span>{locales.globalError.text}</span>
      <Button onClick={() => window.location.reload()}>
        {locales.globalError.button}
      </Button>
    </div>
  );
}
