import { useEffect } from "react";
import { useState } from "react";
import Select from "react-select";
import { useCollection } from "../../hooks/useCollection";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { Timestamp } from "firebase/firestore";
import { User } from "firebase/auth";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";

const categories = [
  { value: "development", label: "Development" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "network", label: "Network" },
];

const Create = () => {
  const { documents } = useCollection("users");
  const { addDocument, response } = useFirestore("projects");
  const [users, setUsers] = useState<any>();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [category, setCategory] = useState<any>();
  const [assignedUsers, setAssignedUsers] = useState<any>();
  const [formError, setFormError] = useState<string | null>(null);

  let navigate = useNavigate();
  useEffect(() => {
    if (documents) {
      const options = documents.map((user: User) => {
        return { value: user, label: user.displayName };
      });
      setUsers(options);
    }
  }, [documents]);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setFormError(null);
    if (!category) {
      setFormError("Please select a project category.");
      return;
    }
    if (assignedUsers.length < 1) {
      setFormError("Please assign the project to at least 1 user.");
      return;
    }
    const createdBy = {
      displayName: user?.displayName,
      id: user?.uid,
    };
    const assignedUsersList = assignedUsers.map((user: any) => {
      return {
        displayName: user.value.displayName,
        id: user.value.id,
      };
    });
    const project = {
      name,
      details,
      category: category.value,
      dueDate: Timestamp.fromDate(new Date(dueDate)),
      comments: [],
      createdBy,
      assignedUsersList,
    };

    addDocument(project);
    toast.success("Project added successfully.");
    if (!response.error) {
      navigate("/");
    }
  };
  return (
    <div className="max-w-xl w-full">
      <h2 className="text-xl text-gray-700">Create a new project</h2>
      <form onSubmit={handleSubmit}>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Project name: </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Project details: </span>
          <textarea
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm min-h-full h-40"
            required
            onChange={(e) => setDetails(e.target.value)}
            value={details}
          />
        </label>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Set due date </span>
          <input
            className="p-2 text-base text-gray-600 w-full box-border border border-gray-300 rounded-sm"
            type="date"
            required
            onChange={(e) => setDueDate(e.target.value)}
            value={dueDate}
          />
        </label>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Project category:</span>
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </label>
        <label className="block my-6 mx-auto">
          <span className="block mb-2">Assign to:</span>
          <Select
            options={users}
            onChange={(option) => setAssignedUsers(option)}
            isMulti
          />
        </label>
        <button className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white">
          <MdAdd />
          Create
        </button>
        {formError && (
          <p className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">
            {formError}
          </p>
        )}
      </form>
    </div>
  );
};

export default Create;
