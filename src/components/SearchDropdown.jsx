import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SearchDropdown = ({ autocompleteCitiesData, setAutocompleteCitiesData }) => {
    const [cities, setCities] = useState(null);

    useEffect(() => {
        setCities(autocompleteCitiesData);
    }, [autocompleteCitiesData]);

    const handleAutocompleteData = (city) => {
        setAutocompleteCitiesData(city);
        setCities(null);
    };

    return (
        <div className="weather-app-cities-list">
            {cities && cities.map((city, i) => {
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
