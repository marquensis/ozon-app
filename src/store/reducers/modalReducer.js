import { MODAL_LOGIN_CHANGE, MODAL_ERROR_CHANGE } from "../constants/constants";

const initialState = {
    login: {
        visible: false,
    },
    error: {
        visible: false,
    }
}

export const modal = (state=initialState, action) => {
    switch(action.type) {
        case MODAL_LOGIN_CHANGE:
            return {...state, ...state.login.visible = action.payload};
        
        case MODAL_ERROR_CHANGE:
            return {...state, ...state.error.visible = action.payload};

        default: 
            return state;
    }
}