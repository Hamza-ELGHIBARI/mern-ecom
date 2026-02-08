import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MainLayout from "../../components/layouts/MainLayout";
import CartContext from "../../contexts/CartContext";
import useCheckoutService from "../../hooks/useCheckoutService";
import Button from "../../components/ui/Button";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { addressIndex } = location.state || {};

  const { items, clearCart, total } = useContext(CartContext);
  const { createOrder, loading, error } = useCheckoutService();

  const handleOrder = async () => {
    try {
      await createOrder({
        addressIndex,
        items,
      });

      clearCart();
      navigate("/client/orders");
    } catch (err) {
      console.error(err);
    }
  };

  if (!items || items.length === 0) {
    return (
      <MainLayout>
        <p className="text-center py-20">Panier vide</p>
      </MainLayout>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex justify-between py-2 border-b last:border-b-0"
          >
            <span>
              {item.name} x {item.qty}
            </span>
            <span>{(item.price * item.qty).toFixed(2)} DH</span>
          </div>
        ))}

        <div className="flex justify-between mt-4 font-bold">
          <span>Total :</span>
          <span>{total.toFixed(2)} DH</span>
        </div>
      </div>

      <Button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Création..." : "Passer la commande"}
      </Button>
    </>
  );
}
