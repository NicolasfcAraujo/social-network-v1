import Menu from "@/components/Menu/Menu"
import TextSpace from "@/components/TextSpace/TextSpace"
import { RootState } from "@/redux/store"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

const index = () => {
    const { name } = useSelector((state: RootState) => state.user)
    const [ contactName, setContactName ] = useState("")
    const [ contactEmail, setContactEmail ] = useState("")
    const router = useRouter()

    const handleChangeChat = () => {
        axios.get("https://social-network-api-b728.onrender.com/api/users").then((data) => {
            setContactName(data.data.filter((user: any) => user.user_email === router.query.chatEmail)[0].user_name)
            setContactEmail(data.data.filter((user: any) => user.user_email === router.query.chatEmail)[0].user_email)
        })
    }

    useEffect(() => {
        if(name === ""){
            router.push("/")
        }
    })

    useEffect(() => {
        handleChangeChat()
    },[])
    useEffect(() => {
        window.addEventListener("change", () => {
            console.log("mudou")
        })
    })

    return (
        <main style={{display: "grid", gridTemplateColumns: "300px 1fr"}}>
            <Menu/>
            <section>
                <div style={{height: "calc(100vh - 57.6px)"}} className=" overflow-y-scroll">
                    <div className=" p-4 bg-gray-400" style={{height: "88px"}}>
                        <h1 className=" text-lg font-medium">{contactName}</h1>
                        <h2>{contactEmail}</h2>
                    </div>

                </div>
                <TextSpace/>
            </section>
        </main>
    )
}
export default index