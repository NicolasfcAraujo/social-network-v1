const TextSpace = () => {
  return (
    <div className="flex justify-center items-center py-2 bg-slate-200">
        <form className=" h-6 w-5/6 rounded border border-slate-200 flex items-center px-6 py-5 bg-white">
            <input type="text" placeholder="Write something!" className=" outline-none w-5/6"/>
            <button type="submit" className="w-1/6 text-gray-500 flex justify-end">
                <i className="fa-solid fa-paper-plane"></i>
            </button>
        </form>
    </div>
  )
}
export default TextSpace