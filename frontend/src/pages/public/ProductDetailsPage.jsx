import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/ui/Button";
import MainLayout from "../../components/layouts/MainLayout";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext";
import CartContext from "../../contexts/CartContext";
import useHomeService from "../../hooks/useHomeService";

export default function ProductDetailsPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isAuthenticated, role } = useContext(AuthContext);
  const { addToCart } = useContext(CartContext);
  const { product, loading, error } = useHomeService(id);

  if (loading) {
    return (
      <MainLayout>
        <div className="h-screen flex items-center justify-center">
          <p>Chargement...</p>
        </div>
      </MainLayout>
    );
  }

  if (!product) {
    return (
      <MainLayout>
        <div className="text-center py-20">
          <p className="mb-4 text-red-600">{error || "Produit non trouvé"}</p>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      {error && <div className="bg-red-200 w-full"><p className="text-red-800">{error}</p></div>}
      <div className="max-w-4xl mx-auto py-10 grid md:grid-cols-2 gap-8">
        <img src={`http://localhost:5000${product.image}`} alt={product.title} className="w-full object-contain" />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="mb-2"><strong>Category:</strong> {product.category.name}</p>
          <p className="mb-4"><strong>Rating:</strong> ⭐ {product.rating?.rate}</p>

          <div className="flex gap-4">
            <span className="text-2xl font-bold">${product.price}</span>
            {isAuthenticated && role === "client" && (
              <button
                onClick={() => addToCart(product)}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >
                Add to cart
              </button>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
