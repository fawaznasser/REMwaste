const express = require('express');
const cors = require('cors');
const { initializeDatabase, getAllSkips, getSkipsByLocation, db } = require('./database');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database on startup
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
  })
  .catch((err) => {
    console.error('Database initialization failed:', err);
  });

// Routes
app.get('/api/skips', async (req, res) => {
  try {
    const skips = await getAllSkips();
    res.json(skips);
  } catch (error) {
    console.error('Error fetching all skips:', error);
    res.status(500).json({ error: 'Failed to fetch skips' });
  }
});

app.get('/api/skips/by-location', async (req, res) => {
  try {
    const { postcode, area = '' } = req.query;
    
    if (!postcode) {
      return res.status(400).json({ error: 'Postcode is required' });
    }

    const skips = await getSkipsByLocation(postcode, area);
    res.json(skips);
  } catch (error) {
    console.error('Error fetching skips by location:', error);
    res.status(500).json({ error: 'Failed to fetch skips' });
  }
});

// Get database statistics
app.get('/api/stats', async (req, res) => {
  try {
    db.all(`
      SELECT 
        COUNT(*) as total_skips,
        AVG(price_before_vat) as avg_price,
        MIN(price_before_vat) as min_price,
        MAX(price_before_vat) as max_price,
        SUM(CASE WHEN allowed_on_road = 1 THEN 1 ELSE 0 END) as road_legal_count,
        SUM(CASE WHEN allows_heavy_waste = 1 THEN 1 ELSE 0 END) as heavy_waste_count
      FROM skips
    `, (err, rows) => {
      if (err) {
        console.error('Error fetching stats:', err);
        res.status(500).json({ error: 'Failed to fetch statistics' });
      } else {
        res.json(rows[0]);
      }
    });
  } catch (error) {
    console.error('Error in stats endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// Get skips by size range
app.get('/api/skips/by-size', async (req, res) => {
  try {
    const { min = 0, max = 100 } = req.query;
    
    db.all(
      'SELECT * FROM skips WHERE size >= ? AND size <= ? ORDER BY size ASC',
      [min, max],
      (err, rows) => {
        if (err) {
          console.error('Error fetching skips by size:', err);
          res.status(500).json({ error: 'Failed to fetch skips by size' });
        } else {
          const skips = rows.map(row => ({
            ...row,
            forbidden: Boolean(row.forbidden),
            allowed_on_road: Boolean(row.allowed_on_road),
            allows_heavy_waste: Boolean(row.allows_heavy_waste)
          }));
          res.json(skips);
        }
      }
    );
  } catch (error) {
    console.error('Error in size range endpoint:', error);
    res.status(500).json({ error: 'Failed to fetch skips by size' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Skip API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Skip API server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/skips - Get all skips`);
  console.log(`  GET /api/skips/by-location?postcode=NR32&area= - Get skips by location`);
  console.log(`  GET /api/stats - Get database statistics`);
  console.log(`  GET /api/skips/by-size?min=0&max=100 - Get skips by size range`);
  console.log(`  GET /api/health - Health check`);
});

module.exports = app;
