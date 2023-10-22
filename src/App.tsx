import './App.css';
import NavbarIndex from './Components/Navbar/NavbarIndex';
import LoginIndex from './Components/Login/LoginIndex';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeIndex from './Components/Homepage/HomeIndex';
import ReviewPage from './Components/Reviews/ReviewPage';
import TopBangPropertyPage from './Components/TopBangProperty/TopBangPropertyPage';
import Index from './Components/PremBangProperty/Index';
import DispalyData from './Components/PremBangProperty/DispalyData';
import ComingSoonPage from './Components/ComingSoon/ComingSoonPage';
import { useState } from 'react';

function App() {

  const [TypeOfProperty, setTypeOfProperty] = useState<any>("")

  const TakePropertyTypeData = (Type:any) => {
    setTypeOfProperty(Type)
  }

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
            element : <HomeIndex TakePropertyTypeData = {TakePropertyTypeData}/>
          },
          {
            path : '/review',
            element : <ReviewPage/>
          },
          {
            path : '/topBangProperty',
            element : <TopBangPropertyPage/>
          },
          {
            path : '/PremBangProperty',
            element : <Index TypeOfProperty = {TypeOfProperty}/>
          },
          {
            path : '/DisplayProperty',
            element : <DispalyData TypeOfProperty = {TypeOfProperty}/>
          },
          {
            path : '/ComingSoon',
            element : <ComingSoonPage/>
          },
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
