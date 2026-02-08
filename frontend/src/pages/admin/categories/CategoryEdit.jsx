import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useCategory from "../../../hooks/useCategory";
import adminApi from "../../../api/adminApi";

export default function CategoryEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { category, loading } = useCategory(id);

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (category) {
      setName(category.name);
    }
  }, [category]);

  if (loading) return <p>Chargement...</p>;

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      await adminApi.updateCategory(id, { name });
      navigate("/admin/categories");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier catégorie</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <div className="flex gap-4">
          <button
            disabled={saving}
            className="bg-yellow-500 text-white px-4 py-2 rounded"
          >
            {saving ? "Mise à jour..." : "Mettre à jour"}
          </button>

          <Link to="/admin/categories" className="px-4 py-2 border rounded">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
