import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {verify} from "../store/actions/userAction.jsx";
import img from "../assets/react.svg";

export default function Verify() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {token} = useParams()
    const [isVerified, setIsVerified] = useState(false)
    const [notVerified, setNotVerified] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("isVerified") === "true") {
            navigate("/")
        } else {
            dispatch(verify(token))
                .then((_) => {
                    setIsVerified(true)
                })
                .catch((err) => {
                    setNotVerified(true)
                })
        }
    }, [])

    useEffect(() => {
        if (notVerified) {
            setTimeout(() => {
                navigate("/register")
            }, 3000)
        }
    }, [notVerified])

    if (notVerified) {
        return (
            <div className={"h-screen w-screen fixed bg-gradient-to-b from-sky-300 to-sky-100"}>
                <div className={"flex justify-center items-center h-screen w-screen"}>
                    <div className={"max-w-lg h-max my-auto rounded-3xl backdrop-blur-xl bg-neutral-100 p-16 text-center shadow-2xl space-y-5"}>
                        <div className={"flex justify-center items-center"}>
                            <img src={img} className={"w-12 h-12 logo react"} alt=""/>
                        </div>
                        <p className={"text-xl"}>Code not match!</p>
                    </div>
                </div>
            </div>
        )
    }

    if (!isVerified) {
        setTimeout(() => {
            return (
                <div className={"h-screen w-screen fixed bg-gradient-to-b from-sky-300 to-sky-100"}>
                    <div className={"flex justify-center items-center h-screen w-screen"}>
                        <div className={"max-w-lg h-max my-auto rounded-3xl backdrop-blur-xl bg-neutral-100 p-16 text-center shadow-2xl space-y-5"}>
                            <div className={"flex justify-center items-center"}>
                                <img src={img} className={"w-12 h-12 logo react"} alt=""/>
                            </div>
                            <p className={"text-xl"}>Please wait...</p>
                        </div>
                    </div>
                </div>
            )
        }, 4000)
    } else {
        return (
            <div className={"h-screen w-screen fixed bg-gradient-to-b from-sky-300 to-sky-100"}>
                <div className={"flex justify-center items-center h-screen w-screen"}>
                    <div className={"max-w-lg h-max my-auto rounded-3xl backdrop-blur-xl bg-neutral-100 p-16 text-center shadow-2xl space-y-5"}>
                        <div className={"flex justify-center items-center"}>
                            <img src={img} className={"w-12 h-12 logo react"} alt=""/>
                        </div>
                        <p className={"text-xl"}>Great! your account is now verified  🎉</p>
                        <p><button onClick={() => navigate("/login")} className={"text-sky-600 hover:text-sky-800 transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"}>Sign In</button></p>
                    </div>
                </div>
            </div>
        )
    }
}