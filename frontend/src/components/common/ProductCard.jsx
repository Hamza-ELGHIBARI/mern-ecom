import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/products/${product._id}/Details`);
  };

  return (
    <div className="border rounded-lg p-4 flex flex-col">
      <img src={`http://localhost:5000${product.image}`} alt={product.name} className="h-40 object-contain mb-4" />

      <h3 className="font-semibold text-sm mb-1">{product.name}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.name}</p>

      <div className="mt-auto flex justify-between items-center">
        <span className="font-bold">${product.price}</span>
        <Button onClick={goToDetails}>Details</Button>
      </div>
    </div>
  );
}
