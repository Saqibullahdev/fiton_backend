const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbconfig');
const apiRouter = require('./routes/index.js');
const cors=require('cors');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
// Use API routes
app.use('/api/v1', apiRouter);
app.get('/', (req, res) => {
  res.send('Welcome to the API');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
