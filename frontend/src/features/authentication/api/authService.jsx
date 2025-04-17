const API_URL = import.meta.env.VITE_API_URL;

export const loginApi = async (email, password) => {
  // const hash = CryptoJS.SHA256(password);
  // const hashedPassword = CryptoJS.enc.Base64.stringify(hash);
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });
  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem("token", token);
    return token;
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};

export const signupApi = async (signupData) => {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(signupData), // Remove extra wrapping
    credentials: "include",
  });

  if (response.ok) {
    const { token } = await response.json();
    localStorage.setItem("token", token);
    return token;
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
};

export const fetchUserApi = async () => {
  const response = await fetch(`${API_URL}/api/auth/user`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    credentials: "include",
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error("Authentication Failed");
  }
};

export const updateUserApi = async (userId, updateUserDetails) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/api/auth/${userId}/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updateUserDetails),
  });

  if (!response.ok) {
    throw new Error("Failed to update user profile");
  }

  return await response.json();
};

export const submitSoilAnalysisApi = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/soil-analysis/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit soil Analysis");
  }
  return await response.json();
};

export const getUserSoilAnalysisApi = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/soil-analysis/user-request`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to get soil Analysis");
  }
  return await response.json();
};

export const withdrawSoilAnalysisApi = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/soil-analysis/withdraw/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to withdraw soil Analysis");
  }
  return await response.text();
};

export const submitContactApi = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/contact/submit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to submit contact form");
  }
  return await response.json();
};

export const getUserContactApi = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/contact/user-contact`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get contact form data");
  }
  return await response.json();
};

export const deleteContactApi = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/contact/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to delete contact form data");
  }
  return await response.json();
};

export const getAllContactsApi = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/contact/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to get All contact request");
  }
  return await response.json();
};

// Cart APIS

export const addToCartApi = async (productId, quantity) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_URL}/api/cart/add?productId=${productId}&quantity=${quantity}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Failed to add product to cart");
  }
  return await response.json();
};

export const updateCartItemQuantityApi = async (cartItemId, newQuantity) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/api/cart/update/${cartItemId}?quantity=${newQuantity}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update cart item quantity");
    }
    // return await response.json();
    return { success: true };
  } catch (error) {
    console.log("Error updating cart item quantity:");
    throw error;
  }
};

export const getCartItemsApi = async () => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/cart`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cart items");
  }
  return await response.json();
};

export const removeCartItemApi = async (productId) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/api/cart/remove/${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to remove cart item");
  }
  // return await response.json();
  return { success: true };
};
