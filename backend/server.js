// backend/server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to Database
mongoose.connect('mongodb://localhost:27017/techgear')
  .then(() => console.log('Developer B connected to MongoDB'))
  .catch(err => console.log(err));

// Developer B's Routes
app.use('/api/inventory', require('./routes/inventory'));

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));