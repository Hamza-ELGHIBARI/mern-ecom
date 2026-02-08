import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";


export default function AdminLayout() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  async function handleLogout() {
    await logout();
    navigate("/");
  }
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 sticky top-0 h-screen">
        <div className="flex flex-col justify-between h-full">
          <div>
            <h2 className="text-xl font-bold mb-8 ">Admin Panel</h2>
            <nav className="space-y-3">
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `block p-2 rounded ${isActive ? "bg-gray-200 font-semibold" : ""}`
                }
              >
                Dashboard
              </NavLink>


              <NavLink
                to="/admin/products"
                className={({ isActive }) =>
                  `block p-2 rounded ${isActive ? "bg-gray-200 font-semibold" : ""}`
                }
              >
                Products
              </NavLink>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block p-2 rounded ${isActive ? "bg-gray-200 font-semibold" : ""}`
                }
              >
                Users
              </NavLink>
              <NavLink
                to="/admin/categories"
                className={({ isActive }) =>
                  `block p-2 rounded ${isActive ? "bg-gray-200 font-semibold" : ""}`
                }
              >
                Catégories
              </NavLink>
            </nav>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >Logout
            </button>
          </div>
        </div>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
