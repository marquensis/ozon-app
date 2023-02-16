import { CHANGE_CART_ITEMS, UPDATE_TOTAL } from "../constants/constants";

const initialState = {
    cartItems: [],
    totalCount: [{
        weight: 0,
        count: 0,
        price: 0,
        totalPrice: 0,
        discount: 0,
      }],
}

export const cart = (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_CART_ITEMS:
            return {...state, cartItems: action.payload};
      
        case UPDATE_TOTAL:
            return {...state, totalCount: action.payload};

        default: 
            return state;
    }
}