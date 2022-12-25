import {FETCH_TODO_BY_CATEGORY, FETCH_TODOS} from "../actions/type/index.jsx";

const initialState = {
    todos: [],
    todoByCategory: []
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TODOS:
            return { ...state, todos: action.payload }
        case FETCH_TODO_BY_CATEGORY:
            return { ...state, todoByCategory: action.payload }
        default:
            return state
    }
}

export default todoReducer