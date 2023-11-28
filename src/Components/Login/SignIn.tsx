import React, { useState, useEffect } from 'react'
import { BaseContainer, SignInContainer, EmailInput, PasswordInput, SignInBtn, ForgetPassword, NewToTP, Row, ImgForSign } from './Skins'
import { Link } from 'react-router-dom'
import Email from "../assets/email.png";
import Password from '../assets/lock.png';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { App } from "../FirebaseConfig/Firebase";
import { useNavigate } from "react-router-dom";

export default function SignIn() {

  const [emailId, setEmailId] = useState<any>("");
  const [password, setPassword] = useState<any>("");
  const navigate = useNavigate();

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
         navigate("/home");
      }
    })
  }, []);

  const SendAuthData = () => {
    const auth = getAuth(App);
    if (emailId !== "" && password !== "") {
          signInWithEmailAndPassword(auth, emailId, password)
            .then((userCredential) => {
              const user = userCredential.user;
              alert("signIn Successfull")
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage)
            });
        } else {
      alert("Enter the email and password Correctly");
    }
  };

  const handeEmailId = (e: any) => {
    setEmailId(e.target.value);
  };

  const handelPassword = (e: any) => {
    setPassword(e.target.value);
  };

  return (
    <BaseContainer>
        <SignInContainer>
             <h2>Admin Sign In </h2>
             <Row>
             <ImgForSign src={Email}/>
            <EmailInput type='email' placeholder='Enter Email ID' required onChange={handeEmailId}/>
             </Row> 
             <Row>
             <ImgForSign src={Password}/>
            <PasswordInput  type='password' placeholder='Enter password' required onChange={handelPassword} />
             </Row>
            <ForgetPassword> Forgot password? </ForgetPassword>
            <SignInBtn onClick={SendAuthData}> Continue &gt; </SignInBtn>
            <br/>
        </SignInContainer>
    </BaseContainer>
  )
}
