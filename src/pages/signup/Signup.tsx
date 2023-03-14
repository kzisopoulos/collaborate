import { useState } from "react";
import { MdOutlineLogin, MdOutlineRotateRight } from "react-icons/md";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  const { signup, isPending, error } = useSignup();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    signup(firstName, lastName, email, password, passwordCheck);
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
        onSubmit={handleSubmit}
        className="max-w-xl w-full border p-10 border-gray-100 bg-white shadow-lg">
        <h2>Sign up</h2>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">First name: </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </label>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Last name: </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="text"
            required
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </label>
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
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Retype password: </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="password"
            required
            onChange={(e) => setPasswordCheck(e.target.value)}
            value={passwordCheck}
          />
        </label>
        <button
          className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white"
          disabled={isPending}>
          {renderedIcon}
          Sign up
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
