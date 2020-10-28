import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';

import { convertToCelsius } from '../utils/convertToCelsius';
import { getDays } from '../utils/getDays';

import { fiveDayForecastsComponentLabels } from '../constants/label.constants';

const FiveDayForecast = ({ fiveDayForecast }) => {
    const [daysOfWeek, setDaysOfWeek] = useState([]);

    useEffect(() => {
        setDaysOfWeek(getDays(new Date()));
    }, []);

    return (
        <div className="five-day-forecast-container">
            <p>{fiveDayForecastsComponentLabels.title}</p>
            <div className="five-day-forecast-flex-parent">
                {fiveDayForecast && fiveDayForecast.map((day, i) => {
                    return (
                        <div className="five-day-forecast-flex-item" key={i}>
                            <p>{dayjs(daysOfWeek[i]).format('ddd')}</p>
                            <p>{convertToCelsius(day.main.temp)}<sup>o</sup></p>
                            <small>{day.weather[0].description}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

FiveDayForecast.propTypes = {
    fiveDayForecast: PropTypes.array,
};

export default FiveDayForecast;
