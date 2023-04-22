import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useRef } from "react"

export default function Home() {
  const router = useRouter()

  const handleLogin = () => {
    document.getElementById("video")?.classList.add("backgroundAnimation")
    document.getElementById("blackBg")?.classList.add("bgBlackAnimation")

    setTimeout(() => {
      router.push("/login")
    }, 1000)
  }

  const handleSignUp = () => {
    document.getElementById("video")?.classList.add("backgroundAnimation")
    document.getElementById("blackBg")?.classList.add("bgBlackAnimation")

    setTimeout(() => {
      router.push("/signup")
    }, 1000)
  }

  return (
    <main className="h-screen">
      <video id="video" autoPlay loop muted style={{
        width: "100%",
        height: "100%",
        objectFit: "cover"
      }}>
        <source src={"/videos/pexels-tima-miroshnichenko-4729132-1280x720-30fps.mp4"}/>
      </video>
      <div id="blackBg" className="bg-black"/>
      <div className="h-screen w-screen fixed top-0 flex flex-col justify-center items-center">
        <h1 className="font-semibold text-8xl text-center text-white">
          social network
        </h1>
        <div className=" w-2/5 flex justify-around pt-6 text-xl font-medium text-white">
          <button id="buttons" onClick={handleSignUp} className="border border-white px-2 py-1">Sign Up</button>
          <button id="buttons" onClick={handleLogin} className="border border-white px-2 py-1">Login</button>
        </div>
      </div>
    </main>
  )
}
 