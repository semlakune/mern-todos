import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import img from "../assets/react.svg";

export default function Check() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("isVerified") === "true") {
            navigate("/")
        }
    }, [])

    return (
        <div className={"h-screen w-screen fixed bg-gradient-to-b from-sky-300 to-sky-100"}>
            <div className={"flex justify-center items-center h-screen w-screen"}>
                <div className={"max-w-md h-max my-auto rounded-3xl backdrop-blur-xl bg-neutral-100 p-16 text-center shadow-2xl space-y-5"}>
                    <div className={"flex justify-center items-center"}>
                        <img src={img} className={"w-12 h-12 logo react"} alt=""/>
                    </div>
                    <p className={"text-xl"}>Please check your email and verify your account 😉</p>

                </div>
            </div>
        </div>
    )
}