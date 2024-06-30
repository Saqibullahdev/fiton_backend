const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const connectDB = require('./config/dbconfig');
const apiRouter = require('./routes/index.js');

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Use API routes
app.use('/api/v1', apiRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
