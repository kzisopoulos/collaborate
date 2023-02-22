import { NavLink } from "react-router-dom";
import { MdOutlineDashboard, MdAdd, MdOutlineLogout } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import whiteLogo from "../assets/collaborate-white.png";

const Sidebar = () => {
  const { logout } = useLogout();
  const { pathname } = useLocation();

  const links = [
    { label: "Dashboard", icon: <MdOutlineDashboard />, to: "/" },
    { label: "Create", icon: <MdAdd />, to: "/create" },
  ];

  return (
    <div className="min-w-fit bg-gray-700 min-h-screen text-gray-50">
      <div className="mt-9 px-2 w-52 mx-auto">
        <img src={whiteLogo} alt="" className="mx-auto" />
      </div>
      <div className="mt-6">
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
              className="flex gap-2 text-center text-xl py-3 items-center px-8 text-red-400">
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
