import styled from "styled-components";
import { keyframes } from "styled-components";

const SlideFromRight = keyframes`
0%   { left:800px;}
25%  {left:600px;}
50%  { left:400px;}
75%  { left:200px;}
100% { left:0px;}
`;
const SlideToLeft = keyframes`
0%   { left:0px;}
25%  {left: -200px;}
50%  { left:-400px;}
75%  { left:-600px;}
100% { left:-800px;}
`;

interface AnimationStartProps {
  AnimationStart: boolean;
  marginTop?: string;
}

interface SubmitButtonProps {
  marginTop?: string;
}

export const BaseContainer = styled.div`
  width: 100%;
  position: absolute;
  height: auto;
  top: 3.5em;
  align-items: center;
  text-algin: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
`;

export const CardContainer = styled.div<AnimationStartProps>`
  width: auto;
  height: auto;
  top: ${(props) => (props.marginTop ? props.marginTop : "7em")};
  box-shadow: 1px 1px 5px gray;
  padding: 2em;
  margin: 1em;
  align-items: center;
  text-algin: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
  position: relative;
  border-radius: 0.7em;
  animation: ${(props) => (props.AnimationStart ? SlideFromRight : SlideToLeft)}
    0.5s linear;

  @media only screen and (max-width: 600px) {
    width: 70%;
    flex-direction: column;
  }
`;

export const CardColContainer = styled.div`
  width: auto;
  height: auto;
  padding: 2em;
  margin: 1em;
  align-items: left;
  text-algin: left;
  justify-content: left;
  display: flex;
  flex-direction: column;
`;

export const CheckBoxContainer = styled.div`
  width: auto;
  height: auto;
  padding: 0.5em;
  margin: 0.4em;
  align-items: left;
  text-algin: left;
  justify-content: left;
  display: flex;
  flex-direction: row;
`;

export const InputNameContainer = styled.input`
  align-items: center;
  text-algin: center;
  width: 23em;
  height: 2em;
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding: 0.5em;
  border-radius: 0.7em;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const InputCheckContainer = styled.input`
  align-items: center;
  text-algin: center;
  width: 1.5em;
  height: 1.5em;
  justify-content: center;
  padding-left: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 0.7em;
`;
export const LabelContainer = styled.label`
  align-items: left;
  text-algin: left;
  width: auto;
  height: auto;
  font-size: 18px;
  justify-content: left;
  margin-bottom: 0.5em;
  margin-top: 1em;
`;

export const LabelContainerForCheckBox = styled(LabelContainer)`
  margin-bottom: 0em;
  margin-top: 0.3em;
`;

export const LabelContainerOnImages = styled(LabelContainer)`
  margin-bottom: 1em;
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: #3f6184;
`;

export const InputReviewContainer = styled.textarea`
  align-items: center;
  text-algin: center;
  width: 40em;
  height: 14em;
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding-left: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 0.7em;
`;

export const BtnBaseContainer = styled.div`
  width: auto;
  align-items: center;
  text-algin: center;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

export const SubmitButton = styled.button<SubmitButtonProps>`
  padding: 0.5em;
  width: auto;
  align-items: center;
  text-algin: center;
  justify-content: center;
  background-color: #00bf63;
  border: #00bf63;
  color: white;
  font-size: 17px;
  border-radius: 0.5em;
  box-shadow: 1px 1px 5px #778899;
  margin-top: ${(props) => (props.marginTop ? props.marginTop : "4em")};
`;

export const InputImageContainer = styled.input`
  align-items: center;
  text-algin: center;
  width: 30em;
  height: 2em;
  justify-content: center;
  display: flex;
  flex-direction: row;
  padding-left: 1em;
  padding: 0.5em;
  margin: 0.5em;
  border-radius: 0.7em;
  background-color: #f5f6f8;

  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;

export const SliderContainer = styled.div`
  width: 50em;
  height: 20em;
  text-align: center;
  background-color: #282c34;
  padding: 3em;
`;

export const ImageContainer = styled.img`
  width: 100%;
  height: 20em;
`;
