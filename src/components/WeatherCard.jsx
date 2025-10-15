import React from "react";

function Icon({ iconCode, description }) {
    // OpenWeatherMap icon URL
    const url = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    return (
        <img src={url} alt={description} width={80} height={80} />
    );
}

export default function WeatherCard({ weather }) {
    if (!weather) return null;
    const w = weather.weather?.[0] || {};
    const main = weather.main || {};
    const wind = weather.wind || {};

    return (
        <div className="weather-card flex flex-col md:flex-row items-center gap-6">
            <div className="flex items-center gap-4">
                <Icon iconCode={w.icon} description={w.description} />
                <div>
                    <h2 className="text-2xl font-bold">{weather.name}</h2>
                    <p className="text-sm text-gray-600 capitalize">{w.description}</p>
                </div>
            </div>

            <div className="ml-auto text-right">
                <div className="text-4xl font-extrabold">{Math.round(main.temp)}°C</div>
                <div className="text-sm text-gray-700 mt-1">Feels like {Math.round(main.feels_like)}°C</div>
                <div className="mt-3 text-sm text-gray-600">
                    💧 Humidity: {main.humidity}%<br />
                    💨 Wind: {wind.speed} m/s
                </div>
            </div>
        </div>
    );
}
