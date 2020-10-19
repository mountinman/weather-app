import React from 'react';
import PropTypes from 'prop-types';

import City from './City';

const Cities = ({ citiesForecast }) => {
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
                            currentWeather={currentWeather}
                            index={i}
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
