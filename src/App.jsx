import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import City from './components/City';
import FiveDayForcast from './components/FiveDayForcast';
import { getWeather, getForecast } from './adapters/openWeatherMap.adapter';

import './App.css';

function App() {
    const [weatherData, setWeatherData] = useState(null);
    const [fiveDayForecast, setFiveDayForecast] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        getForecast().then(data => {
            const newArr = data.list.filter((value, index) => {
                return index % 8 === 0;
            });
            console.log(newArr);
            setFiveDayForecast(newArr);
        });
    }, []);

    useEffect(() => {
        setTimeout(() => {
            getWeather().then(data => {
                const { wind, weather, main, name } = data;
                const forecastData = { wind, weather, main, name };
                setWeatherData(forecastData);
            });
        }, 1000);
    }, []);

    return (
        <Layout>
            {weatherData === null ? 'Loading...' : (
                <div className="weather-app">
                    {weatherData && <City weatherData={weatherData} />}
                    <button type="button" onClick={() => setIsOpen(!isOpen)}>{isOpen ? '-' : '+'}</button>
                    {isOpen && <FiveDayForcast fiveDayForecast={fiveDayForecast} />}
                </div>
            )}
        </Layout>
    );
}

export default App;
