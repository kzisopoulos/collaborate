import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { MdOutlineLogin, MdOutlineRotateRight } from "react-icons/md";

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

  const renderedIcon = isPending ? (
    <MdOutlineRotateRight className="animate-spin" />
  ) : (
    <MdOutlineLogin />
  );
  return (
    <div className=" h-[calc(100vh-142px)] grid place-items-center">
      <form
        className="max-w-xl w-full border p-10 border-gray-100 bg-white shadow-lg"
        onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Email: </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Password: </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button
          className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white"
          disabled={isPending}>
          {renderedIcon}
          Login
        </button>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">
            {error}
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
