import { MODAL_CHANGE } from "../constants/constants";

const initialState = {
    login: {
        visible: false,
    },
    error: {
        visible: false,
    }
}

export const modal = (state=initialState, action) => {
    // const name = action.payload[0];
    // const value = action.payload[1];
    const list = action.payload;
    switch(action.type) {
        case MODAL_CHANGE:
            return {...state, ...state[list['name']].visible = list['value']};

        default: 
            return state;
    }
}