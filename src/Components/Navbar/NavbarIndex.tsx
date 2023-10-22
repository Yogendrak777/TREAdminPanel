import React from 'react'
import { NavbarContainer, ImageContainer, CompanyName } from './Skins'
import  CompanyLogo  from '../assets/CompanyLogo.jpeg'
import  { Outlet, useNavigate }  from 'react-router-dom'

export default function NavbarIndex() {
  const navigate = useNavigate();
  return (
    <>
    <NavbarContainer>
        <ImageContainer src = {CompanyLogo}  />
        <CompanyName onClick={() => navigate("/home")}>
            TRE Admin panel
        </CompanyName>
    </NavbarContainer>
    <Outlet/>
    </>
  )
}
 