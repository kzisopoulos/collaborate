import "./Dashboard.css";
import { useEffect, useState } from "react";
import { useCollection } from "../../hooks/useCollection";
import ProjectList from "../../components/ProjectList";
import ProjectFilter from "./ProjectFilter";
import { useAuthContext } from "../../hooks/useAuthContext";
import { DocumentData } from "firebase/firestore";
import { UserInfo } from "firebase/auth";
const Dashboard = () => {
  const { documents, error } = useCollection("projects");
  const [currentFilter, setCurrentFilter] = useState("all");
  const [filteredDocs, setFilteredDocs] = useState(null);
  const { user } = useAuthContext();

  const changeFilter = (newFilter: string) => {
    setCurrentFilter(newFilter);
  };

  useEffect(() => {
    if (documents) {
      if (currentFilter === "all") {
        setFilteredDocs(
          documents.filter((doc: DocumentData) => doc.category !== "completed")
        );
      } else if (currentFilter === "mine") {
        setFilteredDocs(
          documents.filter((doc: DocumentData) => {
            let assignedToMe = false;
            doc.assignedUsersList.map((u: UserInfo) => {
              if (u.uid === user?.uid && doc.category !== "completed") {
                assignedToMe = true;
              }
              return true;
            });
            return assignedToMe;
          })
        );
      } else {
        setFilteredDocs(
          documents.filter(
            (doc: DocumentData) => doc.category === currentFilter
          )
        );
      }
    }
  }, [currentFilter, documents, user]);

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      {error && (
        <p className="bg-red-100 text-red-600 p-2 rounded-md mt-4 ">{error}</p>
      )}
      {documents && (
        <ProjectFilter
          currentFilter={currentFilter}
          changeFilter={changeFilter}
        />
      )}
      {filteredDocs && <ProjectList projects={filteredDocs} />}
    </div>
  );
};

export default Dashboard;
