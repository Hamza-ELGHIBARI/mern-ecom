import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCategories from "../../../hooks/useCategories";
import adminApi from "../../../api/adminApi";

export default function ProductAdd() {
  const navigate = useNavigate();
  const { categories, loading: loadingCategories } = useCategories();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("description", form.description);
      formData.append("category", form.category);

      if (form.imageFile) {
      formData.append("image", form.imageFile);
    }
      await adminApi.createProduct(formData);
      navigate("/admin/products");
    } catch (err) {
      setError("Erreur lors de la création du produit");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Ajouter un produit</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Nom"
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
          placeholder="Prix"
          className="w-full border px-3 py-2 rounded"
          value={form.price}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          className="w-full border px-3 py-2 rounded"
          value={form.category}
          onChange={handleChange}
          required
          disabled={loadingCategories}
        >
          <option value="">-- Choisir une catégorie --</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        {/* IMAGE */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={(e) => setForm({ ...form, imageFile: e.target.files[0] })}
        />

        <div className="flex gap-4">
          <button
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {loading ? "Enregistrement..." : "Enregistrer"}
          </button>

          <Link to="/admin/products" className="px-4 py-2 border rounded">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
