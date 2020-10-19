import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = ({ name, setCityToRemove, isChecked }) => {
    const removeCityFromView = () => {
        setCityToRemove(name);
    };

    return (
        <div className="weather-app-cities-list">
            {name}:
            <input
                type="checkbox"
                className="cities-list-checkbox"
                checked={isChecked}
                onChange={removeCityFromView}
            />
        </div>
    );
};

CitiesList.propTypes = {
    name: PropTypes.string,
    setCityToRemove: PropTypes.func,
    isChecked: PropTypes.bool,
};

export default CitiesList;
