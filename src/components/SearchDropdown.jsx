import React from 'react';
import PropTypes from 'prop-types';

const SearchDropdown = ({ autocompleteData }) => {
    return (
        <div className="weather-app-cities-list">
            {autocompleteData && autocompleteData.map((s, i) => <p key={i}>{s}</p>)}
        </div>
    );
};

SearchDropdown.propTypes = {
    autocompleteData: PropTypes.array,
};

export default SearchDropdown;
