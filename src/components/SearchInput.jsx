import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchDropdown from './SearchDropdown';

import { getAutocompleteData } from '../adapters/autocompleteData.adapter';

const SearchInput = ({ getCityForecast }) => {
    const [searchTerm, setSearchTerm] = useState();
    const [autocompleteCitiesData, setAutocompleteData] = useState();

    const handleInputChange = async (e) => {
        setSearchTerm(e.target.value);
        const res = await getAutocompleteData(e.target.value);
        setAutocompleteData(res);
    };

    const handleSearch = () => {
        getCityForecast(searchTerm);
        setAutocompleteData('');
        setSearchTerm('');
    };

    const setAutocompleteCitiesData = (city) => {
        setSearchTerm(city);
    };

    return (
        <div className="search-city">
            <input
                className="search-city-input"
                type="text"
                value={searchTerm}
                placeholder="type city and press search..."
                onChange={handleInputChange}
            />
            <SearchDropdown
                setAutocompleteCitiesData={setAutocompleteCitiesData}
                autocompleteCitiesData={autocompleteCitiesData}
            />
            <button type="button" onClick={handleSearch}>Search</button>
        </div>

    );
};

SearchInput.propTypes = {
    getCityForecast: PropTypes.func,
};

export default SearchInput;
