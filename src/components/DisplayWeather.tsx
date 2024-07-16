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
import toast from "react-hot-toast";

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
  const [isLoading, setIsLoading] = useState(false);
  const [searchCity, setSearchCity] = useState("");

  const api_key = "bce6b79cb36e78219a1d79a037d2a09c";
  const api_endPoints = "https://api.openweathermap.org/data/2.5/";

  const fetchCurrentWeather = async (lat: number, lon: number) => {
    const url = `${api_endPoints}weather?lat=${lat}&lon=${lon}&exclude={part}&appid=${api_key}&units=metric`;
    const response = await axios.get(url);
    return response.data;
  };

  const fetchWeatherData = async (city: String) => {
    try {
      const url = `${api_endPoints}weather?q=${city}&appid=${api_key}&units=metric`;
      const searchResponse = await axios.get(url);

      const currentSearchResult: WeatherDataProps = searchResponse.data;
      return { currentSearchResult };
    } catch (error) {
      console.log("No Data Found❌");
      throw error;
    }
  };

  const handleSearch = async () => {
    try {
      if (searchCity.trim() === "") {
        return;
      }

      const { currentSearchResult } = await fetchWeatherData(searchCity);
      setWeatherData(currentSearchResult);
    } catch (error) {
      console.log("NO Data Found❌");
      toast.error("No Data Found", {
        duration: 2000,
        position: "top-center",
      });
    }
  };

  const iconChanger = (weather: string): React.ReactNode => {
    let iconElement: React.ReactNode = <TiWeatherPartlySunny />;
    let iconColor: string;

    switch (weather) {
      case "Rain":
        iconElement = <FaCloudRain />;
        iconColor = "#1E90FF";
        break;

      case "Clear":
        iconElement = <IoMdSunny />;
        iconColor = "#D2691E";
        break;

      case "Clouds":
        iconElement = (
          <IoIosCloudy style={{ filter: "drop-shadow(0 0 2px black)" }} />
        );
        iconColor = "#FFF5EE";
        break;

      case "Mist":
        iconElement = (
          <BsFillCloudFogFill
            style={{ filter: "drop-shadow(0 0 2px black)" }}
          />
        );
        iconColor = "#B0E0E6";
        break;

      default:
        iconElement = <TiWeatherPartlySunny />;
        iconColor = "#D2691E";
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

      Promise.all([fetchCurrentWeather(latitude, longitude)]).then(
        ([currentWeather]) => {
          setIsLoading(true);
          setWeatherData(currentWeather);
        }
      );
    });
  }, []);

  return (
    <MainWrapper>
      <div className="container">
        <div className="searchArea">
          <input
            type="text"
            name="city"
            id="city"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            placeholder="Enter a city"
          />
          <div className="searchCircle" onClick={handleSearch}>
            <CiSearch className="searchIcon" />
          </div>
        </div>

        {weatherData && isLoading ? (
          <>
            <div className="weatherArea">
              <h1>{weatherData.name}</h1>
              <span>{weatherData.sys.country}</span>
              <div className="icon">
                {iconChanger(weatherData.weather[0].main)}
              </div>
              <h1>{weatherData.main.temp.toFixed(0)}</h1>
              <span>{weatherData.weather[0].main}</span>
            </div>

            <div className="bottomInfoArea">
              <WiHumidity className="windIcon" style={{ color: "#7B68EE" }} />
              <div className="humidityLevel">
                <div className="humidInfo">
                  <h1>{weatherData.main.humidity}%</h1>
                  <p>Humidity</p>
                </div>
              </div>

              <div className="wind">
                <MdWindPower
                  className="windIcon"
                  style={{ color: "#A0522D" }}
                />
                <div className="humidInfo">
                  <h1>{weatherData.wind.speed} km/h</h1>
                  <p>Wind Speed</p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="loading">
            <RiLoaderFill className="loadingIcon" />
            <p>Loading</p>
          </div>
        )}
      </div>
    </MainWrapper>
  );
};

export default DisplayWeather;
