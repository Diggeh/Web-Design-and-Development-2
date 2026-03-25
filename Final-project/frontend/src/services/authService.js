const API_URL = "http://localhost:3000/api/auth";

export const authService = {
  async login(credentials) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    // Store token and user in localStorage
    localStorage.setItem("token", data.token);
    localStorage.setItem(
      "user",
      JSON.stringify({ _id: data._id, username: data.username, role: data.role }),
    );
    return {
      token: data.token,
      user: { _id: data._id, username: data.username, role: data.role },
    };
  },

  async logout() {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (e) {
      // ignore network errors on logout
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data;
  },

  getCurrentUser() {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },

  getToken() {
    return localStorage.getItem("token");
  },

  isAuthenticated() {
    return !!this.getToken();
  },
};
