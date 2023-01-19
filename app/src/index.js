import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import StartGame from './pages/StartGame';
import Game from './pages/Game';
import Games from './pages/Games';
import axios from 'axios';
import { AuthProvider } from './AuthContext';

const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    path: '/',
    element: <App />,
    loader: async () => {
      return axios.get('http://localhost:3002/profile',
        { headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` } }).then(res => {
          return res.data;
        })
        .catch((err) => { console.log(err); return null; })

    },
    children: [
      { path: '/games', element: <Games /> },
      { path: '/game/:id', element: <Game /> },
      { path: '/start-game', element: <StartGame /> }
    ]
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
);

