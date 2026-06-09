import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

import { ViteSSG } from 'vite-ssg';


const root = document.getElementById('root');
if (!root) throw new Error('Root element not found');

export const createApp = ViteSSG(
  App,
  { routes },
  ({ app, router, routes, inClient, initialState }) => {
    // TODO: implement to work with Sanity
  }
)
createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
