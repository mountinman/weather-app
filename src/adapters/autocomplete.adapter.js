import axios from 'axios';

export const getAutocompleteData = async (searchTerm) => {
    if (searchTerm === '') {
        return '';
    }
    const res = await axios(`http://localhost:5000/cities/${searchTerm}`)
        .then(data => {
            return JSON.parse(data.request.response);
        })
        .catch(err => console.log('ERROR!!!:', err));

    return res;
};
