import axios from 'axios';
import config from '../config/openWeatherMap';

const { weatherHost, forecastHost, city, key } = config;

export const getWeather = async () => {
    try {
        const res = await axios.get(`${weatherHost}?q=${city}&appid=${key}`);
        return res.data;
    } catch (err) {
        return console.error(err);
    }
};

export const getForecast = async () => {
    try {
        const res = await axios.get(`${forecastHost}?q=${city}&appid=${key}`);
        return res.data;
    } catch (err) {
        return console.error(err);
    }
};
