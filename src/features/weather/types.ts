interface WeatherDataPart {
  temp_min: number;
  temp_max: number;
  temp_avg: number;
  feels_like: number;
  icon: string;
  condition: string;
  daytime: string;
  polar: boolean;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  prec_mm: number;
  prec_period: number;
  prec_type: number;
  prec_strength: number;
  cloudness: number;
}

interface WeatherDataHour {
  hour: string;
  hour_ts: number;
  temp: number;
  feels_like: number;
  icon: string;
  condition: string;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  prec_mm: number;
  prec_period: number;
  prec_type: number;
  prec_strength: number;
  is_thunder: boolean;
  cloudness: number;
}

interface WeatherDataForecast {
  date: string;
  date_ts: number;
  week: number;
  sunrise: string;
  sunset: string;
  moon_code: number;
  moon_text: string;
  parts: Record<string, WeatherDataPart>;
  hours: WeatherDataHour[];
}

interface WeatherDataFact {
  temp: number;
  feels_like: number;
  icon: string;
  condition: string;
  wind_speed: number;
  wind_gust: number;
  wind_dir: string;
  pressure_mm: number;
  pressure_pa: number;
  humidity: number;
  daytime: string;
  polar: boolean;
  season: string;
  prec_type: number;
  prec_strength: number;
  is_thunder: boolean;
  cloudness: number;
  obs_time: number;
  phenom_icon: string;
  "phenom-condition": string;
}

interface WeatherDataInfo {
  lat: number;
  lon: number;
  tzinfo: {
    offset: number;
    name: string;
    abbr: string;
    dst: boolean;
  };
  def_pressure_mm: number;
  def_pressure_pa: number;
  url: string;
}

export interface WeatherData {
  now: number;
  now_dt: string;
  info: WeatherDataInfo;
  fact: WeatherDataFact;
  forecasts: WeatherDataForecast[];
}

export enum LoadingState {
  idle = "idle",
  loading = "loading",
  error = "error",
  success = "success",
}

export interface PositionCoords {
  lat: number;
  lon: number;
}

export interface SavedWeatherPosition {
  id: string;
  name: string;
  coords: PositionCoords;
}

export interface WeatherSliceState {
  hasGeopositionAccess: boolean;
  activePosition: SavedWeatherPosition | PositionCoords | null;
  weatherData: WeatherData | null;
  savedPositions: SavedWeatherPosition[];
  loadingState: LoadingState;
}
