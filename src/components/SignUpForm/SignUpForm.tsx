import { createUser } from "@/redux/features/userSlice"
import Link from "next/link"
import { SetStateAction, useEffect, useState } from "react"
import { useDispatch } from "react-redux"

type Props = {
    widthType: string | undefined
}

const SignUpForm = (props: Props) => {
    const [formHeight, setFormHeight] = useState<number>(0)
    const [userName, setUserName] = useState<string>()
    const [userEmail, setUserEmail] = useState<string>()
    const [userPass, setUserPass] = useState<string>()
    const dispatch = useDispatch()

    const handleCheckWidth = () => {
        if (props.widthType !== "desktop") {
            setFormHeight(48)
        } else {
            setFormHeight(0)
        }
    }

    const handleChangeForm = (e: { target: { name: string; value: SetStateAction<string | undefined> } }) => {
        if(e.target.name === "name") {
            setUserName(e.target.value)
        } else if (e.target.name === "email") {
            setUserEmail(e.target.value)
        } else if (e.target.name === "password") {
            setUserPass(e.target.value)
        }
    }

    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault()
        dispatch(createUser({
            user_name: userName,
            user_email: userEmail,
            user_pass: userPass,
            avatar_url: ""
        }))
    }

    useEffect(() => handleCheckWidth())
    useEffect(() => {
        window.addEventListener("resize", () => handleCheckWidth())
    })
    return (
        <div style={{height: `calc(100vh - ${formHeight}px)`}} className="pb-6">
            <div className="h-1/6">
                <h2 className="font-medium text-3xl">Sign Up</h2>
            </div>
            <form className="flex flex-col justify-between h-5/6" onSubmit={handleSubmit}>
                <div>
                    <div style={{display: "grid", gridTemplateColumns: "100px 250px"}} className="py-2">
                        <label htmlFor="name">name</label>
                        <input type="text" name="name" value={userName} onChange={handleChangeForm} placeholder="Your name" className=" outline-none bg-slate-100 rounded px-2 py-1"/>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "100px 250px"}} className="py-2">
                        <label htmlFor="email">email</label>
                        <input type="email" name="email" value={userEmail} onChange={handleChangeForm} placeholder="Your email address" className=" outline-none bg-slate-100 rounded px-2 py-1"/>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "100px 250px"}} className="py-2">
                        <label htmlFor="password">password</label>
                        <input type="password" name="password" value={userPass} onChange={handleChangeForm} placeholder="Your password" className=" outline-none bg-slate-100 rounded px-2 py-1"/>
                    </div>
                    <div style={{display: "grid", gridTemplateColumns: "100px 250px"}} className="py-2">
                        <label htmlFor="image">Avatar</label>
                        <input type="file" name="image" id="" />
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <Link href="/" className="flex items-center">
                        <i className="fa-solid fa-arrow-left text-xl"></i>
                        <h3 className="px-2">Back to home</h3>
                    </Link>
                    <button type="submit" className="flex items-center">
                        <h3 className="px-2">Sign Up</h3>
                        <i className="fa-solid fa-arrow-right text-xl"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}
export default SignUpForm