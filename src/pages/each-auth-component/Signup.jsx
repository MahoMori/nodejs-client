import React, { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const [userContext, setUserContext] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username: email, password }),

      // cookie
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
          if (res.status === 401) {
            setError("Invalid inputs");
          } else if (res.status === 500) {
            const data = await res.json();
            if (data.message) {
              setError(
                data.message ||
                  "Something went wrong with the server. Please try again."
              );
            } else {
              setError("Something went wrong. Please try again");
            }
          } else {
            setError("Something went wrong. Please try again");
          }
        } else {
          const data = await res.json();
          setUserContext((prev) => ({ ...prev, token: data.token }));
          console.log(userContext);
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
              className="button is-info add-edit-button is-medium is-rounded"
            >
              Sign Up
            </button>

            {error && (
              <p className="center">
                <span className="tag is-warning is-medium">{error}</span>
              </p>
            )}

            <div className="field">
              <label className="label">First Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="firstName"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Last Name</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="lastName"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>

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

export default Signup;
