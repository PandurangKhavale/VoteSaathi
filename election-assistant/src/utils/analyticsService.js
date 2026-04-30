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

export default {
  initializeGA,
  trackPageView,
  trackEvent,
  trackFormEvent,
  trackFeatureUsage,
  trackQuizCompletion,
  trackVotingMethodSelection,
};
