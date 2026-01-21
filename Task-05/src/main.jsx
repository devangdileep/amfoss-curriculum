import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Playlist from './pages/playlist.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register.jsx'
import Search from './pages/search.jsx'
import Profile from './pages/profile.jsx'
import PlayingMusic from './pages/playing.jsx'
import { Outlet } from 'react-router-dom'
import { PlayerProvider } from '../src/components/playercontext.jsx'
import DynamicIsland from './components/dynamicisland.jsx'
import UserPlaylist from './pages/userplaylist.jsx'
const AppLayout = () => (
  <>
    <Outlet /> 
    <DynamicIsland />
  </>
);

const router = createBrowserRouter([
  { path: '/', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    element: <AppLayout />,
    children: [
      { path: '/playlist', element: <Playlist /> },
      { path: '/search', element: <Search /> },
      { path: '/profile', element: <Profile /> },
      { path: '/playing', element: <PlayingMusic /> },
      { path: "/userplaylist/:playlistName" ,element: <UserPlaylist /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PlayerProvider>
      <RouterProvider router={router} />
    </PlayerProvider>
  </StrictMode>,
)