import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import { AIProvider } from './context/AIContext'
import { maybeHandleOAuthPopup } from './utils/openrouter'
import './styles/index.css'

// If this is the OAuth popup returning with a code, hand it back and close —
// don't render the app inside the popup.
if (!maybeHandleOAuthPopup()) {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <ThemeProvider>
        <LanguageProvider>
          <AIProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AIProvider>
        </LanguageProvider>
      </ThemeProvider>
    </React.StrictMode>,
  )
}
