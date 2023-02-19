import { MODAL_CHANGE } from "../constants/constants";

const initialState = {
    view: 'hide',
}

export const modal = (state=initialState, action) => {
    switch(action.type) {
        case MODAL_CHANGE:
            return {...state, view: action.payload};

        default: 
            return state;
    }
}