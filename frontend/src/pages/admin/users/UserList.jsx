import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAdminUserService from "../../../hooks/useAdminUserService";
import ConfirmModal from "../../../components/ui/ConfirmModal";
import toast from "react-hot-toast";


export default function UserList() {
  const { fetchUsers, deleteUser } = useAdminUserService();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirm, setConfirm] = useState({ isOpen: false, userId: null });

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadUsers(); }, []);

  const handleDelete = async () => {
    try {
      await deleteUser(confirm.userId);
      toast.success("utilisateur supprimée");
      setConfirm({ isOpen: false, userId: null });
      loadUsers();
    } catch (err) {
     toast.success(err.message );
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        <Link to="/admin/users/add" className="bg-blue-600 text-white px-4 py-2 rounded">+ Ajouter</Link>
      </div>

      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Rôle</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className="border-b">
              <td className="p-3">{u.firstName} {u.lastName}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3">{u.role}</td>
              <td className="p-3 flex gap-2">
                <Link to={`/admin/users/${u._id}/edit`} className="bg-yellow-500 text-white px-3 py-1 rounded text-sm">Modifier</Link>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                  onClick={() => setConfirm({ isOpen: true, userId: u._id })}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {confirm.isOpen && (
        <ConfirmModal
          message="Voulez-vous vraiment supprimer cet utilisateur ?"
          onConfirm={handleDelete}
          onCancel={() => setConfirm({ isOpen: false, userId: null })}
        />
      )}
    </div>
  );
}
