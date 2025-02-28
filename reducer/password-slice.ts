import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Password } from "../module/Password";
import axios, { head } from "axios";

const initialState: {
    loading : boolean
    error : string
    password : Password
} = {
    loading: false,
    error: "",
    password: new Password(0, "", "", "", "")
}

const api = axios.create({
    baseURL: "http://192.168.180.29:5000"
})

export const cretaePassword = createAsyncThunk(
    'password/createPassword',
    async (data : {password : Password , jwtToken : string}) => {
        try {
            const response = await api.post("/passwords/save-password", data.password, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${data.jwtToken}`
                }
            })
            return response.data
        } catch (error) {
            console.error(error)
            throw error
        }
    }
)

const passwordSlice = createSlice({
    name: "password",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(cretaePassword.pending, (state, action) => {
                console.log("Creating password")
                state.loading = true
            })
            .addCase(cretaePassword.fulfilled, (state, action) => {
                console.log("Password created")
                state.loading = false
            })
            .addCase(cretaePassword.rejected, (state, action) => {
                console.log("Password creation failed")
                state.loading = false
                state.error = action.error.message || ""
            })
    }
})

export default passwordSlice.reducer