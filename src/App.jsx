import React, { useState, useEffect } from 'react';

import Layout from './components/Layout';
import Cities from './components/Cities';
import CitiesList from './components/CitiesList';

import { appComponentLabels } from './constants/label.constants';

import { fetchWeatherData } from './adapters/openWeatherMap.adapter';

import './App.css';

function App() {
    const [citiesForecast, setCitiesForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [cityToRemoveName, setCityToRemove] = useState('');
    const [isError, setError] = useState(false);

    const numOfCities = citiesForecast.length;

    useEffect(() => {
        const filterCitiesForecast = citiesForecast.map(city => {
            const temp = { ...city };
            if (temp.currentWeather.name === cityToRemoveName) {
                temp.visible = !city.visible;
            }
            return temp;
        });
        setCitiesForecast(filterCitiesForecast);
        setCityToRemove('');
    }, [cityToRemoveName]);

    const prepWeatherData = (data) => {
        const fiveDayWeather = data[1].list.filter((value, index) => {
            return index % 8 === 0;
        });
        const cityData = {
            city: data[0].name,
            visible: true,
            currentWeather: data[0],
            fiveDayWeather,
        };
        setCitiesForecast((prevState) => {
            return [...prevState, cityData];
        });
    };

    const getCityForecast = (e) => {
        if (e.key === 'Enter') {
            if (isError) setError(false);

            setIsLoading(true);
            fetchWeatherData(e.target.value).then(data => {
                if (data) {
                    setIsLoading(false);
                    prepWeatherData(data);
                }
            })
                .catch(err => {
                    console.error('ERROR!', err);
                    setTimeout(() => {
                        setError(true);
                        setIsLoading(false);
                    }, 3000);
                });
            e.target.value = '';
        }
    };

    return (
        <Layout>
            <input
                className="searh-city-input"
                type="text"
                placeholder="type city and press enter..."
                onKeyDown={(e) => getCityForecast(e)}
            />
            <h1>{appComponentLabels.title}</h1>
            {isError && <h2>There was an error, please try again</h2>}
            <div className="city-list-container">
                {citiesForecast.map(city => (
                    <CitiesList
                        name={city.currentWeather.name}
                        isChecked={city.visible}
                        setCityToRemove={setCityToRemove}
                    />
                ))}
            </div>
            {isLoading ? 'Loading...' : numOfCities > 0 && (
                <Cities citiesForecast={citiesForecast} />
            )}
        </Layout>
    );
}

export default App;
