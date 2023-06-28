import { createAsyncThunk } from "@reduxjs/toolkit";
import { PositionCoords, WeatherData } from "./types";

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async (coords: PositionCoords) => {
    const response = await fetch(
      `https://api.weather.yandex.ru/v2/forecast?lat=${coords.lat}&lon=${coords.lon}&lang=ru_RU&hours=false&extra=false`,
      {
        headers: {
          "X-Yandex-API-Key": "",
        },
      }
    );

    return (await response.json()) as WeatherData;
  }
);
