import Menu from "@/components/Menu/Menu"
import TextSpace from "@/components/TextSpace/TextSpace"
import { RootState } from "@/redux/store"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const url = "https://social-network-api-b728.onrender.com/api/users"

const index = () => {
    const { name, id, actualChat } = useSelector((state: RootState) => state.user)
    const [ messages, setMessages ] = useState<{text: string, who: string}[]>([])
    const router = useRouter()

    const handleGetMessages = () => {
        axios.get(`${url}`).then((data) => {
            axios.get(`${url}/${id}/getMessages/${data.data.filter((user: any) => user.user_email === actualChat.anotherEmail)[0]._id}`).then((messagesRes) => {
                setMessages(messagesRes.data.chats.filter((user: any) => user.anotherUser_email === actualChat.anotherEmail)[0].messages)
            })
        })
    }

    useEffect(() => {
        if(name === ""){
            router.push("/")
        }
    })

    useEffect(() => {
        setInterval(() => {
            handleGetMessages()
        }, 1000)
    }, [])

    return (
        <main style={{display: "grid", gridTemplateColumns: "300px 1fr"}}>
            <Menu/>
            <section>
                <div style={{height: "calc(100vh - 57.6px)"}} className=" overflow-y-scroll">
                    <div className=" p-4 bg-gray-400" style={{height: "88px"}}>
                        <h1 className=" text-lg font-medium">{actualChat.anotherUser}</h1>
                        <h2>{actualChat.anotherEmail}</h2>
                    </div>
                    <div className=" overflow-y-scroll">
                        {messages.map((message) => {
                            let side = ""
                            let color = ""

                            if (message.who === id) {
                                side = "flex-end"
                                color = "rgb(60, 60, 60)"
                            } else {
                                side = "flex-start"
                                color = "rgb(100, 100, 100)"
                            }

                            return (

                                <div style={{display: "flex", justifyContent: side}} className=" p-4">
                                    <article style={{background: color, color: "white", maxWidth: "80%"}} className=" px-4 pt-4 pb-5 rounded">
                                        {message.text}
                                    </article>    
                                </div>
                            )
                        })}
                    </div>
                </div>
                <TextSpace submitType="chat" />
            </section>
        </main>
    )
}
export default index