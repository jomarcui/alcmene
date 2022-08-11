const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middleware/errorHandler');

const { logger } = require('./middleware/eventLogger');
const { WebSocketServer } = require('ws');

const schedulesRoute = require('./routes/schedules');
const leaguesRoute = require('./routes/leagues');
const matchesRoute = require('./routes/api/matches');
const registrationsRoute = require('./routes/api/registrations');
const sportsRoute = require('./routes/sports');
const teamsRoute = require('./routes/teams');
const usersRoute = require('./routes/api/users');

require('dotenv').config();

const app = express();

app.use(cors());
app.use(errorHandler);
app.use(express.json());
app.use(logger);

mongoose.connect(process.env.ATLAS_URI);

const connection = mongoose.connection;

connection.once('open', () =>
  console.log('MongoDB database connection is established.')
);

// TODO: Put routes in a separate file
app.use('/schedules', schedulesRoute);
app.use('/leagues', leaguesRoute);
app.use('/matches', matchesRoute);
app.use('/registrations', registrationsRoute);
app.use('/sports', sportsRoute);
app.use('/teams', teamsRoute);
app.use('/users', usersRoute);

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
