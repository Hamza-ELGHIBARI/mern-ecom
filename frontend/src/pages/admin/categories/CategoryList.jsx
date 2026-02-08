import { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import ConfirmModal from "../../../components/ui/ConfirmModal";

export default function CategoryList() {
    const { categories,deleteCategory, loading } = useCategories();
    const [name, setName] = useState("");
    const [selectedId, setSelectedId] = useState(null);

 async function handleDelete() {
    try {
      await deleteCategory(selectedId);
      toast.success("Catégorie supprimée");
      setSelectedId(null);
    } catch (err) {
      toast.error(err.message);
    }
  }

    if (loading) return <p>Chargement...</p>;

    return (
        <div className="p-8 max-w-xl mx-auto">
            <div className="flex justify-between mb-6">
                <h1 className="text-2xl font-bold">Catégories</h1>
                <Link to="/admin/categories/add" className="bg-blue-600 text-white px-4 py-2 rounded">
                    + Ajouter
                </Link>
            </div>
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(c => (
            <tr key={c._id} className="border-b">
              <td className="p-3">{c.name}</td>
              <td className="p-3 flex gap-2">
                <Link
                  to={`/admin/categories/${c._id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Modifier
                </Link>

                <button
                  onClick={() => setSelectedId(c._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <ConfirmModal
        open={!!selectedId}
        title="Supprimer la catégorie"
        message="Des produits peuvent être associés à cette catégorie."
        onConfirm={handleDelete}
        onCancel={() => setSelectedId(null)}
      />
        </div>
    );
}
