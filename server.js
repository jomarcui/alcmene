const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { WebSocketServer } = require('ws');
const errorHandler = require('./middleware/errorHandler');
const { logger } = require('./middleware/eventLogger');
const verifyJWT = require('./middleware/verifyJWT');

require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

mongoose.connect(process.env.ATLAS_URI);

const connection = mongoose.connection;

connection.once('open', () =>
  console.log('MongoDB database connection is established.')
);

// TODO: Put routes in a separate file
app.use('/auth', require('./routes/auth'));
app.use('/logout', require('./routes/logout'));
app.use('/refresh', require('./routes/refresh'));
app.use('/register', require('./routes/register'));
app.use('/schedules', require('./routes/api/schedules'));

app.use(verifyJWT);
app.use('/leagues', require('./routes/leagues'));
app.use('/matches', require('./routes/api/matches'));
app.use('/sports', require('./routes/sports'));
app.use('/teams', require('./routes/teams'));
app.use('/users', require('./routes/api/users'));

const server = require('http').createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('A new client has connected.');

  ws.on('message', (message) => {
    console.log(`A message from client was received: ${message}`);
    ws.send('This is a sample data.');
  });
});

// app.listen(port, () => {
//   console.log(`Server is running in port: ${port}`);
// });

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
