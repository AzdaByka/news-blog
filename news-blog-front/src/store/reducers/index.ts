import {combineReducers} from "redux";
import {userReducer} from "./userReducer";
import {articleReducer} from "./articleReducer";


export const rootReducer = combineReducers({
    user: userReducer,
    article: articleReducer
})

export type RootState = ReturnType<typeof rootReducer>