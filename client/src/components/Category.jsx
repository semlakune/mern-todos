import {useState} from "react";
import toast from "react-hot-toast";
import {useDispatch} from "react-redux";
import {categoryDelete} from "../store/actions/categoryAction.jsx";

export default function Category(props) {
    const {category, handleTodoByCategory} = props
    const dispatch = useDispatch()
    const [isFocus, setIsFocus] = useState(false)
    const [isConfirm, setIsConfirm] = useState(false)
    const [categoryId, setCategoryId] = useState("")

    const handleConfirm = (id) => {
        setCategoryId(id)
        setIsConfirm(true)

    }
    const closeConfirm = () => {
        setIsConfirm(false)
        setCategoryId("")
    }
    const handleDelete = () => {
        dispatch(categoryDelete(categoryId))
            .then((_) => {
                toast.success("Category " + category.name + " has been deleted")
                window.location.reload()
                closeConfirm()
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const localHandleTodoByCategory = () => {
        handleTodoByCategory(category._id)
    }
    return (
        <>
            <li className={"grid grid-cols-2 p-1"}>
                <button onClick={() => localHandleTodoByCategory()} onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} className={"focus:bg-sky-400 focus:text-white hover:bg-sky-300 hover:text-white rounded-xl p-2"}>{category.name}</button>
                {isFocus ? <button><i onMouseDown={() => handleConfirm(category._id)} className="fa-duotone fa-trash text-red-600"></i></button> : null}
            </li>
            <div onClick={() => closeConfirm()} className={isConfirm ? "fixed w-screen h-screen inset-0 backdrop-blur-sm z-10" : "hidden"}>
                <div onClick={(e) => e.stopPropagation()} className={"m-auto mt-52 rounded-xl max-w-sm h-32 bg-white p-5"}>
                    <p>Are you sure?</p>
                    <div className={"flex justify-end items-end space-x-2"}>
                        <button onClick={() => closeConfirm()} className={"bg-red-600 text-white rounded-md p-2 px-3"}>Cancel</button>
                        <button onClick={() => handleDelete()} className={"bg-green-600 text-white rounded-md p-2 px-3"}>Yes</button>
                    </div>
                </div>
            </div>
        </>
    )
}