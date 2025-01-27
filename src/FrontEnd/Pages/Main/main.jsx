import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '../App/App.jsx'
import "../../Assets/css/global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
