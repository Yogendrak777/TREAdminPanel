import './App.css';
import NavbarIndex from './Components/Navbar/NavbarIndex';
import LoginIndex from './Components/Login/LoginIndex';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeIndex from './Components/Homepage/HomeIndex';

function App() {


  const route = createBrowserRouter([
    {
        path : "/",
        element : <NavbarIndex/>,
        children : [
          {
            path : '/',
            element : <LoginIndex/>
          },
          {
            path : '/home',
            element : <HomeIndex/>
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
