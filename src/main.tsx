import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import SmartScheduler from './SmartScheduler';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SmartScheduler />
    </BrowserRouter>
  </StrictMode>,
);