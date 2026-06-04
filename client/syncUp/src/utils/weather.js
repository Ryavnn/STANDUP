export const getCurrentWeather = async (latitude, longitude) => {
  const url = `https://wttr.in/${latitude},${longitude}?format=j1`;
  const res = await fetch(url);
  const data = await res.json();

  const temp = data.current_condition[0].temp_C;
  const code = parseInt(data.current_condition[0].weatherCode);

  return {
    temperature: parseInt(temp),
    weatherCode: code,
  };
};


export const getWeatherCondition = (code) => {
  if (code === 113) return "Clear";
  if (code <= 119) return "Cloudy";
  if (code <= 143) return "Fog";
  if (code <= 266) return "Rain";
  if (code <= 338) return "Snow";
  if (code <= 377) return "Showers";
  return "Unknown";
};