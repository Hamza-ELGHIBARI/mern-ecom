import { Link } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext";
import { useContext } from "react";
import CartContext from "../../contexts/CartContext";


export default function CartPage() {
  const { items, removeFromCart, updateQty, total } = useContext(CartContext);


  if (items.length === 0)
    return (
      <section className="max-w-4xl mx-auto p-8 text-center">
        Votre panier est vide.
      </section>
    );


  return (
    <section className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Votre panier</h2>
      <div className="bg-white shadow rounded-lg p-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-3 border-b last:border-b-0"
          >
            <div>
              <div className="font-semibold">{item.name}</div>
              <div className="text-sm text-gray-500">
                Quantité:{" "}
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQty(item, parseInt(e.target.value))}
                  className="w-16 border rounded px-2 py-1"
                />
              </div>
            </div>
            <div className="font-medium">{(item.price * item.qty).toFixed(2)} DH</div>
            <button onClick={() => removeFromCart(item._id)} className="text-red-500">Supprimer</button>
          </div>
        ))}


        <div className="flex justify-between items-center mt-4">
          <div className="text-lg font-semibold">Sous-total</div>
          <div className="text-lg font-bold">{total.toFixed(2)} DH</div>
        </div>


        <div className="mt-6 flex gap-3">
          <Link to="/client/choose-address" className="bg-blue-600 text-white px-4 py-2 rounded">
            Choisir l'adresse de livraison
          </Link>
          <Link to="/" className="border px-4 py-2 rounded">
            Continuer vos achats
          </Link>
        </div>
      </div>
    </section>
  );
}



