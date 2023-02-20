import React from "react";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";
import { MdCheck, MdOutlineDeleteOutline } from "react-icons/md";

interface IProps {
  project: DocumentData;
}

const ProjectSummary = ({ project }: IProps) => {
  const { deleteDocument, updateDocument } = useFirestore("projects");
  const { user } = useAuthContext();
  let displayBtn = user?.uid === project.createdBy.id ? true : false;
  let navigate = useNavigate();
  const handleClick = (e: any) => {
    deleteDocument(project.id);
    navigate("/");
  };
  const handleUpdate = (e: any) => {
    updateDocument(project.id, {
      category: "completed",
    });
    navigate("/");
  };
  return (
    <div className="col-span-2 text-base text-gray-700">
      <h2 className="text-xl">Project Summary</h2>
      <div className="bg-white p-7 rounded-md shadow-md mt-5">
        <h2 className="text-xl">{project.name}</h2>
        <p>By: {project.createdBy.displayName}</p>
        <p className="my-3">
          Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className="my-8">{project.details}</p>
        <h4 className=" ">Project is assigned to: </h4>

        <div className="flex mt-4">
          {project.assignedUsersList.map((user: any) => {
            return (
              <div key={user.id}>
                <Avatar src={user.photoURL} />
              </div>
            );
          })}
        </div>
      </div>
      {displayBtn && (
        <div className="flex gap-2 mt-5">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white">
            <MdOutlineDeleteOutline />
            Delete
          </button>
          <button
            onClick={handleUpdate}
            className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white">
            <MdCheck />
            Mark as complete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectSummary;
