import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.jsx';

// pages
import Login from './components/pages/Auth/Login.jsx';
import Register from './components/pages/Auth/Register.jsx';
import Home from './components/pages/Home.jsx';
import Profile from './components/pages/User/Profile.jsx';
import MyPets from './components/pages/Pets/MyPets.jsx';
import AddPet from './components/pages/Pets/AddPet.jsx';
import EditPet from './components/pages/Pets/EditPet.jsx';
import PetDetails from './components/pages/Pets/PetDetails.jsx';
import MyAdoptions from './components/pages/Pets/MyAdoptions.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/login', element: <Login /> },
      { path: '/register', element: <Register /> },
      { path: '/user/profile', element: <Profile /> },
      { path: '/pet/add', element: <AddPet /> },
      { path: '/pets/mypets', element: <MyPets /> },
      { path: '/pets/myadoptions', element: <MyAdoptions /> },
      { path: '/pet/edit/:id', element: <EditPet /> }, 
      { path: '/pet/:id', element: <PetDetails /> },   
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
