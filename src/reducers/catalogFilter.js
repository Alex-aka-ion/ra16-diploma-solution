import {CHANGE_CATALOG_FILTER, CHANGE_SEARCH_FILTER} from "../actions/actionTypes";

const initialState = {
    categoryId: 0,
    search: ''
};

export default function catalogFilterReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_CATALOG_FILTER:
            return {...state, categoryId: action.payload.categoryId};
        case CHANGE_SEARCH_FILTER:
            return {...state, search: action.payload.search};
        default:
            return state;
    }
}
