const API_BASE_URL ='http://localhost:5000/api/client';

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

const clientApi = {
  getAddresses: async () => {
    const res = await fetch(`${API_BASE_URL}/addresses`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

  addAddress: async (address) => {
    const res = await fetch(`${API_BASE_URL}/addresses`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(address),
    });
    return handleResponse(res);
  },

  createOrder: async ({ addressIndex, items }) => {
    console.log( JSON.stringify({
        addressIndex,
        items,
      }));
    const res = await fetch(`${API_BASE_URL}/orders`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        addressIndex,
        items,
      }),
    });
    return handleResponse(res);
  },
   getMyOrders: async () => {
    const res = await fetch(`${API_BASE_URL}/orders/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },
 getOrderDetails: async (id) => {
    const res = await fetch(`${API_BASE_URL}/orders/me/${id}`, {
      method: "GET",
      headers: getAuthHeaders(),
    });
    return handleResponse(res);
  },

};

export default clientApi;
