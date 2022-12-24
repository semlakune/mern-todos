import {combineReducers} from "redux";
import userReducer from "./user.jsx";
import categoryReducer from "./category.jsx";
import todoReducer from "./todo.jsx";

const rootReducer = combineReducers({
    userReducer,
    categoryReducer,
    todoReducer
})

export default rootReducer;