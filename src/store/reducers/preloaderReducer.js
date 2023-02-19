import { PRELOADER_CHANGE } from "../constants/constants";

const initialState = {
    displayPreloader: true,
}

export const preloader = (state=initialState, action) => {
    switch(action.type) {
        case PRELOADER_CHANGE:
            return {...state, displayPreloader: action.payload};

        default: 
            return state;
    }
}