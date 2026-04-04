import { useEffect, useState } from "react";

const WMO_WEATHER_DESCRIPTIONS = {
  0: "Clear",
  1: "Mainly Clear",
  2: "Partly Cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Fog",
  51: "Drizzle",
  53: "Drizzle",
  55: "Drizzle",
  61: "Rain",
  63: "Rain",
  65: "Rain",
  71: "Snow",
  73: "Snow",
  75: "Snow",
  80: "Showers",
  81: "Showers",
  82: "Showers",
  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
};

function useWeather() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async (lat, lon) => {
      const [weatherRes, geoRes] = await Promise.all([
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weather_code`
        ),
        fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&accept-language=en`
        ),
      ]);

      const weatherData = await weatherRes.json();
      const geoData = await geoRes.json();

      const current = weatherData.current;
      setWeather({
        description: WMO_WEATHER_DESCRIPTIONS[current.weather_code] ?? "Unknown",
        temp: Math.round(current.temperature_2m),
        windSpeed: current.wind_speed_10m,
      });

      setLocation({
        city:
          geoData.address?.city ||
          geoData.address?.town ||
          geoData.address?.village,
        country: geoData.address?.country,
      });
    };

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          await fetchWeather(coords.latitude, coords.longitude);
        } catch (err) {
          console.error(err);
          setError("Failed to load weather");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        console.error(err);
        setError("Location access denied");
        setLoading(false);
      }
    );
  }, []);

  return { weather, location, loading, error };
}

export default useWeather;
