import useWeather from "@/hooks/useWeather";

import { useEffect, useState } from "react";

function Greeting() {
  const [onlineCount, setOnlineCount] = useState(0);
  const { weather, location } = useWeather();

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
    <div className="w-full flex justify-between items-end">
      <div className="flex flex-col">
        <h1 className="en-title-xl leading-[2.25rem]">
          {getGreetingMessage()}
        </h1>
        <div
          className="w-[6.563rem] h-[1.938rem] bg-gray5 rounded-full flex
            flex-row items-center justify-center gap-2 mt-[0.813rem]"
        >
          <span
            className={`inline-block w-[13px] h-[13px] ${dotColor} rounded-full`}
          />
          <span className="font-roboto font-medium">{onlineCount} online</span>
        </div>
      </div>
      <div className="font-chakra font-semibold text-[1.125rem] flex flex-col items-end leading-[1.125rem] gap-[0.438rem]">
        <span>{new Date().toLocaleDateString("sv-SE").replace(/-/g, "/")}</span>
        <span>{location?.country}</span>
        {weather && weather.weather && weather.weather.length > 0 ? (
          <span>
            {weather?.weather[0]?.main}, {Math.round(weather?.main?.temp)}℃,{" "}
            {weather?.wind?.speed} m/s
          </span>
        ) : (
          <span>Ready for weather data</span>
        )}
      </div>
    </div>
  );
}

export default Greeting;
