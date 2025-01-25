import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext'
import { ConfirmationProvider } from './components/Confirmation'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfirmationProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ConfirmationProvider>
  </React.StrictMode>,
)
