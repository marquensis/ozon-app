import { MODAL_CHANGE } from "../constants/constants";


export const modalHide = (modalName) => ({
    type: MODAL_CHANGE, 
    payload: {name: modalName, value: false},
});

export const modalShow = (modalName) => ({
    type: MODAL_CHANGE, 
    payload: {name: modalName, value: true},
});