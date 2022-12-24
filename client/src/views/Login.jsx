import {useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import img from "../assets/react.svg";
import {useDispatch} from "react-redux";
import {login} from "../store/actions/userAction.jsx";
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isValid, setIsValid] = useState(true)

    const validInput = "rounded-xl bg-neutral-200 p-3 px-5 h-14 w-80"
    const invalidInput = "rounded-xl bg-neutral-200 p-3 px-5 h-14 w-80 border-2 border-red-400"

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email: emailRef.current.value, password: passwordRef.current.value}))
            .then((_) => {
                navigate("/")
            })
            .catch(error => {
                setIsValid(false)
                const message = JSON.parse(error.message).message
                toast.error(message)
            })
    }
    return (
        <div className={"h-screen w-screen fixed bg-gradient-to-b from-sky-300 to-sky-100"}>
            <div className={"flex justify-center items-center h-screen w-screen"}>
                <div className={"max-w-md h-max my-auto rounded-3xl backdrop-blur-xl bg-neutral-100 p-16 text-center shadow-2xl space-y-5"}>
                    <div className={"flex justify-center items-center"}>
                        <img src={img} className={"w-12 h-12 logo react"} alt=""/>
                    </div>
                    <h1 className={"text-3xl"}>Hi, Welcome Back!</h1>
                    <form onSubmit={handleSubmit} className={"space-y-2 flex flex-col justify-center items-center"}>
                        <div>
                            <input ref={emailRef} onFocus={() => setIsValid(true)} type="email" placeholder={"test@mail.com"} className={isValid ? validInput : invalidInput}/>
                        </div>
                        <div>
                            <input ref={passwordRef} onFocus={() => setIsValid(true)} type="password" placeholder={"123456"} className={isValid ? validInput : invalidInput}/>
                        </div>
                        <div>
                            <button className={"rounded-xl h-full p-3 px-5 w-80 bg-sky-500 text-white hover:drop-shadow-2xl hover:bg-sky-600"}>Login</button>
                        </div>
                    </form>
                    <p>Don't have an account yet? <span><button onClick={() => navigate("/register")} className={"text-sky-600 hover:text-sky-800 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"}>Sign up</button></span></p>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}