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
