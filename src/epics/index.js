import {ofType} from "redux-observable";
import {
    ADD_TO_CART,
    CHANGE_CATALOG_FILTER,
    POST_ORDER_REQUEST,
    REMOVE_FROM_CART,
    RESET_CART
} from "../actions/actionTypes";
import {catchError, debounceTime, ignoreElements, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {ajax} from "rxjs/ajax";
import {postOrderFailure, postOrderSuccess, resetCart} from "../actions/actionCreators";
import {of} from "rxjs";

export const saveStateToLocalStorageEpic = (action$, state$) => action$.pipe(
    ofType(ADD_TO_CART, REMOVE_FROM_CART, RESET_CART, CHANGE_CATALOG_FILTER),
    debounceTime(1000),
    tap(action => {
            console.log('epic', state$.value)
            localStorage.setItem('reduxState', JSON.stringify(state$.value))
        }
    ),
    ignoreElements()
);

export const postOrderEpic = action$ => action$.pipe(
    ofType(POST_ORDER_REQUEST),
    tap(o => console.log(o)),
    switchMap(o => ajax.post(
        `${process.env.REACT_APP_API_URL}order`,
        JSON.stringify(o.payload.body),
        {'Content-Type': 'application/json'}).pipe(
        tap(o => alert('Заказ успешно размещен!')),
        mergeMap(o => [resetCart(), postOrderSuccess()]),
        catchError(e => of(postOrderFailure(e))),
        ),
    )
)
