const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const itemRoutes = require('./routes/route');

const app = express();
const PORT = 4000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
const MONGODB_URI = 'mongodb+srv://dhana:dhana@1702@cluster0.ucuyxwd.mongodb.net/'; // Change the URL as per your MongoDB setup
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Use item routes
app.use('/itemsroute', itemRoutes);

app.get('/', (req, res) => {
  res.send('Welcome......!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
