import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Login = ({ path }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email, password }),

      // cookie
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            setError("Invalid inputs");
          } else {
            setError("Something went wrong. Please try again.");
          }
        } else {
          const data = await res.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
          console.log(userContext);

          // redirect
          if (path === "/") {
            window.history.back();
          } else {
            window.location.replace(`http://localhost:3000/${path}`);
          }
        }
      })
      .catch((err) => {
        setError("Something went wrong. Please try again");
      });
  };

  return (
    <section>
      <div className="container">
        <div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="button is-primary add-edit-button is-medium
              is-rounded"
            >
              Log In
            </button>

            {error && (
              <p className="center">
                <span className="tag is-warning is-medium">{error}</span>
              </p>
            )}

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  type="email"
                  className="input"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  type="password"
                  className="input"
                  name="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
