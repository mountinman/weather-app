import React, { useState } from 'react';
import Layout from './components/Layout';
import Cities from './components/Cities';
import CitiesList from './components/CitiesList';
import SearchInput from './components/SearchInput';

import { appComponentLabels } from './constants/label.constants';

import { fetchWeatherData } from './adapters/openWeatherMap.adapter';

import './App.css';

function App() {
    const [citiesForecast, setCitiesForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);

    const numOfCities = citiesForecast.length;

    const removeCity = (cityToRemove) => {
        const filterCitiesForecast = citiesForecast.map(city => (
            {
                ...city,
                visible: city.currentWeather.name === cityToRemove ? !city.visible : city.visible,
            }
        ));

        setCitiesForecast(filterCitiesForecast);
    };

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

    const getCityForecast = (searchTerm) => {
        if (isError) setError(false);
        setIsLoading(true);
        fetchWeatherData(searchTerm).then(data => {
            if (data) {
                setIsLoading(false);
                prepWeatherData(data);
            }
        }).catch(err => {
            console.error('ERROR!', err);
            setTimeout(() => {
                setError(true);
                setIsLoading(false);
            }, 2000);
        });
        setTimeout(() => {
            setError(false);
        }, 10000);
    };

    return (
        <Layout>
            <SearchInput getCityForecast={getCityForecast} />
            <h1>{appComponentLabels.title}</h1>
            {isError && <h2 className="error-msg">{appComponentLabels.errorMsg}</h2>}
            <div className="city-list-container">
                {citiesForecast.map((city, i) => (
                    <CitiesList
                        key={i}
                        name={city.currentWeather.name}
                        isChecked={city.visible}
                        removeCity={removeCity}
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
