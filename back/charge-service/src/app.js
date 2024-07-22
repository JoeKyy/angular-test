require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const chargeRoutes = require('./routes/chargeRoutes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api', chargeRoutes);

module.exports = app;
