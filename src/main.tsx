import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import theme from './context/theme.ts'
import './assets/css/index.css'
import App from './App.tsx'
const URL_BASE = '/shuffle';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router basename={URL_BASE}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  </StrictMode>,
)
