import styled from "styled-components"; 

export const HomepageContainer = styled.div`
    width : 100%;
    position : absolute;
    height : auto;
    top: 3.5em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    
`;

export const CardDetailsContainer = styled.div`
    width : auto;
    height : auto;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    text-algin : center;
    justify-content: center;

`;

export const CardContainer = styled.div`
    width : 12em;
    height : 10em;
    box-shadow: 1px 1px 5px #778899;
    border : 5px;
    padding : 2em;
    margin : 1em;
    align-items: center;
    text-algin : center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius : 1em;

    // &:hover{
    //     margin : 2em;
    // }
`;

