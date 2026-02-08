import { useState } from "react";
import adminApi from "../api/adminApi";

export default function useAdminUserService() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      return await adminApi.getUsers();
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (data) => {
    setLoading(true);
    setError(null);
    try {
      return await adminApi.addUser(data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      return await adminApi.updateUser(id, data);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await adminApi.deleteUser(id);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { fetchUsers, addUser, updateUser, deleteUser, loading, error };
}
