import { ALL_ITEMS_ERROR , ALL_ITEMS_SUCCESS, ALL_ITEMS_START_REQUEST } from "../constants/constants";

const initialState = {
    requestStart: false,
    requestStatus: '',
    requestError: '',
    allItems: [],
}

export const allItems = (state=initialState, action) => {
    switch(action.type) {
        case ALL_ITEMS_START_REQUEST:
            return {
                ...state,
                requestStart: action.payload,
            }
        case ALL_ITEMS_SUCCESS:
            return {
                ...state,
                requestStart: false,
                requestStatus: action.payload['status'],
                requestError: action.payload['error'],
                allItems: [...state.allItems, ...action.payload['data']]
            }

        case ALL_ITEMS_ERROR:
            return {
                ...state,
                requestStart: false,
                requestStatus: action.payload['status'],
                requestError: action.payload['error'],
            };

        default: 
            return state;
    }
}