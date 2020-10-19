import React, { useState } from 'react';
import PropTypes from 'prop-types';

import FiveDayForcast from './FiveDayForcast';

import { convertToCelsius } from '../utils/convertToCelsius';

import { cityComponentLabels } from '../constants/label.constants';

const City = ({ currentWeather, index, fiveDayWeather }) => {
    const { name, weather, main, wind } = currentWeather;
    const [isFiveDayForecastOpen, setFiveDayForecastState] = useState(false);
    const [currentOpen, setCurrentOpen] = useState(null);

    const toggleFiveDayForecast = (e) => {
        setFiveDayForecastState(!isFiveDayForecastOpen);
        setCurrentOpen(Number(e.target.dataset.id));
        if (currentOpen !== Number(e.target.dataset.id)) {
            setFiveDayForecastState(true);
        }
    };

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
            {cityComponentLabels.CTA}
            <button
                type="button"
                data-id={index}
                onClick={(e) => toggleFiveDayForecast(e)}
            >
                {isFiveDayForecastOpen && index === currentOpen ? '-' : '+'}
            </button>
            {isFiveDayForecastOpen && index === currentOpen && <FiveDayForcast fiveDayForecast={fiveDayWeather} />}
        </div>
    );
};

City.propTypes = {
    currentWeather: PropTypes.object,
    index: PropTypes.number,
    fiveDayWeather: PropTypes.array,
};

export default City;
