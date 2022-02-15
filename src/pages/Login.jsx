import React, { useState, useContext } from "react";
// import { UserContext } from "../context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  //   const [userContext, setUserContext] = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section>
      <div class="container">
        <div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              class="button is-primary add-edit-button is-medium
              is-rounded"
            >
              Log In
            </button>

            <div class="field">
              <label class="label">Email</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input
                  type="text"
                  class="input"
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
