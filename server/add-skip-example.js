const DatabaseManager = require('./db-manager');

// Example: Adding a new skip to the database
async function addNewSkipExample() {
  const newSkip = {
    id: 99999,
    size: 3,
    hire_period_days: 7,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 199,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    allowed_on_road: true,
    allows_heavy_waste: false
  };

  try {
    console.log('Adding new 3-yard skip...');
    await DatabaseManager.addSkip(newSkip);
    
    console.log('Updated statistics:');
    const stats = await DatabaseManager.getStats();
    console.log(`Total skips: ${stats.total_skips}`);
    console.log(`New average price: £${stats.avg_price.toFixed(2)}`);
    
    // Clean up - remove the test skip
    console.log('Cleaning up test data...');
    await DatabaseManager.deleteSkip(99999);
    console.log('Test completed successfully!');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

// Run the example
addNewSkipExample();
