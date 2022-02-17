import { useCallback, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import ViewArticle from "./pages/ViewArticle";
import AddEditDelete from "./pages/AddEditDelete";
import AuthPage from "./pages/AuthPage";

import Test from "./pages/Test";

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

  return (
    <div className="App">
      <nav className="center blog-logo">
        <h1 className="title is-1">Blog</h1>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/view-article/:_id" element={<ViewArticle />} />
        <Route path="/add-article" element={<AddEditDelete />} />
        <Route path="/edit-delete-article/:_id" element={<AddEditDelete />} />
      </Routes>

      {/* <Home /> */}
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
