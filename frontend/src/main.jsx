import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { TransactionProvider } from './context/TransactionContext';
import App from './App';
import './index.css';
import 'flag-icons/css/flag-icons.min.css';

// Self-hosted fonts (not Google Fonts' CDN at runtime): a real,
// reproducible failure was found where fonts.googleapis.com returned
// 403 in some environments, silently falling back to a different
// system font and causing exactly the visual inconsistency reported
// (e.g. the Landing page looking like a different typeface). Bundling
// the font files directly removes that external dependency entirely.
import '@fontsource/plus-jakarta-sans/300.css';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/plus-jakarta-sans/700.css';
import '@fontsource/plus-jakarta-sans/800.css';
import '@fontsource/caveat/500.css';
import '@fontsource/caveat/600.css';
import '@fontsource/caveat/700.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TransactionProvider>
        <App />
      </TransactionProvider>
    </BrowserRouter>
  </StrictMode>
);
