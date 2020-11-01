import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SearchDropdown from './SearchDropdown';

import { getAutocompleteData } from '../adapters/autocomplete.adapter';

const SearchInput = ({ getCityForecast }) => {
    const [autocompleteData, setAutocompleteData] = useState();

    const handleAutoComplete = async (e) => {
        const res = await getAutocompleteData(e.target.value);
        setAutocompleteData(res);
    };

    return (
        <>
            <input
                className="search-city-input"
                type="text"
                placeholder="type city and press enter..."
                onKeyDown={(e) => getCityForecast(e)}
                onChange={(e) => handleAutoComplete(e)}
            />
            <SearchDropdown autocompleteData={autocompleteData} />
        </>

    );
};

SearchInput.propTypes = {
    getCityForecast: PropTypes.func,
};

export default SearchInput;
