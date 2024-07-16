import { MainWrapper } from "./style.module";
import { CiSearch } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { MdWindPower } from "react-icons/md";
import { IoMdSunny } from "react-icons/io";
import { FaCloudRain } from "react-icons/fa";
import { IoIosCloudy } from "react-icons/io";
import { BsFillCloudFogFill } from "react-icons/bs";
import { RiLoaderFill } from "react-icons/ri";
import { TiWeatherPartlySunny } from "react-icons/ti";
import axios from "axios";
import { useEffect, useState } from "react";

interface WeatherDataProps {
  name: string;

  main: {
    temp: number;
    humidity: number;
  };
  sys: {
    country: string;
  };
  weather: {
    main: string;
  }[];
  wind: {
    speed: number;
  };
}

const DisplayWeather = () => {

  const [weatherData, setWeatherData] = useState<WeatherDataProps | null>(null);
  const [isLoading,setIsLoading] = useState(true);

  const api_key = "bce6b79cb36e78219a1d79a037d2a09c";
  const api_endPoints = "https://api.openweathermap.org/data/2.5/";

  const fetchWeatherData = async (lat: number, lon: number) => {
    const url = `${api_endPoints}weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const iconChanger = (weather: string): React.ReactNode => {
    let iconElement: React.ReactNode = <TiWeatherPartlySunny />;
    let iconColor : string;

    switch (weather) {
      case "Rain":
        iconElement = <FaCloudRain />;
        iconColor = "lightblue";
        break;

      case "Clear":
        iconElement = <IoMdSunny />;
        iconColor = "orange";
        break;

      case "Clouds":
        iconElement = <IoIosCloudy />;
        iconColor = "";
        break;

      case "Mist":
        iconElement = <BsFillCloudFogFill />;
        iconColor = "orange";
        break;

      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "orange";
    }

    return (
      <span className="icon" style={{ color: iconColor }}>
        {iconElement}
      </span>
    );
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      Promise.all([fetchWeatherData(latitude, longitude)]).then(
        ([currentWeather]) => {
          setWeatherData(currentWeather);
        }
      );
    });
  }, []);

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input type="text" name="city" id="city" placeholder="Enter a city" />
          <div className="searchCircle">
            <CiSearch className="searchIcon" />
          </div>
        </div>

        {weatherData && (
          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">
                {
                    iconChanger(weatherData.weather[0].main)
                }
                </div>
              <h1>{weatherData.main.temp.toFixed(0)}</h1>
              <span>{weatherData.weather[0].main}</span>
            </div>

            <div className="bottomInfoArea">
              <WiHumidity className="windIcon" style={{ color: "blue" }} />
              <div className="humidityLevel">
                <div className="humidInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <MdWindPower className="windIcon" />
                <div className="humidInfo">
                  <h1>{weatherData.wind.speed} km/h</h1>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
