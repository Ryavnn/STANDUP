import { fetchWeatherApi } from "openmeteo";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const getCurrentWeather = async (latitude, longitude) => {
  const params = {
    latitude,
    longitude,
    current: ["temperature_2m", "weather_code"],
    timezone: "auto",
  };

  const responses = await fetchWeatherApi(BASE_URL, params);
  const response = responses[0];

  const current = response.current();

  return {
    temperature: current.variables(0).value(),
    weatherCode: current.variables(1).value(),
  };
};

export const getWeatherCondition = (code) => {
  if (code === 0) return "Clear";
  if (code <= 3) return "Cloudy";
  if (code <= 48) return "Fog";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Showers";
  if (code <= 86) return "Snow";
  return "Unknown";
};
