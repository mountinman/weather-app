import React from 'react';
import PropTypes from 'prop-types';

const SearchDropdown = ({ autocompleteCitiesData, setAutocompleteCitiesData }) => {
    const handleAutocompleteData = (city) => {
        setAutocompleteCitiesData(city);
    };

    return (
        <div className="weather-app-cities-list">
            {autocompleteCitiesData && autocompleteCitiesData.map((city, i) => {
                return (
                    <p
                        onClick={(e) => handleAutocompleteData(e.target.innerHTML)}
                        className="city"
                        key={i}
                    >
                        {city}
                    </p>
                );
            })}
        </div>
    );
};

SearchDropdown.propTypes = {
    autocompleteCitiesData: PropTypes.array,
    setAutocompleteCitiesData: PropTypes.func,
};

export default SearchDropdown;
