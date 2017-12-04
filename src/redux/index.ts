import {combineReducers} from "redux";
import listsReducer from "./list"
import cardsReducer from "./card"

export default combineReducers({
    lists: listsReducer,
    cards:cardsReducer
});