---
to: server.js
unless_exists: true
---
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const mongoose = require('mongoose');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

const app = express();
const apiPort = process.env.PORT || 8000;

// const routes = require('./routes/index.js');

// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).catch(e => {
//     console.error('Connection error', e.message);
// });

// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.on('connected', () => {
//     console.log("Mongoose is conntected!");
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// var jwtCheck = jwt({
//     secret: jwks.expressJwtSecret({
//         cache: true,
//         rateLimit: true,
//         jwksRequestsPerMinute: 5,
//         jwksUri: 'https://dev-k7np2bjo.auth0.com/.well-known/jwks.json'
//   }),
//   audience: process.env.AUTH0_AUDIENCE,
//   issuer: process.env.AUTH0_ISSUER,
//   algorithms: ['RS256']
// });

// app.use('/api', jwtCheck, routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));


