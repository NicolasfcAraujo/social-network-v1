import LogInForm from "@/components/LoginForm/LogInForm"
import { useEffect, useState } from "react"

type screenType = "smartphone" | "tablet" | "desktop" 

const Index = () => {
  const [widthSize, setWidthSize] = useState<screenType>()

  const handleCheckWidth = () => {
    if (window.innerWidth >= 1200){
      setWidthSize("desktop")
    } else if (750 <= window.innerWidth && window.innerWidth < 1200) {
      setWidthSize("tablet")
    } else if (window.innerWidth < 750) {
      setWidthSize("smartphone")
    }
    console.log(widthSize)
  }

  useEffect(() => handleCheckWidth())
  useEffect(() => {
    window.addEventListener("resize",() => handleCheckWidth())
  })
    return (
      <main className=" bg-black w-screen h-screen grid" style={{ gridTemplateColumns: widthSize==="smartphone" ? "1fr 9fr": "1fr 500px"}}>
          <div className=" h-full flex justify-center items-center">
            {widthSize === "desktop" && 
              <h1 className="text-white text-8xl font-medium">
                social network
              </h1>
            }
          </div>
          <div className=" bg-white h-full px-6 py-4">
            {widthSize === "desktop" ||
              <h1 className="text-5xl font-medium" id="logo">
                social network
              </h1>
            }
            <LogInForm widthType={widthSize}/>
          </div>
      </main>
    )
  }
  export default Index