import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: {
    jwt_token: string | null,
    refresh_token: string | null,
    username: string | null,
    isAuthenticated: boolean,
    loading: boolean,
    error: string
    isMaterLogin: boolean
} = {
    jwt_token: null,
    refresh_token: null,
    username: null,
    isAuthenticated: false,
    loading: false,
    error: "" ,
    isMaterLogin: false
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

export const  login = createAsyncThunk<{ token: string, refreshToken: string, userEmail: string }, any>(
    "user/login",
    async (user): Promise<{ token: string, refreshToken: string, userEmail: string }> => {
        try{
            console.log(user);
            const response = await api.post("/auth/login", user , {withCredentials: true});
            return response.data as { token: string; refreshToken: string; userEmail: string };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
)

export const loginInMasterPassword = createAsyncThunk<{ token: string, refreshToken: string, userEmail: string }, any>(
    "user/loginInMasterPassword",
    async (comingData : { email : string , password: string , jwt_token :string }) => {
        try{
            const sendData = {
                email : comingData.email,
                masterPassword: comingData.password
            }
            console.log(sendData);
            const response = await api.post("/user/check-master-password", sendData, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${comingData.jwt_token}`
                }
            }); 
            return response.data as { token: string; refreshToken: string; userEmail: string };
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
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: { payload: { token: string, refreshToken: string, userEmail: string } }) => {
                console.log(action.payload);
                state.loading = false;
                state.isAuthenticated = true;
                state.jwt_token = action.payload.token;
                state.refresh_token = action.payload.refreshToken;
                state.username = action.payload.userEmail;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
                console.error(action.error);
                alert("wrong email or password");
            })
        builder
            .addCase(loginInMasterPassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginInMasterPassword.fulfilled, (state, action: { payload: { token: string, refreshToken: string, userEmail: string } }) => {
                console.log(action.payload);
                state.loading = false;
                state.isMaterLogin = true;
            })
            .addCase(loginInMasterPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "";
                console.error(action.error);
                alert("wrong master password");
            })
    }
})

export default userSlice.reducer;