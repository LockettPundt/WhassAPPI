const socketIO = require('socket.io');

const io = socketIO();

const socketAPI = {};

socketAPI.io = io;

io.on('connection', () => {
  console.log('hi there. you connected.');
});

io.on('disconnect', () => {
  console.log('user disconnected.');
});

socketAPI.sendNotification = () => {
  io.sockets.emit('greeting', 'hi there. can you see this?');
};


module.exports = socketAPI;
