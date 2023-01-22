import "./Signup.css";

import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailError, setThumbnailError] = useState<string | null>(null);
  const { signup, isPending, error } = useSignup();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail!);
    setEmail("");
    setPassword("");
    setDisplayName("");
    setThumbnail(null);
    setThumbnailError(null);
  };
  const handleFileChange = (e: any) => {
    setThumbnail(null);
    let selected = e.target.files[0];
    if (!selected) {
      setThumbnailError("Please select a file.");
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image.");
      return;
    }
    if (selected.size > 100000) {
      setThumbnailError("Image filesize must be less than 100kb");
      return;
    }

    setThumbnailError(null);
    setThumbnail(selected);
  };
  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h2>Sign up</h2>
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
      <label>
        <span>Display name: </span>
        <input
          type="text"
          required
          onChange={(e) => setDisplayName(e.target.value)}
          value={displayName}
        />
      </label>
      <label>
        <span>Profile thumbnail: </span>
        <input type="file" required onChange={handleFileChange} />
        {thumbnailError && <div className="error">{thumbnailError}</div>}
      </label>
      {!isPending && <button className="btn">Sign up</button>}
      {isPending && (
        <button className="btn" disabled>
          Loading
        </button>
      )}
      {error && <div className="error">{error.message}</div>}
    </form>
  );
};

export default Signup;
