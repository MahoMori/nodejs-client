import { useCallback, useState, useContext, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import ViewArticle from "./pages/ViewArticle";
import AddEditDelete from "./pages/AddEditDelete";
import AuthPage from "./pages/AuthPage";

import { UserContext } from "./context/UserContext";

function App() {
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/refreshtoken", {
      method: "POST",
      credentials: "include",
      header: { "Content-Type": "application/json" },
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        setUserContext((prev) => ({ ...prev, token: data.token }));
      } else {
        setUserContext((prev) => ({ ...prev, token: null }));
      }

      // check every 5 min
      setTimeout(verifyUser, 5 * 30 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => verifyUser(), [verifyUser]);

  const logoutHandler = () => {
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/logout", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (res) => {
      setUserContext((prev) => ({ ...prev, details: undefined, token: null }));
      setPath("/");
      // window.location.replace(`http://localhost:3000`);
      window.location.replace("https://nodejs-giraff-blog.netlify.app/");
    });
  };

  const [path, setPath] = useState("/");

  return (
    <div className="App">
      <nav className="center blog-logo">
        <h1 className="title is-1">Blog</h1>
        {userContext.token === null ? (
          <Link to="/login" className="button is-dark login-logout-button">
            Log In
          </Link>
        ) : (
          <button
            className="button is-dark login-logout-button"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        )}
      </nav>

      <Routes>
        <Route
          path="/"
          element={<Home token={userContext.token} setPath={setPath} />}
        />
        <Route path="/view-article/:_id" element={<ViewArticle />} />

        <Route path="/login" element={<AuthPage path={path} />} />

        <Route
          path="/add-article"
          element={<AddEditDelete editing={false} />}
        />
        <Route
          path="/edit-delete-article/:_id"
          element={<AddEditDelete editing={true} />}
        />
      </Routes>

      {/* {userContext.token === null ? (
        <AuthPage />
      ) : userContext.token ? (
        <Test />
      ) : (
        <div>Loading...</div>
      )} */}

      <footer>
        <a href="https://www.freepik.com/vectors/background">
          Background vector created by rawpixel.com - www.freepik.com
        </a>
      </footer>
    </div>
  );
}

export default App;
