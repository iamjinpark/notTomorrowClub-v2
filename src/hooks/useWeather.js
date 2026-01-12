import { useEffect, useState } from "react";

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // IP 기반 위치 조회
        const ipRes = await fetch("https://ipwho.is/");
        const ipData = await ipRes.json();

        const { latitude, longitude, city, country } = ipData;

        setLocation({
          location: city,
          country: country,
        });

        // 날씨 조회
        const weatherRes = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${
            import.meta.env.VITE_WEATHER_API_KEY
          }`
        );

        const weatherData = await weatherRes.json();

        setWeather(weatherData);
      } catch (err) {
        console.error(err);
        setError("Failed to load weather");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  return { weather, location, loading, error };
}

export default useWeather;
