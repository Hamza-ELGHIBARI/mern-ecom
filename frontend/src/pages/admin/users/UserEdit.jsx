import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAdminUserService from "../../../hooks/useAdminUserService";

export default function UserEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { fetchUsers, updateUser, loading, error } = useAdminUserService();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "admin",
  });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const users = await fetchUsers();
        const user = users.find((u) => u._id === id);
        if (!user) return navigate("/admin/users");
        setForm({
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        });
      } catch (err) {
        console.error(err);
      }
    };
    loadUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUser(id, form);
      navigate("/admin/users");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Modifier utilisateur</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 font-semibold">Prénom</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Nom</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rôle</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="admin">Admin</option>
            <option value="livreur">Livreur</option>
          </select>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            {loading ? "Mise à jour..." : "Mettre à jour"}
          </button>
        </div>
      </form>
    </div>
  );
}
