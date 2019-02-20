const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const http = require('http');
const server = http.createServer(app);

// body parser set
app.use(bodyParser.json({ type: 'text/plain' }));
app.use(bodyParser.json({type: 'json'}));
app.use(bodyParser.urlencoded({extended: true}));

//static file
app.use(express.static(path.join(__dirname, 'public')));
// add routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); 
});
// error handler
app.use(function(err, req, res, next) {
  //render the error page
  res.status(err.status || 500);
  res.send({error: err.message, code: err.codeErr});
});

server.listen(process.env.PORT || 2345, function() {
  console.log('App start on port: ' + server.address().port);
});

module.exports = app;