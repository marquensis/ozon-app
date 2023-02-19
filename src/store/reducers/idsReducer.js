import { IDS_ADD, IDS_ERROR, IDS_SUCCESS } from "../constants/constants";

const initialState = {
    requestStart: true,
    requestStatus: '',
    requestError: '',
    cartItemId: [],
}

export const cartIds = (state=initialState, action) => {
    switch(action.type) {
        case IDS_ADD:
            return {
                ...state, 
                cartItemId: [...state.cartItemId, ...action.payload]
            };

        case IDS_SUCCESS:
            return {
                ...state,
                requestStart: false,
                requestStatus: action.payload,
                requestError: '',
            }

        case IDS_ERROR:
            return {
                ...state,
                requestStart: true,
                requestStatus: action.payload[0],
                requestError: action.payload[1],
            };

        default: 
            return state;
    }
}