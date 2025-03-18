const API_URL = import.meta.env.VITE_API_URL;

export const adminLoginApi = async (email, password) => {
  const response = await fetch(`${API_URL}/api/admin/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message || "Admin login failed");
  }
  return await response.json();
};

// export const fetchAgroAgenciesApi = async (token) => {
//   const response = await fetch(`${API_URL}/api/admin/agroagencies`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch Agroagencies");
//   }

//   return await response.json();
// };

export const fetchAgroAgenciesApi = async () => {
  const token = localStorage.getItem("adminToken"); // Ensure token is available
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_URL}/api/admin/agroagencies`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Agroagencies");
  }

  return await response.json();
};

export const fetchFarmersApi = async () => {
  const token = localStorage.getItem("adminToken");
  if (!token) throw new Error("No authentication token found.");

  const response = await fetch(`${API_URL}/api/admin/farmers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch Farmers");
  }
  return await response.json();
};
