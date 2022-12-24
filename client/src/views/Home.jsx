import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import Category from "../components/Category.jsx";
import {useDispatch, useSelector} from "react-redux";
import {categoriesAdd, categoriesFetch} from "../store/actions/categoryAction.jsx";

export default function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const categoryRef = useRef()
    const {categories} = useSelector(state => state.categoryReducer)
    const [isHover, setIsHover] = useState(false)
    const [isAddCategory, setIsAddCategory] = useState(false)
    const logout = () => {
        localStorage.clear()
        navigate("/login")
    }
    const handleAddCategory = (e) => {
        e.preventDefault()
        dispatch(categoriesAdd({name: categoryRef.current.value}))
            .then((_) => {
                setIsAddCategory(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        dispatch(categoriesFetch())
    }, [])
    return (
        <div className={"h-screen w-screen fixed p-10 flex flex-row"}>
            <div className={"flex-initial h-full w-1/4 p-10 pb-20 bg-gradient-to-r from-sky-200 to-transparent rounded-tl-3xl rounded-bl-3xl"}>
                <div className={"h-full overflow-y-scroll flex-wrap scrollbar"}>
                    <div className={"pb-10"}>
                        <ul className={"space-y-5"}>
                            <li className={"grid grid-cols-2 p-1"}>
                                <button className={"focus:bg-sky-400 focus:text-white hover:bg-sky-300 hover:text-white rounded-xl p-2"}>All task</button>
                            </li>
                            {categories?.map(category => <Category key={category._id} category={category}/>)}
                            {isAddCategory ?
                                <li className={"grid grid-cols-2"}>
                                    <form onSubmit={handleAddCategory}>
                                        <div className={"p-1 flex flex-row justify-center items-center space-x-2 w-56"}>
                                            <input ref={categoryRef} onBlur={() => setIsAddCategory(false)} type="text" className={"p-2 px-2.5 rounded-xl mx-auto w-full"}/>
                                            <span><button onMouseDown={() => {
                                                dispatch(categoriesAdd({name: categoryRef.current.value}))
                                                    .then((_) => {
                                                        setIsAddCategory(false)
                                                    })
                                                    .catch((err) => {
                                                        console.log(err)
                                                    })
                                            }
                                            }><i className="fa-duotone fa-floppy-disk text-2xl text-green-600"></i></button></span>
                                            <span><button onMouseDown={() => setIsAddCategory(false)}><i className="fa-duotone fa-circle-xmark text-2xl text-red-600"></i></button></span>
                                        </div>
                                    </form>
                                </li>
                                :
                                null
                            }
                            <li className={"grid grid-cols-2 p-1"}><button onClick={() => setIsAddCategory(true)} className={"p-2 px-3 rounded-xl bg-sky-300 text-white hover:bg-sky-400"}><span><i className="fa-duotone fa-folder-plus mr-2"></i></span>Add Category</button></li>
                        </ul>
                    </div>
                </div>
                <div className={"flex justify-start items-start"}>
                    <button onClick={logout} className={"flex items-center"}>
                        <i onMouseEnter={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)} className={!isHover ? "fa-duotone text-4xl fa-door-closed" : "fa-duotone text-4xl text-red-700 fa-door-open"}></i>
                        {isHover ? <h1 className={"text-xl ml-4 text-red-700 font-black animate-bounce"}>Sign Out</h1> : null}
                    </button>
                </div>
            </div>
            <div className={"flex-initial h-full w-3/4 p-10 bg-gradient-to-br from-sky-200 rounded-3xl pb-20"}>
                <div className={"h-full"}>
                    <ul className={"space-y-3"}>
                        <li className={"flex flex-row space-x-2"}>
                            <input type="checkbox" id={"check"}/>
                            <label htmlFor="check">Test</label>
                        </li>
                    </ul>
                </div>
                <div className={"flex justify-end items-end"}>
                    <button><i className="fa-duotone fa-circle-plus text-5xl transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none hover:drop-shadow-2xl"></i></button>
                </div>
            </div>
        </div>
    )
}