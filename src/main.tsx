import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.scss';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
