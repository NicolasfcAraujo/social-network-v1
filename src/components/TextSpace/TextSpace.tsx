import { RootState } from "@/redux/store"
import axios from "axios"
import { useRouter } from "next/router"
import { useState } from "react"
import { useSelector } from "react-redux"

type Props = {
  submitType: "home" | "chat"
}

const url = "https://social-network-api-b728.onrender.com/api/users"

const TextSpace = (props: Props) => {
  const { id } = useSelector((state: RootState) => state.user)
  const [value, setValue] = useState<string>()
  const router = useRouter()

  const handleChangeValue = () => {
    setValue((document.getElementById("textInput") as HTMLInputElement).value)
  }

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    if (props.submitType === "home") {

    } else if (props.submitType === "chat"){
      console.log("enviando para chat")
      axios.get(`${url}`).then((data) => {
        console.log(data.data.filter((user: any) => user.user_email === router.query.chatEmail)[0]._id)
        axios.put(`${url}/${id}/sendMessageTo/${data.data.filter((user: any) => user.user_email === router.query.chatEmail)[0]._id}`, { text: value, who: id }).then(() => {
          setValue("")
          console.log({ text: value, who: id })
        })
      })
    }
  }

  return (
    <div className="flex justify-center items-center py-2 bg-slate-200">
        <form className=" h-6 w-5/6 rounded border border-slate-200 flex items-center px-6 py-5 bg-white" onSubmit={handleSubmit}>
            <input type="text" id="textInput" value={value} onChange={handleChangeValue} placeholder="Write something!" className=" outline-none w-5/6"/>
            <button type="submit" className="w-1/6 text-gray-500 flex justify-end">
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </div>
  )
}
export default TextSpace
