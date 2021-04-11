import {POST_ORDER_FAILURE, POST_ORDER_REQUEST, POST_ORDER_SUCCESS} from "../actions/actionTypes";

const initialState = {
    body: {},
    loading: false,
    error: null
}

export default function postOrderReducer(state = initialState, action) {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return {...state, body: action.payload.body, loading: true, error: null}
        case POST_ORDER_FAILURE:
            return {...state, loading: false, error: action.payload.error.message}
        case POST_ORDER_SUCCESS:
            return {...state, body: {}, loading: false, error: null}
        default:
            return state;
    }
}
