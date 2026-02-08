import { useEffect, useState } from "react";
import adminApi from "../api/adminApi";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      const data = await adminApi.getCategories();
      setCategories(data);
      setLoading(false);
    }
    fetchCategories();
  }, []);

  async function deleteCategory(id) {
  await adminApi.deleteCategory(id);
  setCategories(prev => prev.filter(c => c._id !== id));
}

  return { categories, loading, deleteCategory };
}
