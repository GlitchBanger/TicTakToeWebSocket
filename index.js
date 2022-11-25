const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const cors = require('cors');
let ips = require('os').networkInterfaces();

app.use(cors());

const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

matches = [];
users = [];

app.get("/", (req, res) => {
  res.send("hello");
});

io.on('connection', (socket) => {
  console.log(socket.id);
  
  socket.on('move', (grid) => {
    io.emit('updategrid', grid);
    console.log(socket.id);
  });
  
  socket.on('createUser', (data) => {
  	users.push(data);
  	io.emit('leaderboard', {users});
  });
  
  socket.on('disconnect', () => {
    console.log("user disconnected");
  });
})

let PORT = 4000;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
