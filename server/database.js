const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create or connect to the database
const dbPath = path.join(__dirname, 'skips.db');
const db = new sqlite3.Database(dbPath);

// Skip data from your JSON
const skipData = [
  {"id":17933,"size":4,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":278,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.813","allowed_on_road":true,"allows_heavy_waste":true},
  {"id":17934,"size":6,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":305,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:52.992","allowed_on_road":true,"allows_heavy_waste":true},
  {"id":17935,"size":8,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":375,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.171","allowed_on_road":true,"allows_heavy_waste":true},
  {"id":17936,"size":10,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":400,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.339","allowed_on_road":false,"allows_heavy_waste":false},
  {"id":17937,"size":12,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":439,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.516","allowed_on_road":false,"allows_heavy_waste":false},
  {"id":17938,"size":14,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":470,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.69","allowed_on_road":false,"allows_heavy_waste":false},
  {"id":17939,"size":16,"hire_period_days":14,"transport_cost":null,"per_tonne_cost":null,"price_before_vat":496,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:46.897146","updated_at":"2025-04-07T13:16:53.876","allowed_on_road":false,"allows_heavy_waste":false},
  {"id":15124,"size":20,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.434","allowed_on_road":false,"allows_heavy_waste":true},
  {"id":15125,"size":40,"hire_period_days":14,"transport_cost":248,"per_tonne_cost":248,"price_before_vat":992,"vat":20,"postcode":"NR32","area":"","forbidden":false,"created_at":"2025-04-03T13:51:40.344435","updated_at":"2025-04-07T13:16:52.603","allowed_on_road":false,"allows_heavy_waste":false}
];

// Initialize database
function initializeDatabase() {
  return new Promise((resolve, reject) => {
    // Create skips table
    db.run(`
      CREATE TABLE IF NOT EXISTS skips (
        id INTEGER PRIMARY KEY,
        size INTEGER NOT NULL,
        hire_period_days INTEGER NOT NULL,
        transport_cost REAL,
        per_tonne_cost REAL,
        price_before_vat REAL NOT NULL,
        vat INTEGER NOT NULL,
        postcode TEXT NOT NULL,
        area TEXT,
        forbidden BOOLEAN NOT NULL,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        allowed_on_road BOOLEAN NOT NULL,
        allows_heavy_waste BOOLEAN NOT NULL
      )
    `, (err) => {
      if (err) {
        reject(err);
        return;
      }

      // Clear existing data
      db.run('DELETE FROM skips', (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Insert skip data
        const stmt = db.prepare(`
          INSERT INTO skips (
            id, size, hire_period_days, transport_cost, per_tonne_cost,
            price_before_vat, vat, postcode, area, forbidden, created_at,
            updated_at, allowed_on_road, allows_heavy_waste
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `);

        let completed = 0;
        skipData.forEach((skip) => {
          stmt.run([
            skip.id,
            skip.size,
            skip.hire_period_days,
            skip.transport_cost,
            skip.per_tonne_cost,
            skip.price_before_vat,
            skip.vat,
            skip.postcode,
            skip.area,
            skip.forbidden ? 1 : 0,
            skip.created_at,
            skip.updated_at,
            skip.allowed_on_road ? 1 : 0,
            skip.allows_heavy_waste ? 1 : 0
          ], (err) => {
            if (err) {
              reject(err);
              return;
            }
            completed++;
            if (completed === skipData.length) {
              stmt.finalize();
              console.log(`Inserted ${skipData.length} skips into database`);
              resolve();
            }
          });
        });
      });
    });
  });
}

// Get all skips
function getAllSkips() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM skips ORDER BY size ASC', (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Convert boolean fields back from integers
      const skips = rows.map(row => ({
        ...row,
        forbidden: Boolean(row.forbidden),
        allowed_on_road: Boolean(row.allowed_on_road),
        allows_heavy_waste: Boolean(row.allows_heavy_waste)
      }));
      
      resolve(skips);
    });
  });
}

// Get skips by postcode and area
function getSkipsByLocation(postcode, area = '') {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM skips WHERE postcode = ? AND area = ? ORDER BY size ASC';
    db.all(query, [postcode, area], (err, rows) => {
      if (err) {
        reject(err);
        return;
      }
      
      // Convert boolean fields back from integers
      const skips = rows.map(row => ({
        ...row,
        forbidden: Boolean(row.forbidden),
        allowed_on_road: Boolean(row.allowed_on_road),
        allows_heavy_waste: Boolean(row.allows_heavy_waste)
      }));
      
      resolve(skips);
    });
  });
}

module.exports = {
  db,
  initializeDatabase,
  getAllSkips,
  getSkipsByLocation
};
