import React from 'react';
import PropTypes from 'prop-types';

import FiveDayForecast from './FiveDayForecast';

import { convertToCelsius } from '../utils/convertToCelsius';

import { cityComponentLabels } from '../constants/label.constants';

const City = ({
    currentWeather,
    index,
    fiveDayWeather,
    setCurrentOpenIndex,
    currentOpenFiveDayForecastIndex,
    setFiveDayForecastState,
    isFiveDayForecastOpen,
}) => {
    const { name, weather, main, wind } = currentWeather;

    const toggleFiveDayForecast = (e) => {
        setFiveDayForecastState(true);
        if (currentOpenFiveDayForecastIndex === Number(e.target.dataset.id)
        && isFiveDayForecastOpen) setFiveDayForecastState(false);
        setCurrentOpenIndex(Number(e.target.dataset.id));
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
                <sup className="celsius-sign">o</sup>
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
                {isFiveDayForecastOpen && index === currentOpenFiveDayForecastIndex ? '-' : '+'}
            </button>
            {isFiveDayForecastOpen && index === currentOpenFiveDayForecastIndex && <FiveDayForecast fiveDayForecast={fiveDayWeather} />}
        </div>
    );
};

City.propTypes = {
    isFiveDayForecastOpen: PropTypes.bool,
    setFiveDayForecastState: PropTypes.func,
    currentOpenFiveDayForecastIndex: PropTypes.number,
    setCurrentOpenIndex: PropTypes.func,
    currentWeather: PropTypes.object,
    index: PropTypes.number,
    fiveDayWeather: PropTypes.array,
};

export default City;
