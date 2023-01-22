import "./Login.css";

import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isPending } = useLogin();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  };
  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label>
        <span>Email: </span>
        <input
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>Password: </span>
        <input
          type="password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>

      {!isPending && <button className="btn">Login</button>}
      {isPending && (
        <button className="btn" disabled>
          Logging in
        </button>
      )}
      {error && <div className="error">{error.message}</div>}
    </form>
  );
};

export default Signup;
