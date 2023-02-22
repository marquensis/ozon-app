import { MODAL_CHANGE, ERROR_TEXT_SET } from "../constants/constants";

const initialState = {
    login: {
        visible: false,
    },
    error: {
        visible: false,
        textError: '',
    }
}

export const modal = (state=initialState, action) => {
    // const name = action.payload[0];
    // const value = action.payload[1];
    const list = action.payload;
    switch(action.type) {
        case MODAL_CHANGE:
            return {
                ...state, 
                ...state[list['name']].visible = list['value']
            };
        case ERROR_TEXT_SET:
            return {
                ...state,
                ...state.error.textError = action.payload,
            };
        default: 
            return state;
    }
}