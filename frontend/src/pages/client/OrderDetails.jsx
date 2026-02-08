import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import clientApi from "../../api/clientApi";

export default function OrderDetails() {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const data = await clientApi.getOrderDetails(id);
                setOrder(data);
            } catch (err) {
                console.error("Erreur chargement commande", err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) return <p className="text-center">Chargement...</p>;
    if (!order) return <p className="text-center">Commande introuvable</p>;

    return (
        <section className="max-w-4xl mx-auto">
            <Link to="/client/orders" className="text-blue-600 underline">
                ← Retour à mes commandes
            </Link>

            <h2 className="text-2xl font-bold my-4">
                Commande #{order._id.slice(-6)}
            </h2>

            {/* STATUS */}
            <div className="mb-4">
                <span className="font-semibold">Statut :</span>{" "}
                <span className="capitalize">{order.status}</span>
            </div>

            {/* ADRESSE */}
            <div className="mb-6">
                <h3 className="font-semibold mb-2">Adresse de livraison</h3>
                <p className="text-gray-600">
                    {order.deliveryAddress.street}<br />
                    {order.deliveryAddress.zip} {order.deliveryAddress.city}<br />
                    {order.deliveryAddress.country}
                </p>
            </div>

            {/* PRODUITS */}
            <div className="bg-white shadow rounded-lg p-4">
                <h3 className="font-semibold mb-4">Produits</h3>

                {order.items.map((item) => (
                    <div
                        key={item._id}
                        className="flex justify-between py-2 border-b last:border-b-0"
                    >
                        <div>
                            <div className="font-medium">
                                {item.product?.name || "Produit supprimé"}
                            </div>
                            <div className="text-sm text-gray-500">
                                {item.quantity} × ${item.price.toFixed(2)}
                            </div>
                        </div>

                        <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}

                <div className="flex justify-between mt-4 font-bold text-lg">
                    <span>Total</span>
                    <span>${order.totalPrice.toFixed(2)}</span>
                </div>
            </div>
        </section>
    );
}
