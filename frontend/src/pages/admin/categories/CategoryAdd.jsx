import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import adminApi from "../../../api/adminApi";

export default function CategoryAdd() {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await adminApi.createCategory({ name });
      navigate("/admin/categories");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter une catégorie</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nom de la catégorie"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <div className="flex gap-4">
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>

          <Link to="/admin/categories" className="px-4 py-2 border rounded">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
