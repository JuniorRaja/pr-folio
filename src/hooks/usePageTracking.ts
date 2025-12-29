import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (isDevelopment) {
      console.log('📊 Page view (dev mode):', location.pathname + location.search);
      return;
    }

    if (window.gtag) {
      window.gtag('config', 'G-VPPFFE0HFZ', {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);
};