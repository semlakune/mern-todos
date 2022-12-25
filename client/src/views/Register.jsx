import img from "../assets/react.svg";
import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {register} from "../store/actions/userAction.jsx";
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const verifyPasswordRef = useRef();
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [isValid, setIsValid] = useState(true)

    const validClass = "rounded-xl bg-neutral-200 p-3 px-5 h-14 w-80"
    const invalidClass = "rounded-xl bg-neutral-200 p-3 px-5 h-14 w-80 border-2 border-red-400"
    const handleSubmit = (e) => {
        e.preventDefault();
        if (passwordRef.current.value !== verifyPasswordRef.current.value) {
            setIsValid(false)
            toast.error("Password did not match")
        } else {
            setIsValid(true)
            dispatch(register({email: emailRef.current.value, password: passwordRef.current.value}))
                .then((_) => {
                    navigate("/check")
                })
                .catch((error) => {
                    const message = JSON.parse(error.message).message
                    toast.error(message)
                })
        }

    }
    return (
        <div className={"h-screen w-screen fixed bg-gradient-to-b from-sky-300 to-sky-100"}>
            <div className={"flex justify-center items-center h-screen w-screen"}>
                <div className={"max-w-md h-max my-auto rounded-3xl backdrop-blur-xl bg-neutral-100 p-16 text-center shadow-2xl space-y-5"}>
                    <div className={"flex justify-center items-center"}>
                        <img src={img} className={"w-12 h-12 logo react"} alt=""/>
                    </div>
                    <h1 className={"text-3xl"}>Register your account</h1>
                    <form onSubmit={handleSubmit} className={"space-y-2 flex flex-col justify-center items-center"}>
                        <div>
                            <input ref={emailRef} type="email" placeholder={"Email"} className={"rounded-xl bg-neutral-200 p-3 px-5 h-14 w-80"}/>
                        </div>
                        <div>
                            <input ref={passwordRef} onFocus={() => setIsValid(true)} type="password" placeholder={"Password"} className={isValid ? validClass : invalidClass}/>
                        </div>
                        <div>
                            <input ref={verifyPasswordRef} onFocus={() => setIsValid(true)} type="password" placeholder={"Please re-enter your password"} className={isValid ? validClass : invalidClass}/>
                        </div>
                        <div>
                            <button className={"rounded-xl h-full p-3 px-5 w-80 bg-sky-500 text-white hover:drop-shadow-2xl hover:bg-sky-600"}>Sign up</button>
                        </div>
                    </form>
                    <p>Already have an account? <span><button onClick={() => navigate("/login")} className={"text-sky-600 hover:text-sky-800 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"}>Sign in</button></span></p>
                </div>
            </div>
            <Toaster/>
        </div>
    )
}