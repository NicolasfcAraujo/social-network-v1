import { addChat, setIsMenu } from "@/redux/features/userSlice"
import { RootState } from "@/redux/store"
import axios, { AxiosResponse } from "axios"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const url = "https://social-network-api-b728.onrender.com/api/users"

const AddFriendComponent = () => {
    const [ isLoading, setIsLoading ] = useState<boolean>(true)
    const [ response, setResponse ] = useState<AxiosResponse | null | undefined>()
    const [ error, setError ] = useState(null)
    const { id, name, user_email, chats, isWidthMobile } = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        axios.get("https://social-network-api-b728.onrender.com/api/users").then((data) => {
            setIsLoading(false)
            setResponse(data)
        }).catch((error) => {
            setError(error)
        })
    })

    return (
        <section className=" overflow-y-scroll h-screen">
            {isLoading ?
                <div className="h-full w-full flex justify-center items-center">
                    <img src="/loadingGIF.gif" alt="loading" className=" w-10 h-10"/> 
                </div>
            :
                <div className="p-6">
                    { isWidthMobile &&
                        <div onClick={() => {dispatch(setIsMenu(true))}} className="flex justify-start items-center text-xl pb-6 cursor-pointer" >
                            <i className="fa-solid fa-arrow-left"></i>
                            <h2 className="pl-6">Add Friends</h2>
                        </div>
                    }
                    { isWidthMobile || <h2 className="pb-6 text-xl">Add Friends</h2>}
                    {response!.data.map((user: any) => {
                        if(chats.includes(user.user_email)){
                            return
                        }
                        if(user_email === user.user_email) {
                            return
                        }

                        return (
                            <div className="flex justify-between w-80 p-4 mb-6 border border-slate-200 rounded">
                                <div>
                                    <h1>{user.user_name}</h1>
                                    <h2>{user.user_email}</h2>
                                </div>
                                <div className="flex items-center cursor-pointer" onClick={() => {
                                    console.log(`${url}/${id}/createChat/${user._id}`)
                                    axios.put(`${url}/${id}/createChat/${user._id}`, {
                                        person: name,
                                        person_email: user_email,
                                        anotherUser: user.user_name,
                                        anotherUser_email: user.user_email
                                    }).then(() => {
                                        dispatch(addChat(user.user_email))
                                        router.push("/home")
                                        console.log("ok")
                                    })
                                }}>
                                    <i className="fa-solid fa-plus"></i>
                                    <h2>Add</h2>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </section>
    )
}
export default AddFriendComponent