import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Menu from "@/components/Menu/Menu"
import Posts from "@/components/Posts/Posts"
import { setIsMenu } from "@/redux/features/userSlice"

const Index = () => {
    const { name, isMenu, isWidthMobile } = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if(name === ""){
            router.push("/")
        }
    })
    
    return (
        <main style={{display: "grid", gridTemplateColumns: `${isWidthMobile ? "1fr" : "300px 1fr"}`}}>
            <div style={{ background: `${isWidthMobile ? isMenu ? "rgb(0,0,0,0.1)" : "" : ""}`, zIndex: `${isWidthMobile ? isMenu ? "10": "" : ""}`}} className={isWidthMobile ? isMenu ? "fixed h-screen w-screen top-0 left-0" : "" : ""}>
                <Menu/>
            </div>
            <Posts/>
        </main>
    )
}
export default Index