import useDashboardStats from "../../../hooks/useDashboardStats";

export default function AdminDashboard() {
  const { stats, loading, error } = useDashboardStats();

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Products</p>
          <h2 className="text-3xl font-bold">{stats.productsCount}</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Total Categories</p>
          <h2 className="text-3xl font-bold">{stats.categoriesCount}</h2>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <p className="text-gray-500">Orders Today</p>
          <h2 className="text-3xl font-bold">{stats.ordersToday}</h2>
        </div>
      </div>
    </div>
  );
}
