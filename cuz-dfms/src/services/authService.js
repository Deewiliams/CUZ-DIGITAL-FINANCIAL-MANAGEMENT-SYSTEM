export const loginUser = async (email, password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      // Success response (status 200-299)
      console.log("Login successful:", data);
      return {
        success: true,
        data: data,
        token: data.token,
        user: data.user,
      };
    } else {
      // Error response (status 400-599)
      console.error("Login failed:", data.error || data.message);
      return {
        success: false,
        error: data.error || "Login failed. Please try again.",
      };
    }
  } catch (error) {
    console.error("Network error:", error.message);

    if (error.message === "Failed to fetch") {
      return {
        success: false,
        error:
          "Unable to connect to server. Please ensure the backend server is running on http://localhost:8000",
      };
    } else {
      return {
        success: false,
        error: "Network error. Please check your connection and try again.",
      };
    }
  }
};
