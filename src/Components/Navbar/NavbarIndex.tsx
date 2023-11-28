import React, { useEffect, useState } from 'react'
import { NavbarMainDiv, TajLogo, RightContainer, TajName, LoginBtn } from "./Skins"
import CompantLogo from "../assets/CompanyLogo.jpeg"
import { Outlet, useNavigate } from 'react-router-dom'
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { App } from "../FirebaseConfig/Firebase";

export default function Navbar() {
  const navigate = useNavigate();

  const [isLogout, serIsLpgout] = useState<any>(true)

  const HandleGoBack = () => {
    navigate('/')
  }

  const HandleSignIn = () => {
    navigate('/signIn')
  }

  const HandleLagOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        serIsLpgout(true)
        navigate('/')
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    // Disable the back button
    window.history.pushState(null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, window.location.href);
    };
    const auth = getAuth(App);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        serIsLpgout(false)
      }
    })
  }, []);

  return (
    <>
    <NavbarMainDiv>
      <TajLogo src = {CompantLogo}/>
      <TajName onClick={HandleGoBack}> Taj Properties Admin panel</TajName>
      <RightContainer>
       {isLogout ? 
       <LoginBtn onClick={HandleSignIn}>
          SignIn
        </LoginBtn>
         : 
        <LoginBtn onClick={HandleLagOut}>
        LogOut
      </LoginBtn>
      }
      </RightContainer>
    </NavbarMainDiv>
    <Outlet/>
    </>
  )
}