const express = require('express');
const app = module.exports = express();

app.use('/v1.0', require('./v1.0'));
app.get('/', (req, res) => {
    res.status(404).send('API is available on /v1.0');
});