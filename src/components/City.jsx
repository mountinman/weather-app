import React from 'react';
import PropTypes from 'prop-types';
import { cityComponentLabels } from '../constants/label.constants';

import { convertToCelsius } from '../utils/convertToCelsius';

const City = ({ currentWeather }) => {
    const { name, weather, main, wind } = currentWeather;
    return (
        <div className="weather-app-widget">
            <h1 className="weather-app-widget-title">
                {name}, {weather[0].description}
                <img
                    src={`http://openweathermap.org/img/w/${weather[0].icon}.png`}
                    alt="current weather icon"
                />
            </h1>
            <div className="weather-app-widget-data">
                <div className="column left-column">
                    <p>{convertToCelsius(main.temp)}</p>
                </div>
                <sup className="celzius-sign">o</sup>
                <div className="column right-column">
                    <p>{cityComponentLabels.feel} {convertToCelsius(main.feels_like)} &#8451;</p>
                    <p>{cityComponentLabels.pressure} {main.pressure} hPa</p>
                    <p>{cityComponentLabels.humidity} {main.humidity} %</p>
                    <p>{cityComponentLabels.wind} <span>{wind.speed}</span>Km/h, <span>{wind.deg}</span></p>
                </div>
            </div>
        </div>
    );
};

City.propTypes = {
    currentWeather: PropTypes.object,
};

export default City;
