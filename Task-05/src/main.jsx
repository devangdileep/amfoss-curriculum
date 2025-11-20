import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Playlist from './pages/playlist.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Search from './pages/search.jsx'
import Profile from './pages/profile.jsx'

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/playlist', element: <Playlist /> },
  { path: '/register', element: <Register /> },
  { path: '/search', element: <Search /> },
  { path: '/profile', element: <Profile /> },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
