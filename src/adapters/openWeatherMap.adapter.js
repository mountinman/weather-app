import axios from 'axios';
import config from '../config/openWeatherMap';

const { weatherHost, forecastHost, key } = config;

export const fetchWeatherData = (c) => {
    const apiUrls = [
        `${weatherHost}?q=${c}&appid=${key}`,
        `${forecastHost}?q=${c}&appid=${key}`,
    ];

    const allRequests = apiUrls.map(url =>
        axios.get(url).then(response => response.data));

    return Promise.all(allRequests);
};
