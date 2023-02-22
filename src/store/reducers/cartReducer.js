import { CART_ITEMS_ADD, CART_ITEMS_DELETE, CART_ITEMS_CHANGE, TOTAL_UPDATE } from "../constants/constants";

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

        case CART_ITEMS_ADD:
            return {
                ...state, 
                cartItems: [...state.cartItems, ...action.payload]
            };

        case CART_ITEMS_DELETE:
            return {...state, cartItems: [...state.cartItems.splice(state.cartItems.findIndex(item => item.id === action.payload), 1)]};

        case CART_ITEMS_CHANGE:
            return {
                ...state, 
                cartItems: [
                    ...state.cartItems.map((item) => ({
                        ...item,
                        value: action.payload['id'] === item.id ? action.payload['value'] : item.value,
                        updatedPrice: action.payload['id'] === item.id ? item.price * action.payload['value'] : item.price * item.value,
                        updatedWeight: action.payload['id'] === item.id ? item.weight * action.payload['value'] : item.weight * item.value,
                        updatedDiscount: action.payload['id'] === item.id ? (item.price * action.payload['value']) * item.discount / 100 : (item.price * item.value) * item.discount / 100,
                        totalPrice: action.payload['id'] === item.id ? (item.price * action.payload['value']) - (item.price * action.payload['value']) * item.discount / 100 : (item.price * item.value) - (item.price * item.value) * item.discount / 100,
                    })
                    )
                ]
            };
      
        case TOTAL_UPDATE:
            return {...state, totalCount: action.payload};

        default: 
            return state;
    }
}