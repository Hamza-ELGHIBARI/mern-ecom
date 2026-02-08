import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

export default function useCategory(categoryId) {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategory() {
      try {
        const data = await adminApi.getCategoryById(categoryId);
        setCategory(data);
      } finally {
        setLoading(false);
      }
    }

    if (categoryId) fetchCategory();
  }, [categoryId]);

  return { category, loading };
}
