import { Link, useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";


export default function Navbar() {
    const navigate = useNavigate();
    const {isAuthenticated, user, role,logout } =useContext(AuthContext);
    const goToLogin = () => {
        navigate(`/login`);
    };
          async function handleLogout() {
    await logout();
    navigate("/");
  }

  function roleDashboard() {
    if (role === "admin") return "/admin/";
    if (role === "deliveryman" || role === "delivery") return "/delivery/";
    return "/client/";
  }
    return (
        <nav className="flex justify-between items-center px-6 py-4 shadow">
            <h1 className="text-xl font-bold">MyShop</h1>
  <ul className="flex  items-center gap-4">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/'>Products</Link></li>
                 {!isAuthenticated ? (
                <li><Button onClick={goToLogin}>Login</Button></li>
                ) : (
              <>
                <li>
                  <button
                    onClick={() => navigate(roleDashboard())}
                    className="text-gray-700 hover:text-blue-600"
                  >
                    {user?.name || user?.email}
                    <span className="ml-2 text-sm text-gray-500">({role})</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
            </ul>
        </nav>
    );
}
