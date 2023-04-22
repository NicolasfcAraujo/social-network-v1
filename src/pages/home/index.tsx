import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { RootState } from "@/redux/store"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { logout } from "@/redux/features/userSlice"

const index = () => {
    const { name, user_email } = useSelector((state: RootState) => state.user)
    const router = useRouter()
    const dispatch = useDispatch()

    useEffect(() => {
        if(name === ""){
            router.push("/")
        }
    })

    return (
        <main style={{display: "grid", gridTemplateColumns: "300px 1fr"}}>
            <div className="border-r border-slate-200 h-screen">
                <div className=" bg-black flex justify-center items-center">
                    <h1 className="text-white font-medium text-4xl p-6" >social network</h1>
                </div>
                <div className="border-b border-slate-200 w-full p-6">
                    <h2>{name}</h2>
                    <h3>{user_email}</h3>
                    <button onClick={() => dispatch(logout())}>Logout</button>
                    <div>
                        <button>Home</button>
                    </div>
                </div>
            </div>
            <section>

            </section>
        </main>
    )
}
export default index