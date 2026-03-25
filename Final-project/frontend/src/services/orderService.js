const API_URL = "http://localhost:3000/api/orders";

export const orderService = {
  async placeOrder(orderData) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to place order");
    }
    return data;
  },

  async getMyOrders() {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch orders");
    }
    return data;
  },
};
