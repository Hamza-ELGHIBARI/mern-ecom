import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

export default function useProduct(productId) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await adminApi.getProductById(productId);
        setProduct(data);
      } finally {
        setLoading(false);
      }
    }
    if (productId) fetchProduct();
  }, [productId]);

  return { product, loading };
}
