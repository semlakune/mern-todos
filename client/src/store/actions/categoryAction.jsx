import {FETCH_CATEGORIES} from "./type/index.jsx";
import {API_URL} from "../../constants/api.jsx";

const categoriesFetchAction = (payload) => {
    return { type: FETCH_CATEGORIES, payload }
}

export const categoriesFetch = () => {
    return (dispatch) => {
        return fetch(API_URL + '/categories', {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', }
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then(categories => dispatch(categoriesFetchAction(categories)))
    }
}

export const categoriesAdd = (category) => {
    return (dispatch) => {
        return fetch(API_URL + '/categories', {
            method: 'POST',
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'application/json', },
            body: JSON.stringify(category)
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((_) => dispatch(categoriesFetch()))
    }
}

export const categoryDelete = (id) => {
    return (dispatch) => {
        return fetch(API_URL + '/categories/' + id, {
            method: 'DELETE',
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', }
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((_) => dispatch(categoriesFetch()))
    }
}