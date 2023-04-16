import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

type SliceState = { name: String, isLogged: Boolean}
const initialState: SliceState = { name: "", isLogged: false }

type UserType = {
    user_name: string | undefined,
    user_email: string | undefined,
    user_pass: string | undefined,
    avatar_url: string | undefined
}

const url = "https://social-network-api-b728.onrender.com/api/users"

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser: (state, action: PayloadAction<string>) => {
            state.name = action.payload
            state.isLogged = true
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
            axios.post(url, user).then(() => window.location.reload()).catch(
                (error) => console.log(error)
            )
        }
    }
})

export const { changeUser, logout, createUser } = slice.actions
export default slice.reducer