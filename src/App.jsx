import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './components/Layout';
import Cities from './components/Cities';
import CitiesList from './components/CitiesList';

import { appComponentLabels } from './constants/label.constants';

import { fetchWeatherData } from './adapters/openWeatherMap.adapter';

import './App.css';

function App() {
    const [citiesForecast, setCitiesForecast] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [searchTerm, setSearchTerm] = useState();

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

    const getCityForecast = (e) => {
        if (e.key === 'Enter') {
            if (isError) setError(false);
            setIsLoading(true);
            fetchWeatherData(e.target.value).then(data => {
                if (data) {
                    setIsLoading(false);
                    prepWeatherData(data);
                }
            }).catch(err => {
                console.error('ERROR!', err);
                setTimeout(() => {
                    setError(true);
                    setIsLoading(false);
                }, 3000);
            });
            e.target.value = '';
        }
    };

    const handleAutoComplete = async (e) => {
        if (e.target.value === '') {
            return null;
        }
        await axios(`http://localhost:5000/cities/${e.target.value}`)
            .then(data => {
                setSearchTerm(data.request.response);
            })
            .catch(err => console.log('ERROR:', err));
    };

    useEffect(() => {
        console.log(searchTerm);
    }, [searchTerm]);

    return (
        <Layout>
            <input
                className="search-city-input"
                type="text"
                placeholder="type city and press enter..."
                onKeyDown={(e) => getCityForecast(e)}
                onChange={(e) => handleAutoComplete(e)}
            />
            <h1>{appComponentLabels.title}</h1>
            {isError && <h2>There was an error, please try again</h2>}
            <div className="city-list-container">
                {citiesForecast.map(city => (
                    <CitiesList
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
