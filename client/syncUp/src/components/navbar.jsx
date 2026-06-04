import { LiaCloudSolid } from "react-icons/lia";
import {useEffect, useState} from "react"
import { getCurrentWeather, getWeatherCondition } from "../utils/weather";
import { NavLink } from "react-router";
const Navbar = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const load = async () => {
      const weather = await getCurrentWeather(-1.286389, 36.817223); // Nairobi

      setData({
        temp: Math.round(weather.temperature),
        condition: getWeatherCondition(weather.weatherCode),
      });
    };

    load();
  }, []);
  return (
    <div className="navbar border-b border-gray-300 w-full h-15 p-5 flex justify-between items-center">
      <div className="logo text-primary font-bold font-bold text-[30px] font-heading tracking-wider">
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
          <span className="temp">{data?.temp}°C</span>
          <span className="condition">{data?.condition}</span>
        </div>
        <span className="location text-secondary text-[14px]">Nairobi</span>
      </div>
    </div>
  );
};

export default Navbar;
