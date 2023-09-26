import React, { useState } from "react";
import {
  BaseContainer,
  LoginContainer,
  InputFiled,
  SubmitButton,
  InputFieldContainer,
} from "./Skins";
import { useNavigate } from "react-router-dom";

export default function LoginIndex() {

  const navigate = useNavigate(); 
  const [phoneNumber, setPhoneNumber] = useState<any>("");
  const [passwordNumber, setPasswordNumber] = useState<any>("");
  const [Admin, setAdmin] = useState<any>([
    "9353437216",
    "9380138177",
    "8618097544",
  ]);
  const [AdminPassword, setAdminPAssword] = useState<any>([
    "TRE@123",
    "tre@123",
  ]);

  const handelPhoneNumber = (e: any) => {
    setPhoneNumber(e.target.value);
  };

  const handelPassword = (e: any) => {
    setPasswordNumber(e.target.value);
  };

  const handelSubmit = () => {
    if (Admin.includes(phoneNumber) && AdminPassword.includes(passwordNumber)) {
      alert("Welcome to Admin Panel");
      navigate("")
    } else {
      alert("Invalid credentials, Please try again");
    }
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
