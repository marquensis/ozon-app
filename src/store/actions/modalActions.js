import { MODAL_CHANGE, ERROR_TEXT_SET } from "../constants/constants";


export const modalHide = (modalName) => ({
    type: MODAL_CHANGE, 
    payload: {name: modalName, value: false},
});

export const modalShow = (modalName) => ({
    type: MODAL_CHANGE, 
    payload: {name: modalName, value: true},
});

export const setErrorText = (text) => ({
    type: ERROR_TEXT_SET,
    payload: text,
})