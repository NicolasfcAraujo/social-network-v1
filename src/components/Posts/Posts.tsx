import { useDispatch, useSelector } from "react-redux"
import TextSpace from "../TextSpace/TextSpace"
import { RootState } from "@/redux/store"
import { setIsMenu } from "@/redux/features/userSlice"
import { useEffect } from "react"

const Posts = () => {
  const { isWidthMobile } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setIsMenu(false))
  }, [])


  return (
    <section>
      { isWidthMobile &&
          <div onClick={() => {dispatch(setIsMenu(true))}} className="flex justify-start items-center text-xl p-6 cursor-pointer" >
              <i className="fa-solid fa-arrow-left"></i>
              <h2 className="pl-6">Home</h2>
          </div>
      }
      { isWidthMobile || <h2 className="p-6 text-xl">Home</h2>}
      <div style={{height: "calc(100vh - 57.6px - 76px)"}} className=" overflow-y-scroll">

      </div>
      <TextSpace submitType="home"/>
    </section>
  )
}
export default Posts