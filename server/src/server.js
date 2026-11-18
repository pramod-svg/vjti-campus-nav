require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const CampusPath = require('./models/CampusPath');
const dijkstraService = require('./services/dijkstra.service');

// Import Routes
const authRoutes = require('./routes/auth.routes');
const locationRoutes = require('./routes/locations.routes');
const pathRoutes = require('./routes/paths.routes');
const navigationRoutes = require('./routes/navigation.routes');
const favoritesRoutes = require('./routes/favorites.routes');
const analyticsRoutes = require('./routes/analytics.routes');

const app = express();

// Middleware
const allowedOrigins = [
  process.env.CLIENT_URL,
  'http://localhost:5173',
  'http://localhost:4173',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    // Allow any Railway / Vercel / Netlify domain or whitelisted origin
    if (
      allowedOrigins.includes(origin) ||
      /\.railway\.app$/.test(origin) ||
      /\.vercel\.app$/.test(origin) ||
      /\.netlify\.app$/.test(origin)
    ) {
      return callback(null, true);
    }
    return callback(null, true); // open CORS for now; tighten in production
  },
  credentials: true,
}));
app.use(express.json());
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    system: 'CampusVigation API',
    campus: 'VJTI Matunga, Mumbai',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/paths', pathRoutes);
app.use('/api/navigation', navigationRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/analytics', analyticsRoutes);

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Cannot ${req.method} ${req.url}` });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
});

const memoryStore = require('./services/store.service');

const PORT = process.env.PORT || 5000;

// Connect DB and Start Server
connectDB().then(async () => {
  try {
    if (memoryStore.isMongoConnected()) {
      const paths = await CampusPath.find();
      if (paths.length > 0) {
        dijkstraService.loadPaths(paths);
        console.log(`Loaded ${paths.length} campus walkable paths from MongoDB into Dijkstra graph engine.`);
      } else {
        dijkstraService.loadPaths(memoryStore.getPaths());
        console.log(`Loaded ${memoryStore.getPaths().length} campus paths into Dijkstra graph engine.`);
      }
    } else {
      dijkstraService.loadPaths(memoryStore.getPaths());
      console.log(`[Resilient Offline Mode] Loaded ${memoryStore.getPaths().length} campus paths into Dijkstra graph engine.`);
    }
  } catch (err) {
    dijkstraService.loadPaths(memoryStore.getPaths());
    console.warn('Routing engine initialized with preloaded fallback campus paths:', err.message);
  }

  const server = app.listen(PORT, () => {
    console.log(`CampusVigation Server running on http://localhost:${PORT}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n⚠️  Port ${PORT} is currently in use.`);
      console.error(`   To free it up on Windows PowerShell, run:`);
      console.error(`   Stop-Process -Id (Get-NetTCPConnection -LocalPort ${PORT}).OwningProcess -Force\n`);
    } else {
      console.error('Server error:', err.message);
    }
  });
});
