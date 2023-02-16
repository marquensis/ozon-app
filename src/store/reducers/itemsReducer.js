import { ADD_ALL_ITEMS, ADD_CART_ITEM_ID, ADD_IDS_FAILURE, ADD_ITEMS_FAILURE } from "../constants/constants";

const initialState = {
    cartItemId: [],
    allItems: [], 
    errorItems: '',
    errorIds: '',
}

export const itemsAndIds = (state=initialState, action) => {
    switch(action.type) {
        case ADD_CART_ITEM_ID:
            return {
                ...state, 
                cartItemId: action.payload
            };

        case ADD_ALL_ITEMS:
            return {
                ...state,  
                allItems: action.payload
            };

        case ADD_ITEMS_FAILURE:
            return {
                ...state,
                errorItems: action.payload.errorItems
            };

        case ADD_IDS_FAILURE:
            return {
                ...state,
                errorItems: action.payload.errorItems
            };

        default: 
            return state;
    }
}