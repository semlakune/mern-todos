import {API_URL} from "../../constants/api.jsx";
import {USER_SET_USER} from "./type/index.jsx";

const userSetUserAction = (payload) => {
    return { type: USER_SET_USER, payload }
}
export const login = (payload) => {
    return (dispatch) => {
        return fetch(API_URL + "/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
            .then((res) => {
                if (!res.ok) return res.text().then(text => {
                    throw new Error(text)
                } )
                else return res.json()
            })
            .then((data) => localStorage.setItem("access_token", data.access_token))
    }
}

export const register = (payload) => {
    return (dispatch) => {
        return fetch(API_URL + "/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload)
        })
            .then((res) => {
                if (!res.ok) return res.text().then(text => {
                    throw new Error(text)
                } )
                else return res.json()
            })
            .then((user) => {
                dispatch(userSetUserAction(user))
            })
    }
}

export const verify = (payload) => {
    return (dispatch) => {
        return fetch(API_URL + "/verify/" + payload, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
        })
            .then((res) => {
                if (!res.ok) return res.text().then(text => {
                    throw new Error(text)
                } )
                else return res.json()
            })
            .then((data) => {
                localStorage.setItem("isVerified", data.isVerified)
            })
    }
}