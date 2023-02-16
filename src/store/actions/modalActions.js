import { CHANGE_MODAL } from "../constants/constants";

const show = 'show';
const hide = 'hide';

export const modalShow = () => {
    return (dispatch) => {
        dispatch({type: CHANGE_MODAL, payload: show});
    };
};

export const modalHide = () => {
    return (dispatch) => {
        dispatch({type: CHANGE_MODAL, payload: hide});
    };
};