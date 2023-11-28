import styled from "styled-components" 

export const BaseContainer = styled.div`
  width: auto;
  margin-top: 2.5em;
  height: auto;
  text-align: center;
  justify-content: center;
  align-items: center;
  display : flex;
  flex-direction: column;
  cursor: pointer;
`;

export const SignInContainer = styled.div`
width: 30%;
height: 35em;
margin-top: 7em;
text-align: center;
justify-content: center;
align-items: center;
display : flex;
flex-direction: column;
box-shadow: 0.5px 0.5px 3px grey;
border-radius: 10px;
cursor: pointer;
`;

export const Row = styled.div`
width: 85%;
height: auto;
text-align: center;
justify-content: center;
align-items: center;
display : flex;
flex-direction: row;
cursor: pointer;
`;

export const ImgForSign = styled.img`
  width: 5%;
  height: 1em;
  filter: invert(56%) sepia(87%) saturate(3368%) hue-rotate(119deg) brightness(98%) contrast(101%);
`;

export const EmailInput = styled.input`
    margin: 1em;
    width: 60%;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    padding : 5px;

    &:focus {
        border-bottom: 1px solid #00BF63;
      }
`;

export const PasswordInput = styled.input`
    margin: 1em;
    width: 60%;
    border: none;
    outline: none;
    border-bottom: 1px solid #ccc;
    padding : 5px;

    &:focus {
        border-bottom: 1px solid #00BF63;
      }
`;

export const SignInBtn = styled.div`
background-color: #00BF63;
color : white;
padding : 0.5em 1em; 0.5em 1em;
border-radius : 5px;
cursor:pointer;
`;

export const ForgetPassword = styled.div`
font-size: 12px;
cursor:pointer;
margin :0 0 5% 45%;
`;

export const NewToTP = styled.div`
font-size: 14px;
cursor:pointer;;
`;