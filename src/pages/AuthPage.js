import React from "react";

import Login from "./each-auth-component/Login";
import Signup from "./each-auth-component/Signup";

const AuthPage = ({ path }) => {
  return (
    <>
      <div className="center top-button">
        <a href="/" className="button is-warning">
          ← Go Back To Main Page
        </a>
      </div>
      <Login path={path} />
      <Signup />
    </>
  );
};

export default AuthPage;
