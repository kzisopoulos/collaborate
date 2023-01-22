import "./ProjectList.css";

import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";

interface IProps {
  projects: CollectionReference<DocumentData>[];
}

const ProjectList = ({ projects }: IProps) => {
  return (
    <div className="project-list">
      {projects.length === 0 && <p>No projects yet!</p>}

      {projects.map((project: DocumentData) => {
        return (
          <Link to={`/projects/${project.id}`} key={project.id}>
            <h4>{project.name}</h4>
            <p>Due by {project.dueDate.toDate().toDateString()}</p>
            <div className="assign-to">
              <ul>
                {project.assignedUsersList.map((user: User) => (
                  <li key={user.photoURL}>
                    <Avatar src={user.photoURL} />
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectList;
