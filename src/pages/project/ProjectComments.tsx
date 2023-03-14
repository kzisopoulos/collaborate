import { useState } from "react";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { DocumentData, Timestamp } from "firebase/firestore";
import { MdAdd } from "react-icons/md";
import { toast } from "react-toastify";

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
      content: newComment,
      createdAt: Timestamp.now(),
      id: crypto.randomUUID(),
    };
    await updateDocument(project.id, {
      comments: [...project.comments, commentToAdd],
    });
    if (!response.error) {
      toast.success("Comment added.");
      setNewComment("");
    } else {
      toast.error("Something went wrong. Try again later.");
    }
  };
  return (
    <div>
      <h2 className="text-xl text-gray-700 mb-5">Project Comments</h2>

      <ul
        className={`h-[500px] ${
          project.comments.length > 3 ? "overflow-y-scroll" : ""
        }`}>
        {project.comments.length > 0 &&
          project.comments.map((comment: any) => {
            return (
              <li
                className="p-4 block break-all rounded-md border border-white mb-4 shadow-md bg-white text-gray-700"
                key={comment.id}>
                <div className="flex gap-2 items-center">
                  <Avatar src={comment.displayName} />
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

      <form onSubmit={handleSubmit} className="mt-5">
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
