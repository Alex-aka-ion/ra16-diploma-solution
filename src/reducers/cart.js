import {ADD_TO_CART, REMOVE_FROM_CART, RESET_CART} from "../actions/actionTypes";

const initialState = [];

export default function cartReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TO_CART:
            console.log(action.payload);
            const {id, size, price, quantity, title} = action.payload;
            const index = state.findIndex(o => o.id === id && o.size === size);
            console.log('got index', index);
            if (index === -1) {
                console.log('add new item');
                return [...state, {id, size, price, quantity, title}];
            } else {
                const newQuantity = state[index].quantity + quantity;
                console.log('increase quantity', newQuantity);
                return [
                    ...state.slice(0, index),
                    {...state[index], quantity: newQuantity},
                    ...state.slice(index + 1)
                ];
            }
        case REMOVE_FROM_CART:
            const {id: rid, size: rsize} = action.payload;
            console.log('remove in cart', rid, rsize);
            return state.filter(o => !(o.id === rid && o.size === rsize));
        case RESET_CART:
            return [...initialState];
        default:
            return state;
    }
}
