import { CHANGE_REC_ITEMS } from "../constants/constants";

const initialState = {
    recItems: [],
}

export const recommended = (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_REC_ITEMS:
            return {...state, recItems: action.payload};

        default: 
            return state;
    }
}