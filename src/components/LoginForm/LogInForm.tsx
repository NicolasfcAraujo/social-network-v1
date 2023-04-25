import Link from "next/link"
import { SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import loading from "../../../public/loadingGIF.gif"
import Image from "next/image"
import axios from "axios"
import { useRouter } from "next/router"
import { changeUser } from "@/redux/features/userSlice"

type Props = {
    widthType: string | undefined
}

const url = "https://social-network-api-b728.onrender.com/api/users"

const LogInForm = (props: Props) => {
    const [formHeight, setFormHeight] = useState<number>(0)
    const [userEmail, setUserEmail] = useState<string>()
    const [userPass, setUserPass] = useState<string>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")
    const dispatch = useDispatch()
    const router = useRouter()

    const handleCheckWidth = () => {
        if (props.widthType !== "desktop") {
            setFormHeight(48)
        } else {
            setFormHeight(0)
        }
    }

    const handleChangeForm = (e: { target: { name: string; value: SetStateAction<string | undefined> } }) => {
        if (e.target.name === "email") {
            setUserEmail(e.target.value)
        } else if (e.target.name === "password") {
            setUserPass(e.target.value)
        }
    }

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault()
        setIsLoading(true)
        const loginBody = {
            user_email: userEmail,
            user_pass: userPass 
        } 
        console.log(loginBody)
        const serverLogin = await axios.post(`${url}/login`, loginBody)

        console.log(serverLogin)

        const response = await axios.get(`${url}/verify/${JSON.parse(serverLogin.request.response).user._id}`,
                 {headers: {"Authorization": `${JSON.parse(serverLogin.request.response).token}`}})

        if(!response){
            setError("Authentication error")
        }
        
        console.log(JSON.parse(serverLogin.request.response).user.chats.map((chat: any) => {return chat.anotherUser_email}))

        dispatch(changeUser({user_name: JSON.parse(serverLogin.request.response).user.user_name,
                             user_email: JSON.parse(serverLogin.request.response).user.user_email,
                             exp: response.data.decoded.exp,
                             _id: JSON.parse(serverLogin.request.response).user._id,
                             chats: JSON.parse(serverLogin.request.response).user.chats.map((chat: any) => {return chat.anotherUser_email})}))
            
        router.push("/home")
        }

    useEffect(() => handleCheckWidth())
    useEffect(() => {
        window.addEventListener("resize", () => handleCheckWidth())
    })
    return (
        <div style={{height: `calc(100vh - ${formHeight}px)`}} className="pb-6">
            <div className="h-1/6">
                <h2 className="font-medium text-3xl">Login</h2>
            </div>
            <form className="flex flex-col justify-between h-5/6" onSubmit={handleSubmit}>
                <div>
                    <div style={{display: "grid", gridTemplateColumns: "100px 250px"}} className="py-2">
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" value={userEmail} onChange={handleChangeForm} placeholder="Your email address" className=" outline-none bg-slate-100 rounded px-2 py-1"/>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "100px 250px"}} className="py-2">
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" value={userPass} onChange={handleChangeForm} placeholder="Your password" className=" outline-none bg-slate-100 rounded px-2 py-1"/>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <i className="fa-solid fa-arrow-left text-xl"></i>
                        <h3 className="px-2">Back to home</h3>
                    </Link>
                    {isLoading && 
                        <div>
                            <Image src={loading} alt="loading gif" className="h-7 w-7"/>
                        </div>
                    }
                    <button type="submit" className="flex items-center">
                        <h3 className="px-2">Login</h3>
                        <i className="fa-solid fa-arrow-right text-xl"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
export default LogInForm