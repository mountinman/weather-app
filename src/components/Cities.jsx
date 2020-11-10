import React, { useState } from 'react';
import PropTypes from 'prop-types';

import City from './City';

const Cities = ({ citiesForecast }) => {
    const [currentOpenFiveDayForecastIndex, setCurrentOpenIndex] = useState(null);
    const [isFiveDayForecastOpen, setFiveDayForecastState] = useState(false);

    return (
        citiesForecast.map((city, i) => {
            const { currentWeather, fiveDayWeather, visible } = city;

            return (
                visible && (
                    <div
                        key={i}
                        className="weather-app"
                        style={citiesForecast && { border: '3px solid white' }}
                    >
                        <City
                            setFiveDayForecastState={setFiveDayForecastState}
                            isFiveDayForecastOpen={isFiveDayForecastOpen}
                            currentOpenFiveDayForecastIndex={currentOpenFiveDayForecastIndex}
                            setCurrentOpenIndex={setCurrentOpenIndex}
                            currentWeather={currentWeather}
                            cityIndex={i}
                            fiveDayWeather={fiveDayWeather}
                        />
                    </div>
                )
            );
        })
    );
};

Cities.propTypes = {
    citiesForecast: PropTypes.array,
};

export default Cities;
