import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export type SliceState = { name: String | undefined, user_email: string | undefined, isLogged: Boolean, exp: number, id: string, chats: string[], actualChat: { anotherUser: string, anotherEmail: string }, messages: {text: string, who: string}[], isLoading: boolean, isMenu: boolean, isWidthMobile: boolean}
const initialState: SliceState = { name: "", user_email: "",isLogged: false, exp: 0, id: "", chats: [], actualChat: { anotherUser: "", anotherEmail: "" }, messages: [], isLoading: false, isMenu: false, isWidthMobile: false}

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
        },
        changeChat: (state, action) => {
            state.actualChat = { anotherUser: action.payload.anotherUser, anotherEmail: action.payload.anotherEmail }
        },
        actualMessages: (state, action) => {
            state.messages = action.payload
        },
        setLoadingTrue: (state) => {
            state.isLoading = true
        },
        setLoadingFalse: (state) => {
            state.isLoading = false
        },
        setIsMenu: (state, action) => {
            state.isMenu = action.payload
        },
        setIsWidthMobile: (state, action) => {
            state.isWidthMobile = action.payload
        }
    }
})

export const { changeUser, logout, createUser, addChat, changeChat, actualMessages, setLoadingTrue, setLoadingFalse, setIsMenu, setIsWidthMobile } = slice.actions
export default slice.reducer