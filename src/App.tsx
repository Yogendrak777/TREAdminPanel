import React from 'react';
import './App.css';
import NavbarIndex from './Components/Navbar/NavbarIndex';
import LoginIndex from './Components/Login/LoginIndex';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

function App() {

  const route = createBrowserRouter([
    {
        path : "/",
        element : <NavbarIndex/>,
        children : [
          {
            path : '/',
            element : <LoginIndex/>
        }
      ]
    },
    
  ])

  return (
    <>
    <RouterProvider router={route}/>
    </>
  );
}

export default App;
