const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

/// Use the CORS middleware properly
app.use(cors(
  {
      origin: ["https://deployusers-6rec.vercel.app"],
      methods: ["POST", "GET"],
      credentials: true
  }
));

// Middleware for JSON
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
