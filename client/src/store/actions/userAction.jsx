import {API_URL} from "../../constants/api.jsx";

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
    }
}