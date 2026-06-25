"use client";

import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [time, setTime] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
        if (!apiKey) {
          throw new Error("OpenWeatherMap API key not configured");
        }

        // Fetch weather for default location (hyderbad, India)
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Hyderabad,IN&units=metric&appid=${apiKey}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }

        const data = await response.json();
        setWeather({
          temp: Math.round(data.main.temp),
          description: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: (data.wind.speed * 3.6).toFixed(1),
          pressure: data.main.pressure,
          feelsLike: Math.round(data.main.feels_like),
        });
        setLoading(false);
      } catch (err) {
        console.error("Weather fetch error:", err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  const formatDate = () => {
    return time.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  const formatTime = () => {
    return time.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[150px] rounded-[4px] overflow-hidden border-2 border-[#0ea5e9] bg-[#19204c] text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="w-full h-[150px] rounded-[4px] overflow-hidden border-2 border-[#0ea5e9] bg-[#19204c]">
        <div className="h-[28px] bg-[#ff4fc8] flex items-center justify-between px-4 text-white text-[15px] font-semibold">
          <span>{formatDate()}</span>
          <span>{formatTime()}</span>
        </div>
        <div className="h-[82px] flex items-center px-4 text-white">
          <div className="text-center w-full">{error || "Unable to load weather"}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[150px] rounded-[6px] overflow-hidden bg-[#19204c]">
      <div className="h-[28px] bg-[#ff4fc8] flex items-center justify-between px-4 text-white text-[15px] font-semibold">
        <span>{formatDate()}</span>
        <span>{formatTime()}</span>
      </div>

      <div className="h-[82px] flex items-center px-4 text-white">
        <div className="flex items-center gap-3 w-[110px]">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 18a4 4 0 1 1 1.6-7.68A5 5 0 1 1 17 14h1a3 3 0 0 1 0 6H7" />
            <path d="M13 14v6" />
            <path d="M10 17l3 3 3-3" />
          </svg>
          <div className="text-[11px] leading-tight">
            <div>{weather.description}</div>
          </div>
        </div>

        <div className="w-[84px] text-center border-x border-white/20">
          <div className="text-[26px] leading-none">{weather.temp}°C</div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-x-2 gap-y-2 pl-3 text-[12px] leading-tight">
          <div>{weather.windSpeed} km/h<br />Wind</div>
          <div>{weather.humidity}%<br />Humidity</div>
          <div>{weather.pressure} mbar<br />Pressure</div>
        </div>
      </div>
    </div>
  );
}
