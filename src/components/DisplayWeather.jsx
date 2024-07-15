import React from "react";
import { MainWrapper } from './style.module';
import { CiSearch } from "react-icons/ci";
import { WiHumidity } from "react-icons/wi";
import { MdWindPower } from "react-icons/md";

const DisplayWeather = () => {
    return (
        <MainWrapper>
            <div className="container">
                <div className="searchArea">
                    <input type="text" name="city" id="city" placeholder='Enter a city' />
                    <div className="searchCircle">
                        <CiSearch className='searchIcon' />
                    </div>
                </div>

                <div className="weatherArea">
                    <h1>Kannur</h1>
                    <span>KN</span>
                    <div className="icon">icon</div>
                    <h1>18°C</h1>
                    <h2>Cloudy</h2>
                </div>

                <div className="bottomInfoArea">
                    <div className='humidityLevel'>
                        <WiHumidity className='humidIcon' />
                        <div className='humidInfo'>
                            <h1>60%</h1>
                            <p>Humidity</p>
                        </div>
                    </div>

                    <div className='wind'>
                        <MdWindPower className='windIcon' />
                        <div className='humidInfo'>
                            <h1>3.25 km/h</h1>
                            <p>Wind Speed</p>
                        </div>
                    </div>
                </div>
            </div>
        </MainWrapper>
    )
}

export default DisplayWeather;
