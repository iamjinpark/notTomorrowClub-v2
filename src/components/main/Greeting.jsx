import useWeather from "@/hooks/useWeather";

import { useEffect, useState } from "react";

function Greeting() {
  const [onlineCount, setOnlineCount] = useState(0);
  const { weather, city, loading } = useWeather();

  useEffect(() => {
    const random = Math.floor(Math.random() * 51);
    setOnlineCount(random);
  }, []);

  const dotColor = onlineCount === 0 ? "bg-red" : "bg-lightgreen";

  const getGreetingMessage = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 6 && currentHour < 12) {
      return "Hello, Stranger! Good Morning";
    } else if (currentHour >= 12 && currentHour < 18) {
      return "Hello, Stranger! Good Afternoon";
    } else {
      return "Hello, Stranger! Good Evening";
    }
  };

  return (
    <div className="w-full font-chakra font-semibold flex justify-between">
      <div className="flex flex-col justify-between">
        <h1 className="text-title-xl">{getGreetingMessage()}</h1>
        <div
          className="w-[6.563rem] h-[1.938rem] bg-gray5 rounded-full flex
            flex-row items-center justify-center gap-2 mt-4"
        >
          <span
            className={`inline-block w-[13px] h-[13px] ${dotColor} rounded-full`}
          />
          <span className="font-roboto font-semibold">
            {onlineCount} online
          </span>
        </div>
      </div>
      <div className="text-title-sm flex flex-col items-end pt-3">
        <p>{new Date().toLocaleDateString()}</p>
        <p>{city?.city}</p>
        {weather && weather.weather && weather.weather.length > 0 ? (
          <p>
            {weather?.weather[0]?.main}, {Math.round(weather?.main?.temp)}℃,{" "}
            {weather?.wind?.speed} m/s
          </p>
        ) : (
          <p>Ready for weather data</p>
        )}
      </div>
    </div>
  );
}

export default Greeting;
