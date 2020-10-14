// 0 degrees Celsius is equal to 273.15 degrees Kelvin
export const convertToCelsius = (temperatureInKelvin) => {
    return Math.round(temperatureInKelvin - 273.15);
};
