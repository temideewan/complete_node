const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();

const server = http.createServer(app);

// initiate socket and attach it to the server

const io = socket(server);

app.use(express.static('public'));

const PORT = process?.env?.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
