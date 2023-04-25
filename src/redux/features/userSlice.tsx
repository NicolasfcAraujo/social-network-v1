import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type SliceState = { name: String | undefined, user_email: string | undefined, isLogged: Boolean, exp: number, id: string, chats: string[]}
const initialState: SliceState = { name: "", user_email: "",isLogged: false, exp: 0, id: "", chats: []}

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

export const loginAsync = createAsyncThunk(
    "user/login", 
    async (body) => {
        const serverLogin = await axios.post(`${url}/login`, body)
        console.log(serverLogin)
        return serverLogin
    }
)

export const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        changeUser: (state, action) => {
            state.isLogged = true
            state.name = action.payload.user_name
            state.user_email = action.payload.user_email,
            state.exp = action.payload.exp
            state.id = action.payload._id
            state.chats = action.payload.chats
            console.log(state.isLogged, state.name, state.user_email)
        },
        logout: (state) => {
            state.name = ""
            state.user_email = ""
            state.exp = 0
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
        },
        addChat: (state, action) => {
            state.chats = [...state.chats, action.payload]
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginAsync.fulfilled, (state, action) => {
            state.isLogged = true
            console.log(action.payload)
        })
    }
})

export const { changeUser, logout, createUser, addChat } = slice.actions
export default slice.reducer