const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const cities = require('./cities.json');

const PORT = 5001;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.options('*', cors());
app.use(cors());

app.get('/cities/:city', (req, res) => {
    const filterRes = cities.filter(c => c.toLowerCase().includes(req.params.city.toLowerCase()));
    res.status(200).send(filterRes);
});

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
