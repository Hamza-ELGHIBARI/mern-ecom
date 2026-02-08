import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import MainLayout from "../../../components/layouts/MainLayout";
import publicApi from "../../../api/publicApi";
import AuthContext from "../../../contexts/AuthContext";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {  refreshAuth } = useContext(AuthContext);


  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);


    try {
      const response = await publicApi.login({ email, password });
      // Save token in the canonical key used across the app
      localStorage.setItem("authToken", response.token);
      // Store user info for UI convenience (components may use this)
      localStorage.setItem("user", JSON.stringify(response.user));
      await refreshAuth();
      // Redirect to area according to role
      const role = response.user?.role || "client";
      if (role === "admin") {
        navigate("/admin/");
            } else {
        navigate("/client/");
      }
    } catch (err) {
      setError(err?.message || "Erreur lors de la connexion");
    } finally {
      setLoading(false);
    }
  }


  return (
    <MainLayout>
  <div className="max-w-md mx-auto border rounded-lg shadow p-6 mt-10">
        <h2 className="text-2xl font-bold mb-4 text-center">Connexion</h2>


        {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-sm">{error}</div>}


        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border px-4 py-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className="border px-4 py-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />


          <button
            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>


        <div className="text-center mt-4 space-y-2">
          <div>
            <Link to="/register" className="text-blue-600 hover:underline">
              Créer un compte
            </Link>
          </div>
          <div>
            <Link to="/forgot-password" className="text-blue-600 hover:underline text-sm">
              Mot de passe oublié ?
            </Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
