import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import { CollectionReference, DocumentData } from "firebase/firestore";
import { User } from "firebase/auth";

interface IProps {
  projects: CollectionReference<DocumentData>[];
}

const ProjectList = ({ projects }: IProps) => {
  return (
    <div className="project-list grid mt-10 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {projects.length === 0 && <p>No projects yet!</p>}

      {projects.map((project: DocumentData) => {
        return (
          <Link
            className="bg-white p-4 rounded-md shadow-sm flex flex-col justify-between gap-3"
            to={`/projects/${project.id}`}
            key={project.id}>
            <h4>{project.name}</h4>
            <div>
              <p className="text-xs font-light">
                Due by {project.dueDate.toDate().toDateString()}
              </p>
              <div className="assign-to ">
                <ul className="mt-3 flex ">
                  {project.assignedUsersList.map((user: User) => (
                    <li key={user.displayName}>
                      <Avatar src={user.displayName!} />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectList;
