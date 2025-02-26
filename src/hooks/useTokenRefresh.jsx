import { useState } from 'react';
import { refreshAccessToken } from '../Services/AuthenticationService';  // Assuming you have this service

export const useTokenRefresh = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleTokenRefresh = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    setIsRefreshing(true);
    try {
      const response = await refreshAccessToken(refreshToken);
      const { access_token } = response.data;

      localStorage.setItem('access_token', access_token);
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  return { handleTokenRefresh, isRefreshing };
};
