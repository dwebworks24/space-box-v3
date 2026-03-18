import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { lenisInstance } from '@/hooks/useLenis';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset Lenis smooth scroll if active
    if (lenisInstance) {
      lenisInstance.scrollTo(0, { immediate: true });
    }
    
    // Also force native scroll reset
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);

  return null;
}
