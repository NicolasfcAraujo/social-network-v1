import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

type SliceState = { name: String | undefined, isLogged: Boolean}
const initialState: SliceState = { name: "", isLogged: false }

type UserType = {
    user_name: string | undefined,
    user_email: string | undefined,
    user_pass: string | undefined,
    avatar_url: string | undefined
}

type UserLogin = {
    user_email: string | undefined,
    user_pass: string | undefined
}

const url = "https://social-network-api-b728.onrender.com/api/users"

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserLogin>) => {
            const userLogin = {
                user_email: action.payload.user_email,
                user_pass: action.payload.user_pass
            }
            console.log(userLogin)
            state.name = action.payload.user_email
            state.isLogged = true
            axios.post(`${url}/login`, userLogin).then(
                () => window.location.replace("/")
            ).catch(
                (error) => console.log(error)
            )
        },
        logout: (state) => {
            state.name = ""
            state.isLogged = false
        }, 
        createUser: (state, action: PayloadAction<UserType>) => {
            const user = {
                user_name: action.payload.user_name,
                user_email: action.payload.user_email,
                user_pass: action.payload.user_pass,
                avatar_url: action.payload.avatar_url
            }
            axios.post(url, user).then(() => window.location.replace("/")).catch(
                (error) => console.log(error)
            )
        }
    }
})

export const { login, logout, createUser } = slice.actions
export default slice.reducer