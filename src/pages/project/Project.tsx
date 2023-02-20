import { useParams } from "react-router-dom";
import { useDocument } from "../../hooks/useDoument";
import ProjectSummary from "./ProjectSummary";
import ProjectComments from "./ProjectComments";
const Project = () => {
  const { id } = useParams();
  const { document, error } = useDocument("projects", id!);

  if (error) {
    return (
      <div className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">
        {error}
      </div>
    );
  }

  if (!document) {
    return <div className="loading">Loading...</div>;
  }
  return (
    <div className="grid grid-cols-3 gap-16 items-start">
      <ProjectSummary project={document} />
      <ProjectComments project={document} />
    </div>
  );
};

export default Project;
