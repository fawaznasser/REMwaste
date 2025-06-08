const { db, getAllSkips, getSkipsByLocation } = require('./database');

// Utility functions for database management
class DatabaseManager {
  
  // Add a new skip to the database
  static addSkip(skipData) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
        INSERT INTO skips (
          id, size, hire_period_days, transport_cost, per_tonne_cost,
          price_before_vat, vat, postcode, area, forbidden, created_at,
          updated_at, allowed_on_road, allows_heavy_waste
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      stmt.run([
        skipData.id,
        skipData.size,
        skipData.hire_period_days,
        skipData.transport_cost,
        skipData.per_tonne_cost,
        skipData.price_before_vat,
        skipData.vat,
        skipData.postcode,
        skipData.area,
        skipData.forbidden ? 1 : 0,
        skipData.created_at,
        skipData.updated_at,
        skipData.allowed_on_road ? 1 : 0,
        skipData.allows_heavy_waste ? 1 : 0
      ], function(err) {
        if (err) {
          reject(err);
        } else {
          stmt.finalize();
          console.log(`Added skip with ID: ${skipData.id}`);
          resolve(this.lastID);
        }
      });
    });
  }

  // Update a skip's price
  static updateSkipPrice(skipId, newPrice) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('UPDATE skips SET price_before_vat = ?, updated_at = ? WHERE id = ?');
      const updatedAt = new Date().toISOString();
      
      stmt.run([newPrice, updatedAt, skipId], function(err) {
        if (err) {
          reject(err);
        } else {
          stmt.finalize();
          console.log(`Updated skip ${skipId} price to £${newPrice}`);
          resolve(this.changes);
        }
      });
    });
  }

  // Delete a skip
  static deleteSkip(skipId) {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('DELETE FROM skips WHERE id = ?');
      
      stmt.run([skipId], function(err) {
        if (err) {
          reject(err);
        } else {
          stmt.finalize();
          console.log(`Deleted skip with ID: ${skipId}`);
          resolve(this.changes);
        }
      });
    });
  }

  // Get database statistics
  static getStats() {
    return new Promise((resolve, reject) => {
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
          reject(err);
        } else {
          resolve(rows[0]);
        }
      });
    });
  }

  // Search skips by size range
  static getSkipsBySize(minSize, maxSize) {
    return new Promise((resolve, reject) => {
      db.all(
        'SELECT * FROM skips WHERE size >= ? AND size <= ? ORDER BY size ASC',
        [minSize, maxSize],
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const skips = rows.map(row => ({
              ...row,
              forbidden: Boolean(row.forbidden),
              allowed_on_road: Boolean(row.allowed_on_road),
              allows_heavy_waste: Boolean(row.allows_heavy_waste)
            }));
            resolve(skips);
          }
        }
      );
    });
  }
}

// Example usage and testing
async function runTests() {
  try {
    console.log('=== Database Manager Tests ===\n');

    // Get statistics
    console.log('1. Database Statistics:');
    const stats = await DatabaseManager.getStats();
    console.log(`Total skips: ${stats.total_skips}`);
    console.log(`Average price: £${stats.avg_price.toFixed(2)}`);
    console.log(`Price range: £${stats.min_price} - £${stats.max_price}`);
    console.log(`Road legal skips: ${stats.road_legal_count}`);
    console.log(`Heavy waste allowed: ${stats.heavy_waste_count}\n`);

    // Get skips by size range
    console.log('2. Small skips (4-8 yards):');
    const smallSkips = await DatabaseManager.getSkipsBySize(4, 8);
    smallSkips.forEach(skip => {
      console.log(`  ${skip.size} yard skip - £${skip.price_before_vat}`);
    });

    console.log('\n3. Large skips (16+ yards):');
    const largeSkips = await DatabaseManager.getSkipsBySize(16, 50);
    largeSkips.forEach(skip => {
      console.log(`  ${skip.size} yard skip - £${skip.price_before_vat}`);
    });

    console.log('\n=== Tests completed successfully ===');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = DatabaseManager;
