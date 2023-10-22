import React, { useState, useEffect } from "react";
import {
  BaseContainer,
  LoginContainer,
  InputFiled,
  SubmitButton,
  InputFieldContainer,
} from "./Skins";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { App } from "..//FirebaseConfig/Firebase";

export default function LoginIndex() {
  const navigate = useNavigate();
  const [emailId, setEmailId] = useState<any>("");
  const [passwordNumber, setPasswordNumber] = useState<any>("");

  useEffect(() => {
    // Disable the back button
    handelSignOut();
    window.history.pushState(null, window.location.href);
    window.onpopstate = function () {
      window.history.pushState(null, window.location.href);
    };
  }, []);

  const SendAuthData = () => {
    const auth = getAuth(App);
    if (emailId !== "" && passwordNumber !== "") {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          navigate("/home");
        } else {
          signInWithEmailAndPassword(auth, emailId, passwordNumber)
            .then((userCredential) => {
              const user = userCredential.user;
              
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              alert(errorMessage);
            });
        }
      });
    } else {
      alert("Enter the email and password Correctly");
    }

    // createUserWithEmailAndPassword(auth, "yogendragowdak006@gmail.com", "LaserForce")
    //   .then((userCredential) => {
    //     // Signed up
    //     const user = userCredential.user;
    //     alert(user)
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     alert(errorMessage)
    //   });
  };

  const handelPhoneNumber = (e: any) => {
    setEmailId(e.target.value);
  };

  const handelPassword = (e: any) => {
    setPasswordNumber(e.target.value);
  };

  const handelSubmit = () => {
    SendAuthData();
  };

  const handelSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        alert("Session TimeOut")
      })
      .catch((error) => {
        console.log(error);
        
      });
  };

  return (
    <BaseContainer>
      <LoginContainer>
        <h3> Admin Login </h3>
        <InputFieldContainer>
          <InputFiled
            type="tel"
            placeholder="Enter the Admin Number"
            onChange={(e) => handelPhoneNumber(e)}
          />
          <br />
          <InputFiled
            type="password"
            placeholder="Enter the Admin Password"
            onChange={(e) => handelPassword(e)}
          />
        </InputFieldContainer>
        <SubmitButton onClick={handelSubmit}> Submit </SubmitButton>
      </LoginContainer>
    </BaseContainer>
  );
}
