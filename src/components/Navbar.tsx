import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import darkLogo from "../assets/collaborate-dark.png";

const Navbar = () => {
  const { user } = useAuthContext();
  return (
    <nav className="flex items-center justify-between pt-8">
      {!user && (
        <>
          <div>
            <img src={darkLogo} alt="" />
          </div>
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
