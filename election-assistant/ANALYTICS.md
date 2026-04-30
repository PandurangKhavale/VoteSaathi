# Google Analytics Integration Guide

This guide explains how to set up and use Google Analytics (GA4) with VoteSaathi.

## Setup Instructions

### 1. Create a Google Analytics Account

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Click "Start measuring"
4. Set up a new property:
   - **Property name**: "VoteSaathi"
   - **Reporting timezone**: Select your timezone
   - **Currency**: USD

### 2. Create a Web Data Stream

1. In Admin > Property > Data Streams, click "Add stream"
2. Select "Web"
3. Enter your website URL and stream name
4. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### 3. Configure Environment Variables

1. Create or update `.env` file in your project root:
   ```
   VITE_GA_MEASUREMENT_ID=G-YOUR_MEASUREMENT_ID
   ```

2. Replace `YOUR_MEASUREMENT_ID` with your actual Measurement ID

### 4. No Additional Setup Required

The analytics service is already integrated in the app! The `App.jsx` automatically:
- Initializes Google Analytics on app start
- Tracks page views on route changes
- Sets up event tracking capabilities

## Using Analytics in Your Code

### Automatic Tracking

Page views are tracked automatically when users navigate:
```javascript
// Already working - no code needed!
// Navigating to /quiz automatically tracks that page view
```

### Tracking Custom Events

Import and use the analytics service in any component:

```javascript
import { trackEvent, trackFeatureUsage, trackFormEvent } from '../utils/analyticsService';

// Track a custom event
trackEvent('Category', 'Action', 'Label', value);

// Track feature usage
trackFeatureUsage('VoterRegistration');

// Track form submission
trackFormEvent('RegistrationForm', 'Submit');
```

### Available Tracking Functions

#### General Event Tracking
```javascript
trackEvent(category, action, label, value);

// Example
trackEvent('Quiz', 'QuestionAnswered', 'Question1', 1);
```

**Parameters:**
- `category` (string): Event category - what type of thing is being tracked
- `action` (string): Event action - what happened
- `label` (string): Event label - optional details
- `value` (number): Event value - optional numeric value

#### Feature Usage
```javascript
trackFeatureUsage(featureName);

// Example
trackFeatureUsage('InteractiveGuide');
```

#### Form Events
```javascript
trackFormEvent(formName, action);

// Examples
trackFormEvent('RegistrationForm', 'Submit');
trackFormEvent('SearchBar', 'Query');
```

#### Quiz Completion
```javascript
trackQuizCompletion(score, totalQuestions);

// Example
trackQuizCompletion(85, 100);
```

#### Voting Method Selection
```javascript
trackVotingMethodSelection(method);

// Example
trackVotingMethodSelection('InPersonEarlyVoting');
```

## Integration Examples

### In Components

```javascript
import { trackEvent, trackFeatureUsage } from '../utils/analyticsService';

export default function VoterRegistration() {
  const handleSubmit = (formData) => {
    try {
      // Submit form logic
      trackFormEvent('RegistrationForm', 'Submit');
      trackFeatureUsage('VoterRegistration');
    } catch (error) {
      trackFormEvent('RegistrationForm', 'Error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}
```

### In Quiz Component

```javascript
import { trackQuizCompletion } from '../utils/analyticsService';

export default function Quiz() {
  const handleQuizComplete = (score, total) => {
    trackQuizCompletion(score, total);
  };

  return (
    // Quiz JSX
  );
}
```

### Page View Tracking

Page views are tracked automatically via the `useAnalyticsTracking` hook in `App.jsx`.

## Viewing Analytics Data

### In Google Analytics Dashboard

1. Go to [Google Analytics](https://analytics.google.com/)
2. Select your VoteSaathi property
3. View data in:
   - **Real-time**: Live user activity
   - **Events**: Custom events you've tracked
   - **Pages**: Page views and user engagement
   - **Demographics**: User information

### Key Metrics to Monitor

1. **Page Views**: Track popular pages
2. **Event Count**: Monitor feature usage
3. **User Engagement**: Time on page, bounce rate
4. **Conversion Funnel**: Registration → Quiz → Voting Method selection

## Best Practices

### Do's ✓
- Track meaningful user actions only
- Use consistent naming conventions for categories/actions
- Include descriptive labels
- Track conversion funnels
- Monitor quiz completion rates
- Track feature adoption

### Don'ts ✗
- Don't track personal information
- Don't overload with unnecessary events
- Don't track every single interaction (be selective)
- Don't change tracking structure frequently
- Don't track sensitive data

## Event Naming Convention

For consistency, use this naming pattern:

**Format:** `[FeatureName][Action]`

**Examples:**
- `VoterRegistrationSubmit`
- `QuizCompleted`
- `VotingMethodSelected`
- `GuideViewed`

## Common Analytics Scenarios

### Tracking Quiz Completion
```javascript
const handleQuizEnd = (score, total) => {
  trackQuizCompletion(score, total);
  // Also track performance level
  const level = score > 80 ? 'Expert' : score > 60 ? 'Intermediate' : 'Beginner';
  trackEvent('Quiz', 'CompletionLevel', level);
};
```

### Tracking Feature Discovery
```javascript
const handleGuideView = (guideName) => {
  trackFeatureUsage(guideName);
  trackEvent('Guide', 'Viewed', guideName);
};
```

### Tracking Navigation Paths
```javascript
const handleNavigation = (page) => {
  // Page view already tracked automatically
  // Add additional context
  trackEvent('Navigation', 'Clicked', page);
};
```

## Debugging

### Enable GA Debug View
In your browser console:
```javascript
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('config', 'G-XXXXXXXXXX', { 'debug_mode': true });
```

### Check Event Firing
1. Open Chrome DevTools
2. Go to Network tab
3. Filter for "google-analytics" or "collect"
4. Look for POST requests when events fire

### Verify Setup
```javascript
import { trackEvent } from '../utils/analyticsService';

// Test in browser console
trackEvent('TestCategory', 'TestAction', 'TestLabel', 1);

// Should appear in GA Real-time view within seconds
```

## Troubleshooting

### No data in Google Analytics
1. Verify `VITE_GA_MEASUREMENT_ID` is set correctly
2. Check browser console for errors
3. Wait 24-48 hours for initial data processing
4. Enable GA Debug View to verify events are firing

### Events not showing up
1. Check event naming - GA has specific requirements
2. Verify measurement ID is correct
3. Ensure `initializeGA()` is called on app startup
4. Check for JavaScript errors in console

### Performance Issues
1. GA requests are asynchronous and shouldn't impact performance
2. If experiencing slowness, verify network tab
3. Consider batching events to reduce network calls

## Advanced Configuration

### Custom User ID (Optional)
```javascript
import ReactGA from 'react-ga4';

// Set user ID for tracking across sessions
ReactGA.set({ 'user_id': 'user123' });
```

### User Properties
```javascript
ReactGA.set({
  'user_type': 'Registered',
  'registration_source': 'Email',
});
```

## Privacy Considerations

- Don't track personally identifiable information (PII)
- Don't store sensitive data in event properties
- Respect user privacy settings
- Consider implementing consent management
- Check your privacy policy includes GA disclosure

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics)
- [React GA4 Library](https://github.com/PriceRunner/react-ga4)
- [Event Naming Best Practices](https://support.google.com/analytics/answer/10085872)
- [GA4 Event Builder](https://analytics.google.com/analytics/web/)
