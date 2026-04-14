import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Clean up Supabase OAuth hash fragments after Supabase has read them
if (window.location.hash && window.location.hash.includes('access_token')) {
  // Wait for Supabase to process the hash, then clean the URL bar
  setTimeout(() => {
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, 1000);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

