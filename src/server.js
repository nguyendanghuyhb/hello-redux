const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server, { serveClient: false });
require('./sockets/server')(io);

const config = {
  port: process.env.PORT || 3000
};

app.set('view engine', 'ejs');
app.set('views', path.resolve('src/client'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/assets', express.static('assets'));
app.use('/dist', express.static('dist'));

/* Routing */
app.get('/', (req, res) => {
  res.render('index', { title: 'Express' });
});

app.get('/room/:roomId', async (req, res) => {
  const pattern = Math.floor(Math.random() * 5 + 1);
  const { roomId } = req.params;
  res.render('room', {
    pattern,
    roomId
  });
});

server.listen(config.port, () => {
  console.info(`Server running on port ${config.port}`);
});
