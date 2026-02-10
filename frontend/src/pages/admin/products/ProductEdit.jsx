import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useProduct from "../../../hooks/useProduct";
import useCategories from "../../../hooks/useCategories";
import adminApi from "../../../api/adminApi";

export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { product, loading } = useProduct(id);
  const { categories } = useCategories();
 const [error,setError]=useState(null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        price: product.price,
        description: product.description || "",
        category: product.category?._id,
        image: null, // nouvelle image optionnelle
      });
    }
  }, [product]);

  if (loading || !form) return <p>Chargement...</p>;

  function handleChange(e) {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("description", form.description);
      formData.append("category", form.category);

      if (form.image) {
        formData.append("image", form.image);
      }

      await adminApi.updateProduct(id, formData);
      navigate("/admin/products");
    } catch (err) {
      setError(err.message);
    }
    finally {
      setSaving(false);
    }
  }

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier produit</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {/* IMAGE ACTUELLE */}
      {product.image && (
        <img
          src={`http://localhost:5000${product.image}`}
          alt={product.name}
          className="w-32 h-32 object-cover mb-4 rounded"
        />
      )}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          name="name"
          className="w-full border px-3 py-2 rounded"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          type="number"
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
        >
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        {/* NOUVELLE IMAGE */}
        <input
          type="file"
          name="image"
          accept="image/*"
          className="w-full"
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <button
            disabled={saving}
            className="bg-yellow-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            {saving ? "Mise à jour..." : "Mettre à jour"}
          </button>

          <Link to="/admin/products" className="px-4 py-2 border rounded">
            Annuler
          </Link>
        </div>
      </form>
    </div>
  );
}
