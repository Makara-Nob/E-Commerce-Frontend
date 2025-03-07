import Api from "../api/api";

const endpoint = "/auth";

export const loginUser = async (data) => {
    try {
        const response = await Api.post(`${endpoint}/login`, data);
        return response.data.data;
    } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        throw error.response?.data || new Error("Login failed");
    }
};

export const registerUser = async (data) => {
    try {
        const response = await Api.post(`${endpoint}/register`, data);
        return response.data;
    } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        throw error.response?.data || new Error("Registration failed");
    }
};

export const refreshAccessToken = async () => { 
    try {
        const response = await Api.post(`${endpoint}/refresh-token`); // Assuming token is sent in HTTP-only cookies
        return response.data.access_token;
    } catch (error) {
        console.error("Token refresh error:", error.response?.data || error.message);
        localStorage.removeItem("access_token")
        window.location.href = "/login"
        return null;
    }
};
