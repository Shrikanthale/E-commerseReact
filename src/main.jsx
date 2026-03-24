import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import './index.css';
import App from './App.jsx';
import { ShopProvider } from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={4}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={3200}
      >
        <ShopProvider>
          <App />
        </ShopProvider>
      </SnackbarProvider>
    </BrowserRouter>
  </StrictMode>
);
