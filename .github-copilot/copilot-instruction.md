# Copilot Instruction for React App Development

## General Code Standards

### 1. Variable Naming

- Use `camelCase` for variable and function names.
- Use `PascalCase` for React component names.
- Constants should be written in `UPPER_SNAKE_CASE`.

### 2. File and Folder Structure

- Group related components, styles, and assets in the same folder when possible.
- Use `PascalCase` for component file names (e.g., `Navbar.jsx`).
- Use `kebab-case` for CSS file names (e.g., `navbar.css`).

### 3. React & JSX Conventions

- Use functional components with arrow functions.
- Always use `useState` and `useEffect` hooks for state and side effects.
- Destructure props in functional components.
- Use `propTypes` for type-checking props.
- Avoid inline styles; use CSS or styled-components instead.
- Use self-closing tags for components and elements without children (e.g., `<img />`, `<input />`).

### 4. Code Formatting

- Indent with 4 spaces.
- Use single quotes for strings.
- Add a blank line between different sections of code (e.g., imports, hooks, return statement).
- Keep lines under 120 characters when possible.

### 5. Imports

- Use absolute imports for modules within the `src` directory.
- Group imports by type: external libraries, internal components, styles, etc.

Example:

```jsx
import React from "react";
import { Link } from "react-router-dom";

import Navbar from "./components/Navbar";
import "./App.css";
```

### 6. Error Handling

- Use `try-catch` blocks for async operations.
- Display user-friendly error messages in the UI.

### 7. Testing

- Write unit tests for components and utility functions.
- Use `jest` and `react-testing-library` for testing.

### 8. Comments

- Use comments to explain complex logic or decisions.
- Avoid redundant comments that restate the code.

### 9. Accessibility

- Use semantic HTML elements (e.g., `<button>`, `<header>`).
- Add `aria-label` attributes where necessary.
- Ensure all interactive elements are keyboard accessible.

### 10. Performance

- Use `React.memo` for components that do not re-render often.
- Use `useCallback` and `useMemo` to optimize performance.
- Lazy load components with `React.lazy` and `Suspense`.

### 11. State Management

- Use `useContext` for global state when necessary.
- Avoid prop drilling by using context or state management libraries like Redux.

### 12. API Calls

- Use `axios` for HTTP requests.
- Keep API calls in a separate `services` folder.
- Use environment variables for API endpoints.

### 13. Version Control

- Commit small, logical changes with descriptive commit messages.
- Use feature branches for new features or bug fixes.

### 14. Deployment

- Ensure the app builds without errors or warnings.
- Use `.env` files for environment-specific configurations.

By following these standards, Copilot can generate consistent and maintainable code for the application.
