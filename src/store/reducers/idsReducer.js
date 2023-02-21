import { IDS_ERROR, IDS_SUCCESS, IDS_START_REQUEST } from "../constants/constants";

const initialState = {
    requestStart: false,
    requestStatus: '',
    requestError: '',
    cartItemId: [],
}

export const cartIds = (state=initialState, action) => {
    switch(action.type) {
        case IDS_START_REQUEST :
            return {
                ...state,
                requestStart: action.payload,
            }
        case IDS_SUCCESS:
            return {
                ...state,
                requestStart: false,
                requestStatus: action.payload[0],
                requestError: '',
                cartItemId: [...state.cartItemId, ...action.payload[1]]
            }

        case IDS_ERROR:
            return {
                ...state,
                requestStart: false,
                requestStatus: action.payload[0],
                requestError: action.payload[1],
            };

        default: 
            return state;
    }
}