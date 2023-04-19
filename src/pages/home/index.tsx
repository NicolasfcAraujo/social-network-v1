import { TypedUseSelectorHook, useSelector } from "react-redux"
import { RootState } from "@/redux/store"

const index = () => {
    const { name, user_email } = useSelector((state: RootState) => state.user)
    return (
        <main style={{display: "grid", gridTemplateColumns: "300px 1fr"}}>
            <div className="border-r border-slate-200 h-screen">
                <div className=" bg-black flex justify-center items-center">
                    <h1 className="text-white font-medium text-4xl p-6" >social network</h1>
                </div>
                <div className="border-b border-slate-200 w-full p-6">
                    <h2>{name}</h2>
                    <h3>{user_email}</h3>
                    <button>Logout</button>
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