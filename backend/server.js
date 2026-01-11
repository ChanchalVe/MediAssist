const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

const app = express();

app.use(cors());
app.use(express.json());

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'MediAssist backend running' });
});

// mount routes
app.use('/api', authRoutes);
app.use('/api', profileRoutes);

// TODO: replace with your MongoDB URI
mongoose
  mongoose
  .connect('mongodb://127.0.0.1:27017/mediassist')

  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server listening on port 5000'));
  })
  .catch((err) => console.error('DB error:', err));
