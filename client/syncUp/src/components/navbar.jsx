import { LiaCloudSolid } from "react-icons/lia";
import { WiDaySunny, WiCloudy, WiRain, WiFog, WiSnow, WiThunderstorm, WiDayCloudy } from "react-icons/wi";
import { useEffect, useState } from "react";
import { getCurrentWeather, getWeatherCondition } from "../utils/weather";
import { NavLink } from "react-router";

const weatherIconMap = {
  "Clear": WiDaySunny,
  "Partly Cloudy": WiDayCloudy,
  "Cloudy": WiCloudy,
  "Foggy": WiFog,
  "Drizzle": WiRain,
  "Rain": WiRain,
  "Snow": WiSnow,
  "Thunderstorm": WiThunderstorm,
};

const Navbar = () => {
  const [data, setData] = useState(null);
  const [weatherError, setWeatherError] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const weather = await getCurrentWeather(-1.286389, 36.817223);
        setData({
          temp: Math.round(weather.temperature),
          condition: getWeatherCondition(weather.weatherCode),
        });
      } catch (err) {
        console.error("Weather fetch failed:", err);
        setWeatherError(true);
      }
    };

    load();
  }, []);

  const WeatherIcon = data ? (weatherIconMap[data.condition] || WiCloudy) : WiCloudy;

  return (
    <div className="navbar bg-white border-b border-gray-300 w-full h-15 p-5 flex justify-between items-center sticky top-0 z-10">
      <div className="logo text-primary font-bold text-[30px] font-heading tracking-wider">
        StandUPs
      </div>
      <div className="nav-links flex">
        <ul className="flex gap-5 text-secondary text-[20px]">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary pb-1"
                : "hover:border-b-2 hover:border-gray-400 pb-1"
            }
          >
            Live Feed
          </NavLink>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive
                ? "border-b-2 border-primary pb-1"
                : "hover:border-b-2 hover:border-gray-400 pb-1"
            }
          >
            Dashboard
          </NavLink>
        </ul>
      </div>

      <div className="weather group flex items-center gap-3 px-4 py-2 rounded-xl border border-gray-200 shadow-sm cursor-default transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100">
          <WeatherIcon className="text-secondary text-[24px]" />
        </div>
        <div className="flex flex-col leading-tight">
          {weatherError ? (
            <span className="text-gray-400 text-[11px] font-medium">Unavailable</span>
          ) : data ? (
            <>
              <span className="text-secondary font-heading text-[22px] tracking-wide leading-none">
                {data.temp}°C
              </span>
              <span className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">
                {data.condition}
              </span>
            </>
          ) : (
            <span className="text-gray-400 text-[11px] font-medium">Loading…</span>
          )}
        </div>

        <span className="text-secondary text-[10px] font-semibold uppercase tracking-wider ml-1">
          Nairobi
        </span>
      </div>
    </div>
  );
};

export default Navbar;
