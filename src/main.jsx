import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from 'react-query'
import Store from './store/index.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './Context/AuthContext.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
    <Provider store={Store}>
      <AuthProvider>
      <BrowserRouter>
            <App />
      </BrowserRouter>
      </AuthProvider>
    </Provider>
   </QueryClientProvider>
)