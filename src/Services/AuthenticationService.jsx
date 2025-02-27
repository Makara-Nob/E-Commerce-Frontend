import Api from "../api/api";

const endpoint = "/auth";

export const loginUser = async (data) => { 
    const response = await Api.post(`${endpoint}/login`, data);
    return response.data;
}

export const registerUser = async (data) => { 
    const response = await Api.post(`${endpoint}/register`, data);
    return response.data;
}

export const refreshAccessToken = async (refreshToken) => { 
    const response = await Api.post(`${endpoint}/refresh-token`, {
        refresh_token: refreshToken,
    });
    return response.data.access_token;
}