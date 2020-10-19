import axios from 'axios';
import config from '../config/openWeatherMap';

const { weatherHost, forecastHost, key } = config;

export const fetchWeatherData = city => {
    const apiUrls = [
        `${weatherHost}?q=${city}&appid=${key}`,
        `${forecastHost}?q=${city}&appid=${key}`,
    ];

    const allRequests = apiUrls.map(url =>
        axios.get(url).then(response => response.data));

    return Promise.all(allRequests);
};
