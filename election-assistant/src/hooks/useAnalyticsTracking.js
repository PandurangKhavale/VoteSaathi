import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analyticsService';

/**
 * Hook to automatically track page views on route changes
 * Add this hook to your App component for automatic page tracking
 */
export const useAnalyticsTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackPageView(location.pathname);
  }, [location]);
};

export default useAnalyticsTracking;
