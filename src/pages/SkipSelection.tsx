import React, { useEffect, useState } from 'react';
import { fetchAllSkips } from '../api/skips';
import { Skip } from '../types/skip';
import styles from '../styles/SkipSelection.module.css';

const SkipSelection: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<string>('all');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('size');

  useEffect(() => {
    const loadSkips = async () => {
      try {
        console.log('Fetching skips from API...');
        const data = await fetchAllSkips();
        console.log('Received data:', data);
        setSkips(data);
      } catch (err) {
        console.error('Error loading skips:', err);
        setError('Failed to load skips');
      } finally {
        setLoading(false);
      }
    };

    loadSkips();
  }, []);

  const calculateTotalPrice = (skip: Skip) => {
    return Math.round(skip.price_before_vat * (1 + skip.vat / 100));
  };  const getHirePeriodText = (days: number) => {
    return `${days} day hire period`;
  };
  const getSkipDescription = (size: number) => {
    if (size <= 4) return 'Perfect for household cleanouts, garden waste, or small DIY projects. Fits in most driveways.';
    if (size <= 6) return 'Great for kitchen renovations, garage clearouts, or moderate garden landscaping projects.';
    if (size <= 8) return 'Ideal for bathroom/bedroom renovations, shed clearouts, or medium construction waste.';
    if (size <= 10) return 'Perfect for whole room renovations, large garden projects, or small extension work.';
    if (size <= 12) return 'Suitable for house clearances, roofing projects, or moderate commercial waste.';
    if (size <= 16) return 'Great for large renovations, construction projects, or commercial office clearouts.';
    if (size <= 20) return 'Perfect for major construction, large commercial projects, or industrial waste removal.';
    return 'Ideal for large-scale construction, major commercial developments, or industrial waste management.';
  };

  const getSkipCapacity = (size: number) => {
    const estimatedWeight = size * 0.15; // Rough estimate: 1 yard ≈ 150kg
    return `~${estimatedWeight.toFixed(1)} tonnes capacity`;
  };

  const getDeliveryTime = (size: number) => {
    if (size <= 6) return 'Same day delivery available';
    if (size <= 12) return 'Next day delivery';
    return '2-3 days delivery';
  };

  const getPermitCost = (size: number) => {
    if (size <= 8) return 'No permit needed';
    return 'Permit may be required (£15-25)';
  };

  const getEnvironmentalBenefit = (size: number) => {
    const recycleRate = Math.min(85 + (size * 2), 95); // Larger skips = better recycling rates
    return `${recycleRate}% recycling rate`;
  };

  const getWasteTypes = (size: number): string[] => {
    if (size <= 6) return ['Household waste', 'Garden waste', 'DIY materials'];
    if (size <= 12) return ['Construction waste', 'Renovation debris', 'Commercial waste'];
    return ['Heavy construction', 'Industrial waste', 'Large commercial'];
  };

  const getFilteredAndSortedSkips = () => {
    let filtered = [...skips];
    
    // Filter by price range
    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(skip => {
        const price = calculateTotalPrice(skip);
        return price >= min && (max ? price <= max : true);
      });
    }
    
    // Filter by size
    if (sizeFilter !== 'all') {
      const [minSize, maxSize] = sizeFilter.split('-').map(Number);
      filtered = filtered.filter(skip => 
        skip.size >= minSize && (maxSize ? skip.size <= maxSize : true)
      );
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return calculateTotalPrice(a) - calculateTotalPrice(b);
        case 'size':
          return a.size - b.size;
        case 'popularity':
          return b.size - a.size; // Larger skips are more "popular"
        default:
          return a.size - b.size;
      }
    });
    
    return filtered;
  };

  const getBestValueSkip = () => {
    if (skips.length === 0) return null;
    return skips.reduce((best, current) => {
      const bestRatio = best.size / calculateTotalPrice(best);
      const currentRatio = current.size / calculateTotalPrice(current);
      return currentRatio > bestRatio ? current : best;
    });
  };

  const handleSelectSkip = (skipId: number) => {
    setSelectedSkip(skipId);
  };

  const handleContinue = () => {
    if (selectedSkip) {
      const selected = skips.find(s => s.id === selectedSkip);
      console.log('Selected skip:', selected);
      // Here you would typically navigate to the next step
      alert(`Selected ${selected?.size} Yard Skip - £${calculateTotalPrice(selected!)}`);
    }
  };
  if (loading) return <div className={styles.loading}>Loading skips...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  // Debug: Log the data to console
  console.log('Skips data loaded:', skips.length, 'skips');
  return (
    <div className={styles.container}>
      {/* Company Header */}
      <div className={styles.companyHeader}>
        <div className={styles.companyInfo}>
          <h2 className={styles.companyName}>🗑️ REMWaste Skip Hire</h2>
          <p className={styles.companyTagline}>Professional Waste Management • Norfolk • Est. 2020</p>
        </div>
        <div className={styles.contactInfo}>
          <span className={styles.phone}>📞 01493 123456</span>
          <span className={styles.email}>✉️ bookings@remwaste.co.uk</span>
        </div>
      </div>

      {/* Progress Header */}      <div className={styles.progressHeader}>
        <div className={styles.progressStep}>
          <div className={styles.stepIcon}>📍</div>
          <span>Location</span>
        </div>
        <div className={styles.progressStep}>
          <div className={styles.stepIcon}>🗑️</div>
          <span>Waste Type</span>
        </div>
        <div className={`${styles.progressStep} ${styles.active}`}>
          <div className={styles.stepIcon}>📦</div>
          <span>Skip Size</span>
        </div>
        <div className={styles.progressStep}>
          <div className={styles.stepIcon}>📋</div>
          <span>Permit</span>
        </div>
        <div className={styles.progressStep}>
          <div className={styles.stepIcon}>📅</div>
          <span>Delivery</span>
        </div>
        <div className={styles.progressStep}>
          <div className={styles.stepIcon}>💳</div>
          <span>Payment</span>
        </div>
      </div>{/* Main Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>Professional Skip Hire Service</h1>
        <p className={styles.subtitle}>
          Choose from our range of skips for your waste management needs in Norfolk (NR32)
          {skips.length > 0 && ` • ${skips.length} sizes available • Same-day delivery available`}
        </p>

        {/* Service Highlights */}
        <div className={styles.serviceHighlights}>
          <h3>Why Choose REMWaste?</h3>
          <div className={styles.highlightGrid}>
            <div className={styles.highlight}>
              <span className={styles.icon}>🚀</span>
              <h4>Same Day Delivery</h4>
              <p>Fast, reliable service with same-day delivery available for most skip sizes</p>
            </div>
            <div className={styles.highlight}>
              <span className={styles.icon}>💰</span>
              <h4>No Hidden Costs</h4>
              <p>Transparent pricing with delivery, collection, and VAT all included</p>
            </div>
            <div className={styles.highlight}>
              <span className={styles.icon}>♻️</span>
              <h4>Eco-Friendly</h4>
              <p>Up to 95% recycling rate - we're committed to environmental responsibility</p>
            </div>
            <div className={styles.highlight}>
              <span className={styles.icon}>📋</span>
              <h4>Permit Assistance</h4>
              <p>We handle road permits and provide guidance on placement requirements</p>
            </div>
          </div>
        </div>

        {/* Advanced Filtering and Sorting */}
        <div className={styles.filterSection}>
          <div className={styles.filterControls}>
            <div className={styles.filterGroup}>
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.filterSelect}>
                <option value="size">Skip Size</option>
                <option value="price">Price (Low to High)</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>Price Range:</label>
              <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)} className={styles.filterSelect}>
                <option value="all">All Prices</option>
                <option value="0-200">Under £200</option>
                <option value="200-400">£200 - £400</option>
                <option value="400-600">£400 - £600</option>
                <option value="600-">Over £600</option>
              </select>
            </div>
            
            <div className={styles.filterGroup}>
              <label>Skip Size:</label>
              <select value={sizeFilter} onChange={(e) => setSizeFilter(e.target.value)} className={styles.filterSelect}>
                <option value="all">All Sizes</option>
                <option value="0-6">Small (2-6 yards)</option>
                <option value="6-12">Medium (6-12 yards)</option>
                <option value="12-">Large (12+ yards)</option>
              </select>
            </div>
          </div>
          
          {/* Best Value Highlight */}
          {getBestValueSkip() && (
            <div className={styles.bestValue}>
              <span className={styles.bestValueIcon}>⭐</span>
              <span>Best Value: {getBestValueSkip()!.size} Yard Skip at £{calculateTotalPrice(getBestValueSkip()!)}</span>
            </div>
          )}
          
          <div className={styles.resultsCount}>
            Showing {getFilteredAndSortedSkips().length} of {skips.length} available skips
          </div>
        </div>

        {/* Skip Cards */}        <div className={styles.skipsGrid}>
          {getFilteredAndSortedSkips().length === 0 ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: 'white', fontSize: '1.2rem'}}>
              {skips.length === 0 ? 'No skips available at the moment. Please try again later.' : 'No skips match your current filters. Try adjusting your search criteria.'}
            </div>
          ) : (
            getFilteredAndSortedSkips().map((skip) => (
            <div
              key={skip.id}
              className={`${styles.skipCard} ${selectedSkip === skip.id ? styles.selected : ''}`}
              onClick={() => handleSelectSkip(skip.id)}
            >              <div className={styles.skipImage}>
                <div className={styles.skipIcon}>
                  🗑️
                </div>
                <div className={styles.skipBadge}>
                  {skip.size} Yards
                </div>
              </div>                <div className={styles.skipInfo}>
                <h3 className={styles.skipTitle}>{skip.size} Yard Skip</h3>
                <p className={styles.skipCapacity}>{getSkipCapacity(skip.size)}</p>
                <p className={styles.skipDescription}>{getSkipDescription(skip.size)}</p>
                <p className={styles.hirePeriod}>✓ {getHirePeriodText(skip.hire_period_days)} included</p>
                
                <div className={styles.wasteTypes}>
                  <span className={styles.wasteTypesLabel}>Suitable for:</span>
                  {getWasteTypes(skip.size).map((type, index) => (
                    <span key={index} className={styles.wasteType}>{type}</span>
                  ))}
                </div>
                
                <div className={styles.priceSection}>
                  <span className={styles.priceLabel}>Total Price (Inc. VAT & Delivery)</span>
                  <span className={styles.price}>£{calculateTotalPrice(skip)}</span>
                  <span className={styles.priceBreakdown}>
                    (£{skip.price_before_vat} + £{Math.round(skip.price_before_vat * skip.vat / 100)} VAT)
                  </span>
                </div>                <div className={styles.features}>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>🚚</span>
                    Free Delivery & Collection
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>⏰</span>
                    {getDeliveryTime(skip.size)}
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>📋</span>
                    {getPermitCost(skip.size)}
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>♻️</span>
                    {getEnvironmentalBenefit(skip.size)}
                  </span>
                  {skip.allowed_on_road ? (
                    <span className={styles.feature}>
                      <span className={styles.featureIcon}>🛣️</span>
                      Can be placed on road
                    </span>
                  ) : (
                    <span className={styles.feature}>
                      <span className={styles.featureIcon}>🏠</span>
                      Private property only
                    </span>
                  )}
                  {skip.allows_heavy_waste && (
                    <span className={styles.feature}>
                      <span className={styles.featureIcon}>🏗️</span>
                      Heavy materials accepted
                    </span>
                  )}
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>📍</span>
                    Norfolk NR32 Area
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>♻️</span>
                    Environmentally responsible disposal
                  </span>
                </div>

                <button 
                  className={`${styles.selectButton} ${selectedSkip === skip.id ? styles.selectedButton : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSkip(skip.id);
                  }}
                >
                  {selectedSkip === skip.id ? 'Selected' : 'Select This Skip'}
                  {selectedSkip !== skip.id && <span className={styles.arrow}>→</span>}
                </button>              </div>
            </div>
          ))
          )}
        </div>

        {/* Pricing Calculator Widget */}
        <div className={styles.pricingCalculator}>
          <h3>💰 Quick Price Calculator</h3>
          <div className={styles.calculatorGrid}>
            <div className={styles.calculatorSection}>
              <h4>Your Project Details</h4>
              <div className={styles.projectTypes}>
                <div className={styles.projectType}>
                  <span className={styles.projectIcon}>🏠</span>
                  <div>
                    <strong>Home Renovation</strong>
                    <p>Kitchen, bathroom, or room renovation</p>
                    <span className={styles.recommendedSize}>Recommended: 6-8 yard skip</span>
                  </div>
                </div>
                <div className={styles.projectType}>
                  <span className={styles.projectIcon}>🌿</span>
                  <div>
                    <strong>Garden Clearance</strong>
                    <p>Garden waste, soil, and green materials</p>
                    <span className={styles.recommendedSize}>Recommended: 4-6 yard skip</span>
                  </div>
                </div>
                <div className={styles.projectType}>
                  <span className={styles.projectIcon}>🏗️</span>
                  <div>
                    <strong>Construction Work</strong>
                    <p>Building materials, concrete, bricks</p>
                    <span className={styles.recommendedSize}>Recommended: 12+ yard skip</span>
                  </div>
                </div>
                <div className={styles.projectType}>
                  <span className={styles.projectIcon}>📦</span>
                  <div>
                    <strong>House Clearance</strong>
                    <p>Furniture, household items, general waste</p>
                    <span className={styles.recommendedSize}>Recommended: 8-12 yard skip</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={styles.calculatorSection}>
              <h4>Cost Breakdown</h4>
              {selectedSkip && (
                <div className={styles.costBreakdown}>
                  <div className={styles.costItem}>
                    <span>Skip Hire ({skips.find(s => s.id === selectedSkip)?.size} Yard)</span>
                    <span>£{skips.find(s => s.id === selectedSkip)?.price_before_vat}</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>VAT ({skips.find(s => s.id === selectedSkip)?.vat}%)</span>
                    <span>£{Math.round(skips.find(s => s.id === selectedSkip)!.price_before_vat * skips.find(s => s.id === selectedSkip)!.vat / 100)}</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>Delivery & Collection</span>
                    <span className={styles.freeService}>FREE</span>
                  </div>
                  <div className={styles.costItem}>
                    <span>Permit (if needed)</span>
                    <span className={styles.permitCost}>£0 - £25</span>
                  </div>
                  <div className={styles.costTotal}>
                    <span>Total Cost</span>
                    <span>£{calculateTotalPrice(skips.find(s => s.id === selectedSkip)!)}</span>
                  </div>
                </div>
              )}
              {!selectedSkip && (
                <p className={styles.calculatorPrompt}>Select a skip above to see detailed pricing</p>
              )}
            </div>
          </div>
        </div>

        {/* Skip Cards */}        <div className={styles.skipsGrid}>
          {getFilteredAndSortedSkips().length === 0 ? (
            <div style={{gridColumn: '1 / -1', textAlign: 'center', color: 'white', fontSize: '1.2rem'}}>
              {skips.length === 0 ? 'No skips available at the moment. Please try again later.' : 'No skips match your current filters. Try adjusting your search criteria.'}
            </div>
          ) : (
            getFilteredAndSortedSkips().map((skip) => (
            <div
              key={skip.id}
              className={`${styles.skipCard} ${selectedSkip === skip.id ? styles.selected : ''}`}
              onClick={() => handleSelectSkip(skip.id)}
            >              <div className={styles.skipImage}>
                <div className={styles.skipIcon}>
                  🗑️
                </div>
                <div className={styles.skipBadge}>
                  {skip.size} Yards
                </div>
              </div>                <div className={styles.skipInfo}>
                <h3 className={styles.skipTitle}>{skip.size} Yard Skip</h3>
                <p className={styles.skipCapacity}>{getSkipCapacity(skip.size)}</p>
                <p className={styles.skipDescription}>{getSkipDescription(skip.size)}</p>
                <p className={styles.hirePeriod}>✓ {getHirePeriodText(skip.hire_period_days)} included</p>
                
                <div className={styles.wasteTypes}>
                  <span className={styles.wasteTypesLabel}>Suitable for:</span>
                  {getWasteTypes(skip.size).map((type, index) => (
                    <span key={index} className={styles.wasteType}>{type}</span>
                  ))}
                </div>
                
                <div className={styles.priceSection}>
                  <span className={styles.priceLabel}>Total Price (Inc. VAT & Delivery)</span>
                  <span className={styles.price}>£{calculateTotalPrice(skip)}</span>
                  <span className={styles.priceBreakdown}>
                    (£{skip.price_before_vat} + £{Math.round(skip.price_before_vat * skip.vat / 100)} VAT)
                  </span>
                </div>                <div className={styles.features}>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>🚚</span>
                    Free Delivery & Collection
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>⏰</span>
                    {getDeliveryTime(skip.size)}
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>📋</span>
                    {getPermitCost(skip.size)}
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>♻️</span>
                    {getEnvironmentalBenefit(skip.size)}
                  </span>
                  {skip.allowed_on_road ? (
                    <span className={styles.feature}>
                      <span className={styles.featureIcon}>🛣️</span>
                      Can be placed on road
                    </span>
                  ) : (
                    <span className={styles.feature}>
                      <span className={styles.featureIcon}>🏠</span>
                      Private property only
                    </span>
                  )}
                  {skip.allows_heavy_waste && (
                    <span className={styles.feature}>
                      <span className={styles.featureIcon}>🏗️</span>
                      Heavy materials accepted
                    </span>
                  )}
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>📍</span>
                    Norfolk NR32 Area
                  </span>
                  <span className={styles.feature}>
                    <span className={styles.featureIcon}>♻️</span>
                    Environmentally responsible disposal
                  </span>
                </div>

                <button 
                  className={`${styles.selectButton} ${selectedSkip === skip.id ? styles.selectedButton : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectSkip(skip.id);
                  }}
                >
                  {selectedSkip === skip.id ? 'Selected' : 'Select This Skip'}
                  {selectedSkip !== skip.id && <span className={styles.arrow}>→</span>}
                </button>              </div>
            </div>
          ))
          )}
        </div>
      </div>      {/* Bottom Navigation */}
      <div className={styles.bottomNav}>
        <div className={styles.selectedInfo}>
          {selectedSkip ? (
            <span>
              Selected: {skips.find(s => s.id === selectedSkip)?.size} Yard Skip - £{calculateTotalPrice(skips.find(s => s.id === selectedSkip)!)} 
              <span className={styles.hirePeriodSmall}> • {skips.find(s => s.id === selectedSkip)?.hire_period_days} day hire included</span>
            </span>
          ) : (
            <span className={styles.selectPrompt}>Please select a skip size to continue</span>
          )}
        </div>
        <div className={styles.navButtons}>
          <button className={styles.backButton}>← Modify Search</button>
          <button 
            className={`${styles.continueButton} ${!selectedSkip ? styles.disabled : ''}`}
            onClick={handleContinue}
            disabled={!selectedSkip}
          >
            Continue to Permit Check →
          </button>
        </div>
      </div>

      {/* Professional Footer */}
      <div className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h4>Service Areas</h4>
            <p>Norfolk NR32, Great Yarmouth, Lowestoft, Beccles, and surrounding areas</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Operating Hours</h4>
            <p>Mon-Fri: 7:00 AM - 6:00 PM<br/>Sat: 8:00 AM - 4:00 PM<br/>Emergency: 24/7</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Waste Accepted</h4>
            <p>Construction, Household, Garden, Commercial waste. Heavy materials welcome.</p>
          </div>
          <div className={styles.footerSection}>
            <h4>Certifications</h4>
            <p>✓ Environment Agency Registered<br/>✓ Fully Insured<br/>✓ GDPR Compliant</p>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 REMWaste Skip Hire. Licensed waste carrier. Registration: WRC/2025/NR32</p>
        </div>
      </div>
    </div>
  );
};

export default SkipSelection;
