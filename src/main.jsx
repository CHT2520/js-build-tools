import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.querySelector('#react-content')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)


