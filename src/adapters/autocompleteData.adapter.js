import axios from 'axios';

export const getAutocompleteData = async (searchTerm) => {
    const res = await axios(`http://localhost:5001/cities/${searchTerm}`)
        .then(data => {
            return JSON.parse(data.request.response);
        })
        .catch(err => console.log('ERROR:', err));

    return res;
};
