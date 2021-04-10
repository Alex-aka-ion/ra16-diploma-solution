import {
    ADD_TO_CART,
    CHANGE_CATALOG_FILTER,
    CHANGE_SEARCH_FILTER, POST_ORDER_FAILURE,
    POST_ORDER_REQUEST, POST_ORDER_SUCCESS,
    REMOVE_FROM_CART, RESET_CART
} from "./actionTypes";

export function changeCatalogFilter(categoryId) {
    return {type: CHANGE_CATALOG_FILTER, payload: {categoryId}};
}

export function changeSearchFilter(search) {
    return {type: CHANGE_SEARCH_FILTER, payload: {search}};
}

export function addToCart(id, size, price, quantity, title) {
    return {type: ADD_TO_CART, payload: {id, size, price, quantity, title}};
}

export function removeFromCart(id, size) {
    return {type: REMOVE_FROM_CART, payload: {id, size}}
}

export function postOrderRequest(body) {
    return {type: POST_ORDER_REQUEST, payload: {body}}
}

export function postOrderSuccess() {
    return {type: POST_ORDER_SUCCESS}
}

export function postOrderFailure(error) {
    return {type: POST_ORDER_FAILURE, payload: {error}}
}

export function resetCart() {
    return {type: RESET_CART}
}
