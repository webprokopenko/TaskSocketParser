const express = require('express');
const app = express();
const http = require('http');
const io = require('socket.io')(http);
const OnlineAssets = require('./lib/coincap/getOnlineAssets');

const port = 8000;
io.listen(port);

const assetsStream = new AssetsStream();

assetsStream.on('readable', ()=>{
    let  chunk;
    while((chunk = assetsStream.read()) !==null ){
        console.log(`Chunk received: ${chunk.toString()}`)
    }
})

io.on('connection', async(client) => {
  const onlineAssets = new OnlineAssets();
  client.emit('updateRates', await onlineAssets.getTopAssets());
    setInterval(async() => {
      client.emit('updateRates', await onlineAssets.getTopAssets());
    }, 30000);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err); 
});