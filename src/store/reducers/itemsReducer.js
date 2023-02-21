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
                requestStatus: action.payload[0],
                requestError: '',
                allItems: [...state.allItems, ...action.payload[1]]
            }

        case ALL_ITEMS_ERROR:
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