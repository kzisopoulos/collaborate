import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import darkLogo from "../assets/collaborate-dark.png";
import Avatar from "./Avatar";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdOutlineLogout,
  MdOutlineSettings,
  MdPersonOutline,
} from "react-icons/md";
import { useState, useEffect } from "react";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const [showDropdown, setShowDropdown] = useState(false);
  const { logout } = useLogout();
  const navigate = useNavigate();
  const openDropdown = () => {
    setShowDropdown(true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const navigateTo = (to: string) => {
    navigate(to);
    closeDropdown();
  };

  useEffect(() => {
    const handler = (e: any) => {
      if (!e.target.classList.contains("dropdown")) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const renderDropdownIcon = showDropdown ? (
    <MdKeyboardArrowUp
      onClick={closeDropdown}
      className="text-2xl cursor-pointer"
    />
  ) : (
    <MdKeyboardArrowDown
      onClick={openDropdown}
      className="text-2xl cursor-pointer "
    />
  );

  return (
    <nav className="py-8">
      {user && (
        <div className="flex items-center gap-2 justify-end">
          <Avatar src={user?.photoURL!} />
          <p className="text-base capitalize">{user?.displayName}</p>
          <div className="relative">
            {renderDropdownIcon}

            {showDropdown && (
              <div className="dropdown w-64 p-2 border bg-white backdrop-blur-xl shadow-lg absolute top-9  right-1 rounded-md">
                <button
                  className="dropdown flex gap-2 text-center items-center p-2 hover:bg-gray-100 w-full"
                  onClick={() => navigateTo("/")}>
                  <MdPersonOutline />
                  Profile
                </button>
                <button
                  className="dropdown flex gap-2 text-center items-center p-2 hover:bg-gray-100 w-full"
                  onClick={() => navigateTo("/")}>
                  <MdOutlineSettings />
                  Settings
                </button>
                <button
                  onClick={logout}
                  className="dropdown flex gap-2 text-center items-center p-2 text-red-500 hover:bg-gray-100 w-full">
                  <MdOutlineLogout />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {!user && (
        <div className="flex items-center justify-between">
          <div>
            <img src={darkLogo} alt="" />
          </div>
          <div className="flex gap-4">
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
