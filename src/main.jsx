import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserProvider } from './Components/Usercontext.jsx'
import { PostProvider } from './Components/Postcontext.jsx'

createRoot(document.getElementById('root')).render(

    <UserProvider>
      <PostProvider>
        <App />
      </PostProvider>
    </UserProvider>
  ,
)
