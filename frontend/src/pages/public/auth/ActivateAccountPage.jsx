import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import publicApi from "../../../api/publicApi";
import MainLayout from "../../../components/layouts/MainLayout";

export default function ActivateAccountPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading"); // loading, success, error
  const [error, setError] = useState(null);

  useEffect(() => {
    async function activate() {
      try {
        await publicApi.activateAccount(token);
        setStatus("success");
        setTimeout(() => navigate("/login"), 3000);
      } catch (err) {
        setError(err?.message || "Impossible d'activer le compte");
        setStatus("error");
      }
    }
    activate();
  }, [token, navigate]);

  return (
    <MainLayout>
      <div className="max-w-md mx-auto border rounded-lg shadow p-6 mt-10 text-center">
        {status === "loading" && <p>Activation en cours...</p>}
        {status === "success" && <p className="text-green-600">Compte activé ! Redirection vers login...</p>}
        {status === "error" && <p className="text-red-600">{error}</p>}
      </div>
    </MainLayout>
  );
}
