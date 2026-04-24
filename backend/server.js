const express  = require('express');
const cors     = require('cors');
const morgan   = require('morgan');
const helmet   = require('helmet');
const { connectDB } = require('./config/db');
require('dotenv').config();

const app = express();

// Security & middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(cors({ origin: process.env.FRONTEND_URL || '*', credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

// Routes
app.use('/api/profile',  require('./routes/profile'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/skills',   require('./routes/skills'));
app.use('/api/contact',  require('./routes/contact'));
app.use('/api/admin',    require('./routes/admin'));

// Health
app.get('/', (req, res) => res.json({ message: '🚀 Portfolio API', version: '1.0.0', status: 'OK' }));

// 404
app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({ success: false, message: err.message || 'Server Error' });
});

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
  } catch (err) {
    console.error('❌ MongoDB Error:', err.message);
    process.exit(1);
  }
}

startServer();
