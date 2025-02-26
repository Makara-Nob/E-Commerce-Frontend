import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { loginUser } from '../Services/AuthenticationService';

const login = async (credentials) => { 
    const data = await loginUser(credentials);

    if (!data.access_token) {
        throw new Error(data.message || 'Login failed');
    }

    localStorage.setItem("userId", data.id);
    localStorage.setItem("userName", data.name);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);

    return data;
}

const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
}

const getUser = () => {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) return null;
    try {
        const decodeToken = jwtDecode(access_token);
        const { id, name, roles } = decodeToken;
        const userRoles = Array.isArray(roles) ? roles : [roles];   
        return { id, name, roles: userRoles, access_token };
    } catch (error) {
        console.error(error);
        logout();
        return null;
    }
}

export const useAuth = () => {
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const { data: user } = useQuery({
        queryKey: ['user'],
        queryFn: getUser,
        staleTime: Infinity
    })

    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            queryClient.setQueryData('user', getUser());
            navigate('/');
        }
    })

    return { 
        user,
        isLoading: mutation.isLoading,
        error: mutation.error,
        login: mutation.mutate,
        logout: () => {
            logout();
            queryClient.setQueryData(['user'], null);
        }
    }
}