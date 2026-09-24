const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
const dns = require('dns');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const videoRoutes = require('./routes/videoRoutes');
const authRoutes = require('./routes/authRoutes');
const settingsRoutes = require('./routes/settingsRoutes');


dns.setDefaultResultOrder('ipv4first');
dns.setServers(['8.8.8.8', '8.8.4.4']);

connectDB();

const app = express();

app.use(cors());

// ⚡ Payload limits 100mb aayi kootuk
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// ⚡ Product API Endpoints
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', uploadRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);


app.get('/', (req, res) => {
  res.send('Martvexa Backend API is running...');
});

// Global JSON error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

// ⚡ Server variable-il app.listen assign cheyyുക
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ⚡ Server timeout 5 min (300000ms) aayi set cheyyunnu
server.timeout = 300000;
server.keepAliveTimeout = 300000;