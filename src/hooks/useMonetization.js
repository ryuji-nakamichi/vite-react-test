import { useState, useEffect } from 'react';

export function useMonetization() {
  const [isMonetized, setIsMonetized] = useState(() =>
    localStorage.getItem('golden_mode_active') === 'true'
  );

  const [totalReceived, setTotalReceived] = useState(() => {
    const saved = localStorage.getItem('war_funds_total');
    return saved ? parseFloat(saved) : 0;
  });

  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'golden_mode_active') {
        setIsMonetized(e.newValue === 'true');
      }
      if (e.key === 'war_funds_total') {
        setTotalReceived(parseFloat(e.newValue) || 0);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return { isMonetized, totalReceived, currency: 'POL' };
}
