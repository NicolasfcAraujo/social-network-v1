import { useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Menu from "@/components/Menu/Menu"

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
            <section>

            </section>
        </main>
    )
}
export default index