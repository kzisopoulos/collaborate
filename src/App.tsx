import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages & Components
import Dashboard from "./pages/dashboard/Dashboard";
import Create from "./pages/create/Create";
import Login from "./pages/login/Login";
import Project from "./pages/project/Project";
import Signup from "./pages/signup/Signup";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuthContext } from "./hooks/useAuthContext";
import OnlineUsers from "./components/OnlineUsers";

const App = () => {
  const { user, authIsReady } = useAuthContext();
  return (
    <div className="flex justify-center text-lg bg-gray-100 h-screen">
      {authIsReady && (
        <BrowserRouter>
          {user && <Sidebar />}
          <div className="flex-grow py-0 px-16">
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    {user && <Dashboard />}
                    {!user && <Navigate to="/login" />}
                  </>
                }
              />
              <Route
                path="/create"
                element={
                  <>
                    {!user && <Navigate to="/login" />}
                    {user && <Create />}
                  </>
                }
              />
              <Route
                path="/projects/:id"
                element={
                  <>
                    {!user && <Navigate to="/login" />}
                    {user && <Project />}
                  </>
                }
              />
              <Route
                path="/login"
                element={
                  <>
                    {!user && <Login />}
                    {user && <Navigate to="/" />}
                  </>
                }
              />
              <Route
                path="/signup"
                element={
                  <>
                    {!user && <Signup />}
                    {user && <Navigate to="/" />}
                  </>
                }
              />
            </Routes>
          </div>
          {user && <OnlineUsers />}
        </BrowserRouter>
      )}
    </div>
  );
};

export default App;
