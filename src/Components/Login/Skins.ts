import styled from "styled-components";

export const BaseContainer = styled.div`
    width : 100%;
    height : 40em;
    position : absolute;
    top : 4em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;


export const LoginContainer = styled.div`
    width : 50%;
    box-shadow: 1px 1px 5px gray;
    border : 5px;
    padding : 3em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius : 1em;
   
`;

export const InputFieldContainer =  styled.div`
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: row;

    @media only screen and (max-width: 600px) {
        flex-direction: column;
    }
`;

export const InputFiled = styled.input`
    padding : 1em;
    width : 15em;
    border-radius : 1em;
    margin-left: 1em;
`;

export const SubmitButton = styled.button`
margin-top : 2em;
padding : 1em;
width : 15em;
background-color : rgb(110, 244, 110);
border-radius : 5em;
`;
