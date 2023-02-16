import { CHANGE_PRELOADER } from "../constants/constants";

const initialState = {
    displayPreloader: true,
}

export const preloader = (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_PRELOADER:
            return {...state, displayPreloader: action.payload};

        default: 
            return state;
    }
}