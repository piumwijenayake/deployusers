const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Manually handling CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://66e977939aca25160c965b8b--keen-hamster-d5813b.netlify.app'); // Exact URL without trailing slash
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true'); // Optional, if you're using cookies or authentication

  // Preflight request handling
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  
  next();
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.error(err));

// Routes
const userRoutes = require('./routes/useRoutes');
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
