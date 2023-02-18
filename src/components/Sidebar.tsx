import { NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { MdOutlineDashboard, MdAdd, MdOutlineLogout } from "react-icons/md";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import whiteLogo from "../assets/collaborate-white.png";

const Sidebar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", icon: <MdOutlineDashboard />, to: "/" },
    { label: "Create", icon: <MdAdd />, to: "/create" },
  ];

  return (
    <div className="min-w-fit bg-gray-700 min-h-screen text-gray-50">
      <div className="mt-5 px-2 w-48 mx-auto">
        <img src={whiteLogo} alt="" className="mx-auto" />
      </div>
      <div className="justify-center">
        <div className="font-bold text-center ">
          <div className="flex items-center gap-3 justify-around px-10 py-8">
            <Avatar src={user?.photoURL!} />
            <p>Hey {user?.displayName}</p>
          </div>
        </div>
        <nav>
          <ul className="flex flex-col gap-2">
            {links.map((link) => {
              return (
                <li key={link.label}>
                  <NavLink
                    to={link.to}
                    className={`flex gap-2 text-center text-xl py-3 items-center px-7   ${
                      link.to === pathname && "bg-gray-500"
                    }`}>
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>
                </li>
              );
            })}
            <button
              onClick={logout}
              className="flex gap-2 text-center text-xl py-3 items-center px-8">
              <MdOutlineLogout />
              <span>Logout</span>
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
