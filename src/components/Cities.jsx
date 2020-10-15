import React, { useState } from 'react';
import PropTypes from 'prop-types';

import City from './City';
import FiveDayForcast from './FiveDayForcast';

const Cities = ({ citiesForecast }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [fiveDayCity, setFiveDayCity] = useState(null);

    const toggleFiveDayForecast = (e) => {
        setIsOpen(!isOpen);
        setFiveDayCity(Number(e.target.dataset.id));
    };

    return (
        citiesForecast.map((city, i) => {
            return (
                <div
                    key={i}
                    className="weather-app"
                    style={citiesForecast && { border: '3px solid white' }}
                >
                    <City currentWeather={city.currentWeather} />
                    press for next 5 day forecast
                    <button type="button" data-id={i} onClick={(e) => toggleFiveDayForecast(e)}>{isOpen && i === fiveDayCity ? '-' : '+'}</button>
                    {isOpen && i === fiveDayCity && <FiveDayForcast fiveDayForecast={city.fiveDayWeather} />}
                </div>
            );
        })
    );
};

Cities.propTypes = {
    citiesForecast: PropTypes.array,
};

export default Cities;
