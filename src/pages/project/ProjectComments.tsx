import React from "react";
import { useState } from "react";
import Avatar from "../../components/Avatar";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { DocumentData, Timestamp } from "firebase/firestore";

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
    <div className="project-comments">
      <h4>Project Comments</h4>

      <ul>
        {project.comments.length > 0 &&
          project.comments.map((comment: any) => {
            return (
              <li key={comment.id}>
                <div className="comment-author">
                  <Avatar src={comment.photoURL} />
                  <p>{comment.displayName}</p>
                </div>
                <div className="comment-date">
                  {formatDistanceToNow(comment.createdAt.toDate(), {
                    addSuffix: true,
                  })}
                </div>
                <div className="comment-content">
                  <p>{comment.content}</p>
                </div>
              </li>
            );
          })}
      </ul>

      <form onSubmit={handleSubmit} className="add-comment">
        <label>
          <span>Add new comment: </span>
          <textarea
            required
            onChange={(e) => setNewComment(e.target.value)}
            value={newComment}></textarea>
        </label>
        <button className="btn">Add comment</button>
      </form>
    </div>
  );
};

export default ProjectComments;
