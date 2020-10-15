import React, { useState } from 'react';

import Layout from './components/Layout';
import Cities from './components/Cities';

import { fetchWeatherData } from './adapters/openWeatherMap.adapter';

import './App.css';

function App() {
    const [citiesForecast, setCitiesForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const numOfCities = citiesForecast.length;

    const prepWeatherData = (data) => {
        const fiveDayWeather = data[1].list.filter((value, index) => {
            return index % 8 === 0;
        });
        const cityData = {
            city: data[0].name,
            show: true,
            currentWeather: data[0],
            fiveDayWeather,
        };
        setCitiesForecast((prevState) => {
            return [...prevState, cityData];
        });
    };

    const getCityForecast = (e) => {
        if (e.key === 'Enter') {
            setIsLoading(true);

            fetchWeatherData(e.target.value).then(data => {
                if (data) {
                    setIsLoading(false);
                    prepWeatherData(data);
                }
            });
            e.target.value = '';
        }
    };

    return (
        <Layout>
            <input
                type="text"
                placeholder="type city and press enter..."
                onKeyDown={(e) => getCityForecast(e)}
            />
            <h1>Weather Forecast App</h1>
            {isLoading ? 'Loading...' : numOfCities > 0 && (
                <Cities citiesForecast={citiesForecast} />
            )}
        </Layout>
    );
}

export default App;
