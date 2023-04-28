import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { changeChat, logout, actualMessages, setLoadingTrue, setLoadingFalse } from "@/redux/features/userSlice"
import { useRouter } from "next/router"
import axios, { AxiosResponse } from "axios"
import { useState, useEffect } from "react"
import Link from "next/link"

const url = "https://social-network-api-b728.onrender.com/api/users"

const Menu = () => {
    const { name, user_email, id } = useSelector((state: RootState) => state.user)
    const [ userContacts, setUserContacts ] = useState([])
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        axios.get("https://social-network-api-b728.onrender.com/api/users").then((data) => {
            setUserContacts(data.data.filter((user: any) => user.user_email === user_email)[0].chats)
            console.log(data.data.filter((user: any) => user.user_email === user_email)[0].chats)
        })
    },[])

    return (
        <div className="border-r border-slate-200 h-screen">
            <div className=" bg-black flex justify-center items-center">
                <h1 className="text-white font-medium text-4xl p-6" >social network</h1>
            </div>
            <div className="border-b border-slate-200 w-full p-6">
                <h2>{name}</h2>
                <h3>{user_email}</h3>
                <div className="flex justify-between items-center">
                    <button onClick={() => dispatch(logout())} className=" text-red-600">Logout</button>
                    <div onClick={() => router.push("/home")}>
                        <button className="bg-black px-2 py-1 text-white w-24 rounded flex justify-between items-center">
                            <i className="fa-solid fa-house"></i>
                            <h1>Home</h1>
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center">
                <div>
                    {userContacts!.map((chat: any) => {
                        return (
                            <article className=" border-b border-slate-200 h-24 px-6 py-4" onClick={() => {
                                dispatch(setLoadingTrue())
                                dispatch(changeChat({anotherUser: chat.anotherUser, anotherEmail: chat.anotherUser_email}))
                                axios.get(`${url}`).then((data) => {
                                    axios.get(`${url}/${id}/getMessages/${data.data.filter((user: any) => user.user_email === chat.anotherUser_email)[0]._id}`).then((messagesRes) => {
                                        dispatch(actualMessages(messagesRes.data.chats.filter((user: any) => user.anotherUser_email === chat.anotherUser_email)[0].messages))
                                        console.log(messagesRes.data.chats.filter((user: any) => user.anotherUser_email === chat.anotherUser_email)[0])
                                        router.push(`/home/${chat.anotherUser_email}`)
                                        dispatch(setLoadingFalse())
                                    })
                                })
                            }}>
                                <h1 className=" text-lg font-medium">{chat.anotherUser}</h1>
                                <h2>{chat.anotherUser_email}</h2>
                            </article>  
                        )
                    })}
                </div>
                <button onClick={() => router.push("/home/addFriends")} className="mx-6 my-4 px-2 py-1 bg-black text-white flex justify-between items-center rounded">
                    <i className="fa-solid fa-user"></i>
                    <h1>Add friends</h1>
                </button>
            </div>
        </div>
    )
}
export default Menu