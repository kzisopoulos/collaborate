import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useState, useEffect, FormEvent } from "react";
import { MdSave } from "react-icons/md";
import useUpdateUser from "../../hooks/useUpdateUser";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserProfile = () => {
  const { user } = useAuthContext();
  const { documents, error } = useCollection("users");
  const userUID = user?.uid;
  const currentUser = documents?.find((user: any) => user.id === userUID);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { updateUser } = useUpdateUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      setFirstName(currentUser.firstName);
      setLastName(currentUser.lastName);
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser(user!, firstName, lastName, email);
    navigate("/");
    toast.success("User updated successfully.");
  };

  return (
    <div>
      {documents && currentUser && (
        <div className="max-w-xl w-full">
          <h2 className="text-xl text-gray-700">Profile Settings</h2>
          <form onSubmit={handleSubmit}>
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

            <button className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white">
              <MdSave />
              Save
            </button>
            {error && (
              <p className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">
                {error}
              </p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
