import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from '../redux';
import { ListsState } from '../redux/list';
import {CardsState} from "../redux/card";
import logger from "../middlewares/logger";


export interface IStore {
    lists: ListsState,
    cards: CardsState
}

let composeEnhancers = compose;
const middlewares = [
    logger
];

if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

const configureStore = (initialState?: IStore) => {
    return createStore(
        rootReducer,
        initialState,
        composeEnhancers(
            applyMiddleware(...middlewares)
        )
    )
};

export default configureStore;