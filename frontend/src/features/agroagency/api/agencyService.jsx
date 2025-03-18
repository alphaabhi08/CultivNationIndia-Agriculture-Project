const API_URL = import.meta.env.VITE_API_URL;

export const agencySignupApi = async (signupData, imageFile) => {
  const formData = new FormData();
  formData.append(
    "agroagency",
    new Blob([JSON.stringify(signupData)], { type: "application/json" })
  );
  formData.append("certificateImage", imageFile);

  try {
    const response = await fetch(`${API_URL}/api/agroagency/register`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      return token;
    } else {
      const { message } = await response.json();
      throw new Error(message || "Signup failed");
    }
  } catch (error) {
    console.error("Error during the signup: ", error);
    throw error;
  }
};

export const agencyLoginApi = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/agroagency/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }), // Ensure correct payload
    });

    if (response.ok) {
      const { token } = await response.json();
      localStorage.setItem("token", token);
      return token;
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed due to server error");
    }
  } catch (error) {
    console.error("Error during login", error);
    throw error;
  }
};

export const fetchAgencyApi = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, Please login");
  }
  try {
    const response = await fetch(`${API_URL}/api/agroagency/agro-profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Authentication Failed");
    }
    return await response.json();
  } catch (error) {
    console.error("Error during fetching agency details", error);
    throw new Error("Authentication Failed");
  }
};

export const updateAgencyApi = async (agencyId, updateAgencyDetails) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/agroagency/${agencyId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateAgencyDetails),
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error updating agency");
  }
};

export const addProductApi = async (productData, imageFile) => {
  const formData = new FormData();
  formData.append(
    "product",
    new Blob([JSON.stringify(productData)], { type: "application/json" })
  );
  formData.append("prodImage", imageFile);

  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${API_URL}/api/agroagency/products/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error adding product");
    }

    return await response.json();
  } catch (error) {
    console.error("Product upload failed:", error);
    throw error;
  }
};
export const fetchProductsApi = async () => {
  try {
      const response = await fetch(`${API_URL}/api/agroagency/products/all`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem("jwt")}` // Include token if needed
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
      }

      return await response.json(); // Ensure JSON response
  } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
  }
};


export const fetchSingleProductApi = async (productId) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(
      `${API_URL}/api/agroagency/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch product");
    }
    return await response.json();
  } catch (e) {
    console.log("Error to fetch product");
    throw e;
  }
};

export const updateProductsApi = async (
  productId,
  updateProduct,
  imageFile
) => {
  const formData = new FormData();
  formData.append(
    "product",
    new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
  );
  if (imageFile) {
    formData.append("prodImage", imageFile);
    formData
  }
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/api/agroagency/products/${productId}/update`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error updating product");
  }
};

export const deleteProductApi = async (productId) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_URL}/api/agroagency/products/${productId}/delete`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Error deleting product");
  }
};

export const getAllSoilAnalysisApi = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/soil-analysis/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch soil analysis requests");
  }

  return await response.json();
};

