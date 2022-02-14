import CartActionTypes from "./cart.types";
import { AddItemToList } from "./cart.utils";

const INITIAL_STATE = {
    hidden: true,
    listItem: []
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return {
                ...state,
                hidden: !state.hidden,
            }

        case CartActionTypes.ADD_ITEM:
            return {
                ...state,
                listItem: AddItemToList(state.listItem, action.payload)
            }
        default:
            return state;

    }
}

export default cartReducer;