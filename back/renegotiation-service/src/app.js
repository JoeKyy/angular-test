require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const renegotiationRoutes = require('./routes/renegotiationRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', renegotiationRoutes);

module.exports = app;
