import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import {combineEpics, createEpicMiddleware} from "redux-observable";
import catalogFilterReducer from "../reducers/catalogFilter";
import cartReducer from "../reducers/cart";
import {postOrderEpic, saveStateToLocalStorageEpic} from "../epics";
import postOrderReducer from "../reducers/postOrder";

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const reducer = combineReducers({
    catalogFilter: catalogFilterReducer,
    cart: cartReducer,
    postOrder: postOrderReducer
});

const epic = combineEpics(
    saveStateToLocalStorageEpic,
    postOrderEpic
);

const epicMiddleware = createEpicMiddleware();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    persistedState,
    composeEnhancers(applyMiddleware(epicMiddleware))
);

epicMiddleware.run(epic);

export default store;
