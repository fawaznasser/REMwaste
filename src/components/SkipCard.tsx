import React from 'react';
import { Skip } from '../types/skip';
import styles from '../styles/SkipCard.module.css';

interface SkipCardProps {
  skip: Skip;
}

const SkipCard: React.FC<SkipCardProps> = ({ skip }) => {
  const calculateTotalPrice = () => {
    return (skip.price_before_vat * (1 + skip.vat / 100)).toFixed(2);
  };

  return (
    <div className={styles.skipCard}>
      <h3>{skip.size} Yard Skip</h3>
      <p>Postcode: {skip.postcode}{skip.area && ` - ${skip.area}`}</p>
      <p>Hire Period: {skip.hire_period_days} days</p>
      <p>Price (exc VAT): £{skip.price_before_vat}</p>
      <p>VAT: {skip.vat}%</p>
      <p className={styles.totalPrice}>Total Price: £{calculateTotalPrice()}</p>
      {skip.transport_cost && <p>Transport Cost: £{skip.transport_cost}</p>}
      {skip.per_tonne_cost && <p>Per Tonne: £{skip.per_tonne_cost}</p>}
      <div className={styles.skipFeatures}>
        <span className={skip.allowed_on_road ? styles.featureYes : styles.featureNo}>
          Road Legal: {skip.allowed_on_road ? '✓' : '✗'}
        </span>
        <span className={skip.allows_heavy_waste ? styles.featureYes : styles.featureNo}>
          Heavy Waste: {skip.allows_heavy_waste ? '✓' : '✗'}
        </span>
      </div>
    </div>
  );
};

export default SkipCard;