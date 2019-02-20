module.exports = (app) => {
    app.use('/api', require('./api'));
    app.use('/api-docs', require('./api-docs'));
    app.get('/', (req, res) => {
        res.status(404).send('API is available on /api')
    });
  };