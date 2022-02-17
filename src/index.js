import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { ArticleProvider } from "./context/ArticleContext";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ArticleProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ArticleProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
