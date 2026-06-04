import { LiaCloudSolid } from "react-icons/lia";
import { useEffect, useState } from "react";
import { getCurrentWeather, getWeatherCondition } from "../utils/weather";
import { NavLink } from "react-router";

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
      <div className="weather flex items-center justify-between w-45 h-10 rounded-md shadow-md p-2">
        <LiaCloudSolid />
        <div className="weather-exp text-secondary text-[12px] flex flex-col">
          {weatherError ? (
            <span className="text-gray-400 text-[11px]">Unavailable</span>
          ) : data ? (
            <>
              <span className="temp">{data.temp}°C</span>
              <span className="condition">{data.condition}</span>
            </>
          ) : (
            <span className="text-gray-400 text-[11px]">Loading…</span>
          )}
        </div>
        <span className="location text-secondary text-[14px]">Nairobi</span>
      </div>
    </div>
  );
};

export default Navbar;
