/* eslint-disable import/order */
// #!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config();


const debug = require('debug')('whasssappapi:server');
const http = require('http');
const app = require('../app');


/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

const io = require('socket.io')(server);


io.on('connection', (socket) => {
  socket.on('join', (data) => {
    console.log(data);
    console.log(`${data.userName} has joined ${data.chatRoomName}`);
    socket.join(data.chatRoom);
    io.emit('roomJoined', data.chatRoomName);
  });
  socket.on('message', (data) => {
    console.log('message data', data);
    io.emit(`${data.chatRoomName}newMessage`, data);
  });
  socket.on('typing', (data) => {
    console.log('typing socket', data);
    io.emit(`${data.chatRoomName}typing`, data);
  });
});
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
}
