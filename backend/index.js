const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://66e937e3a69788c3f2ec6eb6--zippy-melba-aa5f46.netlify.app', // Allow Netlify domain
  methods: ['GET', 'POST'], // Allow specific methods
  credentials: true // Allow credentials (e.g., cookies)
}));

// Enable pre-flight requests for all routes
app.options('*', cors());

app.use(express.json());

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
