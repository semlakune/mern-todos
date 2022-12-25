import {FETCH_TODO_BY_CATEGORY, FETCH_TODOS} from "./type/index.jsx";
import {API_URL} from "../../constants/api.jsx";

const todosFetchAction = (payload) => {
    return { type: FETCH_TODOS, payload }
}

const todosByCategoryFetchAction = (payload) => {
    return { type: FETCH_TODO_BY_CATEGORY, payload }
}

export const todosFetch = () => {
    return (dispatch) => {
        return fetch(API_URL + '/todos', {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', }
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then(todos => dispatch(todosFetchAction(todos)))
    }
}

export const todosByCategoryFetch = (id) => {
    return (dispatch) => {
        return fetch(API_URL + '/todos/category/' + id, {
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', }
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then(todos => dispatch(todosByCategoryFetchAction(todos)))
    }
}

export const todoAdd = (todo) => {
    return (dispatch) => {
        return fetch(API_URL + '/todos', {
            method: 'POST',
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'application/json', },
            body: JSON.stringify(todo)
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((_) => dispatch(todosFetch()))
    }
}

export const todoUpdate = (todo) => {
    return (dispatch) => {
        return fetch(API_URL + '/todos/' + todo.id, {
            method: 'PATCH',
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'application/json', },
            body: JSON.stringify(todo.status)
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((_) => dispatch(todosFetch()))
    }
}

export const todoDelete = (id) => {
    return (dispatch) => {
        return fetch(API_URL + '/todos/' + id, {
            method: 'DELETE',
            headers: { 'access_token': localStorage.access_token, 'Content-Type': 'x-www-form-urlencoded', }
        })
            .then(res => {
                if (!res.ok) return res.text().then(text => { throw new Error(text) })
                else return res.json();
            })
            .then((_) => dispatch(todosFetch()))
    }
}