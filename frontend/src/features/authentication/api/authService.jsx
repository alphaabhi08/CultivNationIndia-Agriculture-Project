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
