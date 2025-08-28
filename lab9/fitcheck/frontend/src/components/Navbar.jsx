import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/register", label: "Register" },
    { path: "/users", label: "Users" }
  ];

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold text-indigo-400">FitCheck</h1>
        <div className="flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-300 hover:text-indigo-300"
              } font-medium`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
