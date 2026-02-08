import { Link } from "react-router-dom";
import useProducts from "../../../hooks/useProducts";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmModal from "../../../components/ui/ConfirmModal";

export default function ProductList() {
  const { products, loading, error, deleteProduct } = useProducts();
  const [selectedId, setSelectedId] = useState(null);
  const [deleting, setDeleting] = useState(false);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

 
  async function handleConfirmDelete() {
    setDeleting(true);
    try {
      await deleteProduct(selectedId);
      toast.success("Produit supprimé avec succès");
      setSelectedId(null);
    } catch (err) {
      toast.error(err.message || "Erreur lors de la suppression");
    } finally {
      setDeleting(false);
    }
  }
  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Produits</h1>
        <Link
          to="/admin/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Ajouter
        </Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Prix</th>
            <th className="p-3 text-left">Catégorie</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p._id} className="border-b">
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.price}</td>
              <td className="p-3">{p.category?.name}</td>
              <td className="p-3 flex gap-2">
                <Link
                  to={`/admin/products/${p._id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Modifier
                </Link>

                <button
                  onClick={() => setSelectedId(p._id)}
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
        title="Supprimer le produit"
        message="Cette action est irréversible. Voulez-vous continuer ?"
        confirmText="Supprimer"
        onCancel={() => setSelectedId(null)}
        onConfirm={handleConfirmDelete}
        loading={deleting}
      />
    </div>
  );
}
