import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  PlusCircleIcon,
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { name: "Estatísticas", path: "/stats", Icon: HomeIcon },
  { name: "Cadastrar Cliente", path: "/register-client", Icon: PlusCircleIcon },
  { name: "Lista de Clientes", path: "/client-list", Icon: UserIcon },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { signout } = useAuth();

  const toggleCollapse = () => setCollapsed((prev) => !prev);
  const handleLogout = () => {
    signout();
    navigate("/signin");
  };

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <aside
      className={`flex flex-col bg-gray-900 text-white h-screen transition-all duration-300 ease-in-out overflow-hidden ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
        {!collapsed && (
          <h1 className="text-xl font-bold uppercase tracking-wide">
            Avantsoft
          </h1>
        )}
        <button
          onClick={toggleCollapse}
          className="p-2 rounded hover:bg-gray-700 "
          aria-label="Toggle sidebar"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      <nav className="flex flex-col flex-grow px-2 py-4 space-y-2">
        {navItems.map(({ name, path, Icon }) => (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={`flex items-center gap-3 p-2 rounded w-full text-left cursor-pointer ${
              isActive(path)
                ? "bg-indigo-600 text-white font-semibold"
                : "hover:bg-gray-700"
            }`}
          >
            <Icon className="w-6 h-6 flex-shrink-0" />
            {!collapsed && name}
          </button>
        ))}
      </nav>

      <div className="px-2 py-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full p-2 rounded text-red-400 hover:text-white hover:font-bold hover:bg-red-700 cursor-pointer"
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6 flex-shrink-0" />
          {!collapsed && "Deslogar"}
        </button>
      </div>
    </aside>
  );
}
