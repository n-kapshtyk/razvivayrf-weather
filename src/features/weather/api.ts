import { createAsyncThunk } from "@reduxjs/toolkit";
import { PositionCoords, WeatherData } from "./types";

export const fetchWeatherByCoords = createAsyncThunk(
  "weather/fetchWeatherByCoords",
  async (coords: PositionCoords) => {
    const response = await fetch(`https://reqres.in/api/users/${userId}`);
    return (await response.json()) as WeatherData;
  }
);
