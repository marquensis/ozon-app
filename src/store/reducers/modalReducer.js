import { CHANGE_MODAL } from "../constants/constants";

const initialState = {
    view: 'hide',
}

export const modal = (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_MODAL:
            return {...state, view: action.payload};

        default: 
            return state;
    }
}