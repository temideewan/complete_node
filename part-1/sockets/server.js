const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();

const server = http.createServer(app);

// initiate socket and attach it to the server

const io = socket(server);

app.use(express.static('public'));

const users = new Set();

io.on('connection', (socket) => {
  console.log(`A user is now connected to the chat`);

  // handle users when they join the chat
  socket.on('join', (userName) => {
    socket.userName = userName;
    users.add(userName);

    // broadcast to all clients that a new user has joined
    io.emit('userJoined', userName);

    // send the updated user list to all clients

    io.emit('userList', Array.from(users));
  });

  // handle incoming chat messages
  socket.on('chatMessage', ({ userName, message }) => {
    // broadcast to all clients that a new message has been received
    io.emit('chatMessage', { userName, message });
  });

  socket.on('userTyping', (userName) => {
    io.emit('userTyping', userName);
  });

  // handle user disconnections

  socket.on('disconnect', () => {
    console.log('A user is disconnected');
    users.forEach((user) => {
      if (user === socket.userName) {
        users.delete(user);
        io.emit('userLeft', user);
        io.emit('userList', Array.from(users));
      }
    });
  });
});

const PORT = process?.env?.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
