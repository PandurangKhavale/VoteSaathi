import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

/**
 * Initialize Google Analytics
 * Set VITE_GA_MEASUREMENT_ID environment variable with your GA4 measurement ID
 */
export const initializeGA = () => {
  if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.initialize(GA_MEASUREMENT_ID);
  } else {
    console.warn(
      'Google Analytics not configured. Set VITE_GA_MEASUREMENT_ID environment variable.'
    );
  }
};

/**
 * Track page views
 * @param {string} path - The page path to track
 */
export const trackPageView = (path) => {
  ReactGA.send({ hitType: 'pageview', page: path });
};

/**
 * Track custom events
 * @param {string} category - Event category (e.g., 'Quiz')
 * @param {string} action - Event action (e.g., 'QuizCompleted')
 * @param {string} label - Event label (optional)
 * @param {number} value - Event value (optional)
 */
export const trackEvent = (category, action, label, value) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

/**
 * Track user interactions with forms
 * @param {string} formName - Name of the form
 * @param {string} action - Action performed (e.g., 'Submit', 'Error')
 */
export const trackFormEvent = (formName, action) => {
  trackEvent('Form', action, formName);
};

/**
 * Track feature usage
 * @param {string} featureName - Name of the feature
 */
export const trackFeatureUsage = (featureName) => {
  trackEvent('Feature', 'Used', featureName);
};

/**
 * Track quiz completion
 * @param {number} score - Quiz score
 * @param {number} totalQuestions - Total questions in quiz
 */
export const trackQuizCompletion = (score, totalQuestions) => {
  trackEvent('Quiz', 'Completed', `${score}/${totalQuestions}`, score);
};

/**
 * Track voting method selection
 * @param {string} method - Voting method selected
 */
export const trackVotingMethodSelection = (method) => {
  trackEvent('Voting', 'MethodSelected', method);
};

/**
 * Track chat interactions
 * @param {string} messageType - Type of chat message
 * @param {string} topic - Topic of conversation
 */
export const trackChatInteraction = (messageType, topic) => {
  trackEvent('Chat', messageType, topic);
};

/**
 * Track user engagement metrics
 * @param {string} action - Engagement action
 * @param {string} label - Additional context
 */
export const trackEngagement = (action, label) => {
  trackEvent('Engagement', action, label);
};

/**
 * Track user retention
 * @param {string} eventType - Type of retention event
 * @param {number} value - Value associated with event
 */
export const trackRetention = (eventType, value) => {
  trackEvent('Retention', eventType, 'user_journey', value);
};

/**
 * Track conversion events
 * @param {string} conversionType - Type of conversion
 * @param {string} label - Conversion details
 */
export const trackConversion = (conversionType, label) => {
  trackEvent('Conversion', conversionType, label);
};

/**
 * Set user properties for advanced analytics
 * @param {Object} properties - User properties object
 */
export const setUserProperties = (properties) => {
  if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.set(properties);
  }
};

/**
 * Track scroll depth
 * @param {number} depth - Scroll depth percentage
 */
export const trackScrollDepth = (depth) => {
  trackEvent('UserJourney', 'ScrollDepth', `${depth}%`, depth);
};

/**
 * Track custom parameters
 * @param {Object} params - Parameters object
 */
export const trackCustomParams = (params) => {
  if (GA_MEASUREMENT_ID !== 'G-XXXXXXXXXX') {
    ReactGA.send(params);
  }
};

export default {
  initializeGA,
  trackPageView,
  trackEvent,
  trackFormEvent,
  trackFeatureUsage,
  trackQuizCompletion,
  trackVotingMethodSelection,
  trackChatInteraction,
  trackEngagement,
  trackRetention,
  trackConversion,
  setUserProperties,
  trackCustomParams,
  trackScrollDepth,
};
