import React from "react";

import Login from "./each-auth-component/Login";
import Signup from "./each-auth-component/Signup";

const AuthPage = () => {
  return (
    <>
      <div className="center top-button">
        <a href="/" className="button is-warning">
          ← Go Back To Main Page
        </a>
      </div>
      <Login />
      <Signup />
    </>
  );
};

export default AuthPage;
