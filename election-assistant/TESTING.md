# Testing Guide - VoteSaathi

This guide explains the testing framework setup and how to write and run tests for VoteSaathi components.

## Testing Framework Setup

### Installed Dependencies
- **Vitest**: Modern unit test framework built on Vite
- **React Testing Library**: For testing React components
- **jsdom**: DOM implementation for testing
- **@testing-library/jest-dom**: Custom matchers for asserting on DOM

### Configuration Files
- `vitest.config.js`: Main Vitest configuration
- `src/test/setup.js`: Test setup with polyfills and mocks

## Running Tests

### Commands
```bash
# Run tests in watch mode
npm run test

# Run tests with UI dashboard
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## Test Structure

All tests are located in `src/test/` directory with naming convention: `ComponentName.test.jsx`

### Example Test File Structure
```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('ComponentName', () => {
  it('should render correctly', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## Writing Tests

### Basic Test Pattern
```javascript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from '../components/Component';

describe('Component', () => {
  it('renders the component', () => {
    render(<Component />);
    // Assert expectations
  });
});
```

### Testing with Providers
Many components require AppContext, ThemeContext, and BrowserRouter:

```javascript
function renderWithProviders(component) {
  return render(
    <BrowserRouter>
      <ThemeProvider>
        <AppProvider>
          {component}
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

describe('ComponentWithContext', () => {
  it('works with providers', () => {
    renderWithProviders(<ComponentWithContext />);
    // Assertions
  });
});
```

## Common Test Patterns

### Testing DOM Elements
```javascript
// Find by role (recommended)
const button = screen.getByRole('button', { name: /click me/i });

// Find by text
const heading = screen.getByText(/Welcome/i);

// Find by label
const input = screen.getByLabelText(/username/i);

// Query variants
const maybeElement = screen.queryByText('optional text');
const allButtons = screen.getAllByRole('button');
```

### Testing User Interactions
```javascript
import userEvent from '@testing-library/user-event';

it('handles button click', async () => {
  const user = userEvent.setup();
  render(<Component />);
  
  const button = screen.getByRole('button');
  await user.click(button);
  
  expect(screen.getByText('Clicked!')).toBeInTheDocument();
});
```

### Testing Accessibility
```javascript
it('has proper accessibility attributes', () => {
  render(<Component />);
  
  const nav = screen.getByRole('navigation', { name: /main navigation/i });
  expect(nav).toBeInTheDocument();
  
  const links = screen.getAllByRole('link');
  links.forEach(link => {
    expect(link).toHaveAccessibleName();
  });
});
```

### Testing Async Operations
```javascript
import { waitFor } from '@testing-library/react';

it('loads data asynchronously', async () => {
  render(<Component />);
  
  // Wait for element to appear
  const element = await screen.findByText('Loaded!');
  expect(element).toBeInTheDocument();
});
```

## Current Test Coverage

### Navigation Tests (`Navigation.test.jsx`)
- ✓ Renders VoteSaathi logo
- ✓ Renders all navigation links
- ✓ Has proper navigation semantics
- ✓ Home link has correct href

### Home Tests (`Home.test.jsx`)
- ✓ Renders the home page
- ✓ Displays hero section
- ✓ Renders statistics cards
- ✓ Has theme toggle in the component

### ChatWidget Tests (`ChatWidget.test.jsx`)
- ✓ Renders the chat widget
- ✓ Has proper aria labels for interactive elements
- ✓ Maintains chat history structure

## Adding New Tests

### Step-by-Step Guide

1. **Create test file** in `src/test/ComponentName.test.jsx`

2. **Import required dependencies**:
   ```javascript
   import { describe, it, expect } from 'vitest';
   import { render, screen } from '@testing-library/react';
   import Component from '../components/Component';
   ```

3. **Set up test suite**:
   ```javascript
   describe('Component', () => {
     // Tests go here
   });
   ```

4. **Write individual tests**:
   ```javascript
   it('should do something', () => {
     render(<Component />);
     // Assertions
   });
   ```

## Best Practices

### ✓ Do's
- Test user behavior, not implementation
- Use semantic queries (getByRole, getByLabelText)
- Test accessibility requirements
- Use descriptive test names
- Keep tests focused and isolated
- Mock external dependencies

### ✗ Don'ts
- Don't test implementation details
- Don't use querySelector for component tests
- Don't create massive test files
- Don't skip accessibility tests
- Don't hardcode timeouts
- Don't test third-party libraries

## Mock Data and Fixtures

### Creating Mock Data
```javascript
export const mockMessage = {
  id: 1,
  sender: 'bot',
  text: 'Hello, how can I help?'
};

export const mockMessages = [
  mockMessage,
  {
    id: 2,
    sender: 'user',
    text: 'I need help with voting',
  }
];
```

## Coverage Goals

### Current Status
- Navigation: Core paths covered
- Home: Main sections verified
- ChatWidget: Base functionality tested

### Target
- Achieve 80%+ code coverage
- 100% coverage for critical paths
- All accessibility features tested

## Continuous Integration

Tests will run automatically in CI/CD pipeline. Make sure to:
1. Run tests locally before pushing
2. Keep test suite green
3. Add tests for new features
4. Update tests for modified components

## Troubleshooting

### Common Issues

**Issue**: `ReferenceError: IntersectionObserver is not defined`
- **Solution**: Already handled in `src/test/setup.js`

**Issue**: `React Router error`
- **Solution**: Wrap components in `<BrowserRouter>`

**Issue**: `Context is undefined`
- **Solution**: Use `renderWithProviders` helper

**Issue**: Tests timeout
- **Solution**: Check for missing `async`/`await` or increase timeout

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library Docs](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
