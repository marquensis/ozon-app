import { RECOMMEDED_ITEMS_ADD } from "../constants/constants";

const initialState = {
    recItems: [],
}

export const recommended = (state=initialState, action) => {
    switch(action.type) {
        case RECOMMEDED_ITEMS_ADD:
            return {...state, recItems: [...state.recItems, ...action.payload]};

        default: 
            return state;
    }
}