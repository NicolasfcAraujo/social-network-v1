import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Menu from "@/components/Menu/Menu"
import Posts from "@/components/Posts/Posts"

const index = () => {
    const { name } = useSelector((state: RootState) => state.user)
    const router = useRouter()

    useEffect(() => {
        if(name === ""){
            router.push("/")
        }
    })

    return (
        <main style={{display: "grid", gridTemplateColumns: "300px 1fr"}}>
            <Menu/>
            <Posts/>
        </main>
    )
}
export default index