import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ChatsProvider } from '@/contexts/ChatsContext'
import { UsersProvider } from '@/contexts/UsersContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UsersProvider>
      <ChatsProvider>
        <App />
      </ChatsProvider>
    </UsersProvider>
  </StrictMode>,
)
