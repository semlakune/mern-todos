import {USER_SET_USER} from "../actions/type/index.jsx";

const initialState = {
    user: {},
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_SET_USER:
            return { ...state, user: action.payload }
        default:
            return state
    }
}

export default userReducer