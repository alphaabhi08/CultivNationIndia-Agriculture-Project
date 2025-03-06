import { useState } from "react";
import Header from "../../../../components/Header/Header";
import Navbar from "../../../../components/Navbar/Navbar";

export default function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "b03aaa69da9fe4e6879db2b4b1f2f20c";

  const checkWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${apiKey}`
      );

      if (response.status === 404) {
        setError("❌ City not found!");
        setWeather(null);
      } else {
        const data = await response.json();
        setWeather(data);
        setError("");
      }
    } catch (err) {
      setError("⚠️ Error fetching weather data.");
      setWeather(null);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className="flex flex-col justify-center items-center bg-gradient-to-b from-white to-gray-200 py-10">
        <h1 className="text-3xl font-bold mb-6 text-center">
          🌤️ Live Weather Service by CultivNationIndia
        </h1>

        <div className="flex gap-3 mb-8">
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
            className="w-72 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={checkWeather}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {weather ? (
          <div className="bg-yellow-400 p-6 rounded-3xl shadow-xl w-80 text-center">
            <img
              src={getWeatherIcon(weather.weather[0].main)}
              alt="Weather Icon"
              className="w-20 mx-auto mb-4"
            />
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            <p className="text-5xl font-extrabold my-2">
              {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-lg text-gray-700 mb-4">                
              {weather.weather[0].main}
            </p>

            <div className="flex justify-around mt-6">
              <div className="flex flex-col items-center">
                <img
                  src="/Images/humidity.png"
                  alt="Humidity"
                  className="w-8 mb-1"
                />
                <p className="text-lg font-medium">{weather.main.humidity}%</p>
                <span className="text-sm text-gray-600">Humidity</span>
              </div>
              <div className="flex flex-col items-center">
                <img src="/Images/wind.png" alt="Wind" className="w-8 mb-1" />
                <p className="text-lg font-medium">{weather.wind.speed} km/h</p>
                <span className="text-sm text-gray-600">Wind Speed</span>
              </div>
            </div>
          </div>
        ) : (
          !error && (
            <div className="bg-yellow-100 p-6 rounded-3xl shadow-md w-85 text-center mt-4">
              <img
                src="/Images/clear.png"
                alt="Default Weather Icon"
                className="w-36 mx-auto mb-4 opacity-70"
              />
              <h2 className="text-xl font-semibold text-gray-600">
                No data yet
              </h2>
              <p className="text-gray-500">Search for a city to see weather</p>
            </div>
          )
        )}
      </div>
    </>
  );
}

function getWeatherIcon(condition) {
  switch (condition) {
    case "Clouds":
      return "/Images/clouds.png";
    case "Clear":
      return "/Images/clear.png";
    case "Rain":
      return "/Images/rain.png";
    case "Drizzle":
      return "/Images/drizzle.png";
    case "Mist":
      return "/Images/mist.png";
    default:
      return "/Images/clear.png";
  }
}
