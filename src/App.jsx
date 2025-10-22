import React, { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const DEFAULT_CITY = "Addis Ababa";

function App() {
  const [city, setCity] = useState(() => {
    try {
      return localStorage.getItem("lastCity") || DEFAULT_CITY;
    } catch {
      return DEFAULT_CITY;
    }
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async (q) => {
    if (!q) return;
    setLoading(true);
    setError("");
    setWeather(null);
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(q)}&appid=${API_KEY}&units=metric`;
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setWeather(data);
        try { localStorage.setItem("lastCity", q); } catch { }
      } else {
        setError(data.message || "City not found");
      }
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetch initial weather on mount
    fetchWeather(city);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // decide background class from weather
  const bgClass = (() => {
    if (!weather) return "bg-clear";
    const w = weather.weather?.[0]?.main?.toLowerCase() ?? "";
    if (w.includes("cloud")) return "bg-clouds";
    if (w.includes("rain") || w.includes("drizzle")) return "bg-rain";
    if (w.includes("snow")) return "bg-snow";
    if (w.includes("thunder") || w.includes("storm")) return "bg-thunder";
    if (w.includes("clear")) return "bg-clear";
    return "bg-clouds";
  })();

  return (
    <div className={`min-h-screen flex items-center justify-center p-6 ${bgClass}`}>
      <div className="w-full max-w-4xl">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold">Weather Dashboard</h1>
          <p className="text-sm text-gray-700 mt-1">Search any city to get current weather (OpenWeatherMap)</p>
        </header>

        <main className="flex flex-col md:flex-row gap-6 items-start">
          <div className="flex-1">
            <SearchBar
              initialCity={city}
              onSearch={(q) => {
                setCity(q);
                fetchWeather(q);
              }}
            />
            <div className="mt-6">
              {loading && <div className="p-4 weather-card">Loading...</div>}
              {error && <div className="p-4 weather-card text-red-600">Error: {error}</div>}
              {!loading && weather && (
                <WeatherCard weather={weather} />
              )}
            </div>
          </div>

          <aside className="w-full md:w-80">
            <div className="weather-card">
              <h3 className="font-semibold text-lg">Last searched</h3>
              <p className="text-sm text-gray-700 mt-2">{city}</p>
              <hr className="my-3" />
              <p className="text-sm text-gray-600">Tip: Use the search bar to look up different cities. The app saves your last searched city in your browser.</p>
            </div>

            <div className="weather-card mt-6">
              <h3 className="font-semibold text-lg">About</h3>
              <p className="text-sm text-gray-700 mt-2">This demo uses the OpenWeatherMap current weather API.</p>
            </div>
          </aside>
        </main>

        <footer className="mt-8 text-center text-xs text-gray-700">
          Built with React + Tailwind • Data from OpenWeatherMap
        </footer>
      </div>
    </div>
  );
}

export default App;
