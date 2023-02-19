import { ALL_ITEMS_ADD, ALL_ITEMS_ERROR , ALL_ITEMS_SUCCESS} from "../constants/constants";

const initialState = {
    requestStart: true,
    requestStatus: '',
    requestError: '',
    allItems: [],
}

export const allItems = (state=initialState, action) => {
    switch(action.type) {

        case ALL_ITEMS_ADD:
            return {
                ...state,  
                allItems: [...state.allItems, ...action.payload]
            };

        case ALL_ITEMS_SUCCESS:
            return {
                ...state,
                requestStart: false,
                requestStatus: action.payload,
                requestError: '',
            }

        case ALL_ITEMS_ERROR:
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