import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import Api from "../api/api";
import { loginUser } from "../Services/AuthenticationService";
import { fetchCart } from "../store/cartSlice";
import { useDispatch } from "react-redux";

const AuthContext = createContext(null)

const fetchUser = async () => {
    const res = await Api.get(`/users/me`);
    const { id, name, email, authorities, enabled } = res.data;
    const roles = authorities.map((auth) => auth.authority)
    return { id, name, email, roles, enabled };
  };

export function AuthProvider({ children }){
    const dispatch = useDispatch();
    const [accessToken,setAccessToken] = useState(localStorage.getItem("access_token"))

    const { data: user, refetch, isLoading, isError } = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        enabled: !!accessToken,
        retry: false,
    })

    const login = async (Credential) => {
        try {
            const res = await loginUser(Credential);
            localStorage.setItem("access_token",res.access_token)
            setAccessToken(res.access_token)

            const { data: newUser } = await refetch()
        if (newUser) {
            dispatch(fetchCart(newUser.id))
        }
        } catch (error) {
            console.error("Login failed: ",error)
        }
    }

    const logout = async () => {
        localStorage.removeItem("access_token")
        setAccessToken(null)
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isError}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}
