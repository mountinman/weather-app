import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { convertToCelsius } from '../utils/convertToCelsius';
import { getDays } from '../utils/getDays';
import { fiveDayForecatsComponentLabels } from '../constants/label.constants';

const FiveDayForcast = ({ fiveDayForecast }) => {
    const [daysOfWeek, setDaysOfWeek] = useState([]);

    useEffect(() => {
        setDaysOfWeek(getDays(new Date()));
    }, []);

    return (
        <div className="five-day-forcast-container">
            <p>{fiveDayForecatsComponentLabels.title}</p>
            <div className="five-day-forcast-flex-parent">
                {fiveDayForecast && fiveDayForecast.map((day, i) => {
                    return (
                        <div className="five-day-forcast-flex-item" key={i}>
                            <p>{moment(daysOfWeek[i]).format('ddd')}</p>
                            <p>{convertToCelsius(day.main.temp)}<sup>o</sup></p>
                            <small>{day.weather[0].description}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

FiveDayForcast.propTypes = {
    fiveDayForecast: PropTypes.array,
};

export default FiveDayForcast;
