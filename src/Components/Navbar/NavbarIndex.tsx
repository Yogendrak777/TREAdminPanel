import React from 'react'
import { NavbarContainer, ImageContainer, CompanyName } from './Skins'
import  CompanyLogo  from '../assets/CompanyLogo.jpeg'
import  { Outlet }  from 'react-router-dom'


export default function NavbarIndex() {
  return (
    <>
    <NavbarContainer>
        <ImageContainer src = {CompanyLogo}  />
        <CompanyName>
            TRE Admin panel
        </CompanyName>
    </NavbarContainer>
    <Outlet/>
    </>
  )
}
 