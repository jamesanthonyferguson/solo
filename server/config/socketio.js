/**
 * Socket.io configuration
 */

'use strict';

var config = require('./environment');

// When the user disconnects.. perform this
function onDisconnect(socket) {
}

var socketData = {};
// When the user connects.. perform this
function onConnect(socket, socketio) {
  // When the client emits 'info', this listens and executes
  socket.on('info', function (data) {
    console.info('[%s] %s', socket.address, JSON.stringify(data, null, 2));
  });

  // Insert sockets below
  require('../api/thing/thing.socket').register(socket);

    socket.on('createGame', function(data){
      console.log("creating game:",data);
      socket.join(data.room);
    })

    socket.on('joinGame', function(data){
      console.log("joining game", data);
      socket.join(data.room);
      console.log(this)
      console.log(socket.id);
      var id = socket.id;
      var room = data.room;
      var user = data.username;
      if (socketData[room] === undefined) {
        socketData[room] = {};
      }
      socketData[room][user] = {tally: 0, answers: {}};
      socket.join(data.room);
      console.log(socketData);
      socket.broadcast.to(data.room).emit("newPlayer", user);
    })

    socket.on('start', function(data){
      console.log("starting game for room", data);
      socket.broadcast.to(data).emit("starting");
    })

    socket.on('nextQuestion', function(data){
      console.log("nextQuestion being sent to clients in room", data);
      socket.broadcast.to(data).emit("nextQuestion");
    })

    socket.on('gameOver', function(data){
      console.log("game over being sent to clients in room", data);
      //Try and Emit to self (works)
      clients[socket.id].emit("gameOver", socketData[data]);
      //Try and Emit to others (works)
      socket.broadcast.to(data).emit("gameOver", socketData[data]);
    })

    socket.on('answer', function(data){
      var questionNumber = data.q;
      var roomA = data.r;
      var userA = data.u;
      var answer = data.a;
      var correct = data.c;
      socketData[roomA][userA]['answers'][questionNumber] = answer;
      if (correct) {
        socketData[roomA][userA]['tally'] = socketData[roomA][userA]['tally'] +1 || 1;
      }
    })
}
var clients = {};

module.exports = function (socketio) {
  // socket.io (v1.x.x) is powered by debug.
  // In order to see all the debug output, set DEBUG (in server/config/local.env.js) to including the desired scope.
  //
  // ex: DEBUG: "http*,socket.io:socket"

  // We can authenticate socket.io users and access their token through socket.handshake.decoded_token
  //
  // 1. You will need to send the token in `client/components/socket/socket.service.js`
  //
  // 2. Require authentication here:
  // socketio.use(require('socketio-jwt').authorize({
  //   secret: config.secrets.session,
  //   handshake: true
  // }));

  socketio.on('connection', function (socket, socketio) {
    socketio = this;
    clients[socket.id] = socket;
    socket.address = socket.handshake.address !== null ?
            socket.handshake.address.address + ':' + socket.handshake.address.port :
            process.env.DOMAIN;

    socket.connectedAt = new Date();

    // Call onDisconnect.
    socket.on('disconnect', function () {
      onDisconnect(socket);
      console.info('[%s] DISCONNECTED', socket.address);
    });

    // Call onConnect.
    onConnect(socket, socketio);
    console.info('[%s] CONNECTED', socket.address);
  });
};