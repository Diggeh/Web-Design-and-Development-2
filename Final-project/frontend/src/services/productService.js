const API_URL = "http://localhost:3000/api/products";

export const productService = {
  async getAll(search = "", category = "") {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (category && category !== "All") params.append("category", category);

    const url = params.toString() ? `${API_URL}?${params}` : API_URL;
    const response = await fetch(url);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch products");
    }
    return data;
  },

  async getById(id) {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch product");
    }
    return data;
  },

  async create(productData) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to create product");
    }
    return data;
  },

  async update(id, productData) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to update product");
    }
    return data;
  },

  async remove(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to delete product");
    }
    return data;
  },
};
