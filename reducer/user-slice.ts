import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
    jwt_token: string | null,
    refresh_token: string | null,
    username: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string
} = {
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: ""
}

const api = axios.create({
    baseURL: "http://192.168.180.29:5000"
})

export const register = createAsyncThunk<{ token: string, refreshToken: string, userEmail: string }, any>(
    "user/register",
    async (user): Promise<{ token: string, refreshToken: string, userEmail: string }> => {
        try{
            console.log(user);
            const response = await api.post("/auth/register", user , {withCredentials: true});
            return response.data as { token: string, refreshToken: string, userEmail: string };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

const userSlice = createSlice({
    name : "userReducer",
    initialState,
    reducers :{},
    extraReducers (builder) {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action: { payload: { token: string, refreshToken: string, userEmail: string } }) => {
                console.log(action.payload);
                state.loading = false;
                state.isAuthenticated = true;
                state.jwt_token = action.payload.token;
                state.refresh_token = action.payload.refreshToken;
                state.username = action.payload.userEmail;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
                console.error(action.error);
            })
    }
})

export default userSlice.reducer;