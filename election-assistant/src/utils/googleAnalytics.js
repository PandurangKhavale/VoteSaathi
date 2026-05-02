import ReactGA from 'react-ga4';

// Initialize Google Analytics
export const initializeGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId) {
    ReactGA.initialize(measurementId);
  } else {
    console.warn('Google Analytics Measurement ID not configured. Set VITE_GA_MEASUREMENT_ID in your .env file.');
  }
};

// Track page views
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

// Track custom events
export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

// Specific tracking events for VoteSaathi
export const trackVotingMethodSelect = (method) => {
  trackEvent('voting_method', 'select', method);
};

export const trackCandidateView = (candidateName) => {
  trackEvent('candidate', 'view', candidateName);
};

export const trackQuizStart = () => {
  trackEvent('quiz', 'start', 'user_initiated');
};

export const trackQuizComplete = (score) => {
  trackEvent('quiz', 'complete', `score_${Math.round(score)}`);
};

export const trackRegistrationClick = () => {
  trackEvent('registration', 'link_click', 'voter_registration');
};

export const trackChatMessage = (type) => {
  trackEvent('chat', 'message_sent', type);
};

export const trackTimelineView = () => {
  trackEvent('timeline', 'view', 'election_timeline');
};

export const trackThemeToggle = (theme) => {
  trackEvent('settings', 'theme_toggle', theme);
};

// Enhanced tracking functions
export const trackUserJourney = (step, action) => {
  trackEvent('user_journey', action, step);
};

export const trackFeatureDiscovery = (featureName) => {
  trackEvent('feature_discovery', 'viewed', featureName);
};

export const trackHelpCenterUsage = (helpTopic) => {
  trackEvent('help_center', 'accessed', helpTopic);
};

export const trackResourceDownload = (resourceName) => {
  trackEvent('resources', 'downloaded', resourceName);
};

export const trackExternalLinkClick = (linkName) => {
  trackEvent('external_links', 'clicked', linkName);
};

export const trackError = (errorType, errorMessage) => {
  trackEvent('error', errorType, errorMessage);
};

export const trackPerformanceMetric = (metricName, value) => {
  trackEvent('performance', metricName, 'load_time', value);
};

// Set user properties
export const setUserProperties = (properties) => {
  ReactGA.set(properties);
};

// Track custom dimensions
export const trackCustomDimension = (dimension, value) => {
  ReactGA.send({
    dimension1: dimension,
    metric1: value
  });
};

// Enhanced initialization with configuration
export const initializeGAWithConfig = (config = {}) => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  if (measurementId) {
    ReactGA.initialize(measurementId, {
      ...config,
      debug: import.meta.env.DEV || false
    });
  } else {
    console.warn('Google Analytics Measurement ID not configured. Set VITE_GA_MEASUREMENT_ID in your .env file.');
  }
};
