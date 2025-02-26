import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isAuthenticating: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload.user
            state.token = action.payload.token
            state.isAuthenticating = true
            localStorage.setItem('user', JSON.stringify(action.payload.user))
            localStorage.setItem('token', action.payload.token)
        },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticating = false
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        },
        updateUserProfile: (state,action) => {
            state.user = { ...state.user, ...action.payload }
            localStorage.setItem('user', JSON.stringify(state.user))
        }
    },
})

export const { loginSuccess, logout, updateUserProfile } = authSlice.actions
export default authSlice.reducer