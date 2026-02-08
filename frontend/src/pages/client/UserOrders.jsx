
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import clientApi from "../../api/clientApi";

export default function UserOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await clientApi.getMyOrders();
        setOrders(data);
      } catch (err) {
        console.error("Erreur chargement commandes", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center">Chargement...</p>;
  }

  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Mes commandes</h2>

      <div className="bg-white shadow rounded-lg p-4">
        {orders.length === 0 && (
          <p className="text-gray-500">Aucune commande trouvée</p>
        )}

        {orders.map((o) => (
          <div
            key={o._id}
            className="flex items-center justify-between py-3 border-b last:border-b-0"
          >
            <div>
              <div className="font-semibold">
                Commande {o._id.slice(-6)}
              </div>
              <div className="text-sm text-gray-500">
                {new Date(o.createdAt).toLocaleDateString()} — {o.status}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="font-medium">
                ${o.totalPrice.toFixed(2)}
              </div>
              <Link
                to={`/client/orders/${o._id}`}
                className="text-blue-600 underline"
              >
                Détails
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
