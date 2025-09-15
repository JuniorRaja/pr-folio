import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Navigate to specific div with hash
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    } else {
      // Navigate to new route - scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);
};