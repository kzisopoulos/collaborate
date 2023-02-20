import React from "react";
import { useState } from "react";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { DocumentData, Timestamp } from "firebase/firestore";
import { MdAdd } from "react-icons/md";

interface IProps {
  project: DocumentData;
}

const ProjectComments = ({ project }: IProps) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAuthContext();
  const { updateDocument, response } = useFirestore("projects");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const commentToAdd = {
      displayName: user?.displayName,
      photoURL: user?.photoURL,
      content: newComment,
      createdAt: Timestamp.now(),
      id: crypto.randomUUID(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  return (
    <div>
      <h2 className="text-xl text-gray-700">Project Comments</h2>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment: any) => {
            return (
              <li
                className="p-4 rounded-md border border-white mt-5 shadow-md bg-white text-gray-700"
                key={comment.id}>
                <div className="flex gap-2 items-center">
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className="text-xs  my-2">
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </div>
                <div className="text-sm">
                  <p>{comment.content}</p>
                </div>
              </li>
            );
          })}
      </ul>

      <form onSubmit={handleSubmit} className="mt-3">
        <label>
          <span className="text-xl text-gray-700 block mb-3">
            Add new comment:
          </span>
          <textarea
            className="p-2 text-sm w-full box-border border border-gray-300 rounded-sm min-h-full h-40"
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}></textarea>
        </label>
        <button className="flex items-center gap-2 border px-3 py-2 rounded-md bg-gray-700 text-white text-base">
          <MdAdd />
          Add Comment
        </button>
      </form>
    </div>
  );
};

export default ProjectComments;
