import { createAsyncThunk } from "@reduxjs/toolkit";
import { PositionCoords, WeatherData } from "./types";

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async (coords: PositionCoords) => {
    const response = await fetch(
      `/weather?lat=${coords.lat}&lon=${coords.lon}&lang=ru_RU&hours=false&extra=false`,
      {
        headers: {
          "X-Yandex-API-Key": import.meta.env.VITE_YANDEX_API_KEY,
        },
      }
    );

    return (await response.json()) as WeatherData;
  }
);
