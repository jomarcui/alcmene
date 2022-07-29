const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');

const schedulesRoute = require('./routes/schedules');
const leaguesRoute = require('./routes/leagues');
const sportsRoute = require('./routes/sports');
const teamsRoute = require('./routes/teams');
const usersRoute = require('./routes/users');
const { WebSocketServer } = require('ws');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection is established.');
});

app.use('/schedules', schedulesRoute);
app.use('/leagues', leaguesRoute);
app.use('/sports', sportsRoute);
app.use('/teams', teamsRoute);
app.use('/users', usersRoute);

const server = require('http').createServer(app);

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log('A new client has connected.');

  ws.send('Welcome, new client!');

  ws.on('message', (message) => {
    console.log(`${message} received.`);
  });
});

// app.listen(port, () => {
//   console.log(`Server is running in port: ${port}`);
// });

server.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
