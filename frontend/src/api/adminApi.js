const API_BASE_URL ='http://localhost:5000/api/admin';

function getAuthHeaders() {
  const token = localStorage.getItem("authToken");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || data.message || "Erreur API");
  }
  return data;
}

const adminApi = {
  // ======================
  // DASHBOARD
  // ======================
  getDashboardStats: async () => {
    const res = await fetch(
      `${API_BASE_URL}/orders/dashboard/stats`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(res);
  },

  // ======================
  // PRODUCTS
  // ======================
  getProducts: async () => {
    const res = await fetch(
      `${API_BASE_URL}/products`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(res);
  },

  getProductById: async (id) => {
    const res = await fetch(
      `${API_BASE_URL}/products/${id}`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(res);
  },

  createProduct: async (formData) => {
     const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE_URL}/products`, {
      method: "POST",
       headers: {
        Authorization: `Bearer ${token}`, // pas Content-Type ici
      },
      body: formData,
    });
    return handleResponse(res);
  },

  updateProduct: async (id, formData) => {
         const token = localStorage.getItem("authToken");
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "PUT",
       headers: {
        Authorization: `Bearer ${token}`, // pas Content-Type ici
      },
      body: formData,
    });
    return handleResponse(res);
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  // ======================
  // CATEGORIES
  // ======================
  getCategories: async () => {
    const res = await fetch(
      `${API_BASE_URL}/categories`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(res);
  },

  createCategory: async (category) => {
    const res = await fetch(`${API_BASE_URL}/categories`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(category),
    });
    return handleResponse(res);
  },

  // ======================
  // ORDERS
  // ======================
  getOrders: async () => {
    const res = await fetch(
      `${API_BASE_URL}/orders`,
      { headers: getAuthHeaders() }
    );
    return handleResponse(res);
  },

  // Categories
getCategoryById: async (id) => {
  const res = await fetch(
    `${API_BASE_URL}/categories/${id}`,
    { headers: getAuthHeaders() }
  );
  return handleResponse(res);
},

updateCategory: async (id, category) => {
  const res = await fetch(
    `${API_BASE_URL}/categories/${id}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(category),
    }
  );
  return handleResponse(res);
},

deleteProduct: async (id) => {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
},

deleteCategory: async (id) => {
  const res = await fetch(`${API_BASE_URL}/categories/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handleResponse(res);
},

 getUsers: async () => {
    const res = await fetch(`${API_BASE_URL}/users`, { headers: getAuthHeaders() });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  addUser: async (data) => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  updateUser: async (id, data) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

  deleteUser: async (id) => {
    const res = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },

};

export default adminApi;
