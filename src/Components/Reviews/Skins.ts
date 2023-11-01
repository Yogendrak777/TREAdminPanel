import styled from "styled-components";

export const ReviewBaseContainer = styled.div`
    width : 100%;
    position : absolute;
    height : auto;
    top: 15em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: column;
`;

export const CardContainer = styled.div`
    width : auto;
    height : auto;
    box-shadow: 1px 1px 5px gray;
    padding : 2em;
    margin : 1em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius : 0.7em;

    @media only screen and (max-width: 600px) {
        width : 70%;
    }
`;

export const InputNameContainer = styled.input`
    align-items: center;
    text-algin : center;
    width : 20em;
    height : 2em;
    justify-content: center;
    display: flex;
    flex-direction: row;
    padding-left : 1em;
    padding : 0.5em;
    margin : 0.5em;
    border-radius : 0.7em;

    @media only screen and (max-width: 600px) {
        width : 10em;
    }
`;

export const InputReviewContainer = styled.textarea`
    align-items: center;
    text-algin : center;
    width : 50em;
    height : 14em;
    justify-content: center;
    display: flex;
    flex-direction: row;
    padding-left : 1em;
    padding : 0.5em;
    margin : 0.5em;
    border-radius : 0.7em;

    @media only screen and (max-width: 600px) {
        width : 100%;
    }
`

export const BtnBaseContainer = styled.div`
    width : auto;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: row;
`;

export const SubmitButton = styled.button`
    padding : 0.5em;
    width : 8em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    background-color : green;
    color : white;
    font-size :17px;
    border-radius : 0.5em;
`;