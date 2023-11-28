import styled from "styled-components";

export const NavbarMainDiv = styled.div`
width : 100%;
height : auto;
position: fixed;
top:0px;
background-image: linear-gradient(180deg, #00BF63, transparent);
align-items: center;
display: flex;
flex-direction: row;
z-index : 100;
@media only screen and (max-width: 600px) {
      background-color: lightblue;
      height : auto;
  }
`;

export const TajName = styled.span`
color : #30373C;
font-size: larger;
font-weight: 800;
`;

export const TajLogo = styled.img`
width : 2em;
height : 2em;
margin : 0.5em;
`;

export const RightContainer = styled.div`
margin-left :60%;
background-color: back;
`;

export const LoginBtn = styled.div`
background-color:  #00BF63;
color : white;
padding : 0.5em 1em; 0.5em 1em;
border-radius : 5px;
cursor:pointer;
`;
