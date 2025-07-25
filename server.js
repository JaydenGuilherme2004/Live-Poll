const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const votes = {
  'Toxicity': 0,
  'American Idiot': 0,
  'Smells Like Teen Spirit': 0
};

// Serve static files from 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
  console.log('New client connected:', socket.id);
  socket.emit('update', votes);

  socket.on('vote', song => {
    if (votes[song] !== undefined) {
      votes[song]++;
      io.emit('update', votes);
      console.log('Vote received for:', song);
      console.log('Current votes:', votes);
    }
  });
});

server.listen(3000, () => {
  console.log('Live poll server running on http://localhost:3000');
});
