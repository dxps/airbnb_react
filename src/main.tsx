/**
 * This file is the entry point for the React app, and referred in `src/index.html`.
 * It sets up the root element and renders the App component to the DOM.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { seedLocalDatabase } from '@/api/data/seed';
import Router from './Router';
import ThemeProvider from '@/components/ThemeProvider';
import { store } from '@/state/store';

// Seeds the local storage database with data.
seedLocalDatabase();

const elem = document.getElementById('root')!;
const app = (
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ThemeProvider>
  </StrictMode>
);

if (import.meta.hot) {
  // With hot module reloading, `import.meta.hot.data` is persisted.
  const root = (import.meta.hot.data.root ??= createRoot(elem));
  root.render(app);
} else {
  // The hot module reloading API is not available in production.
  createRoot(elem).render(app);
}
