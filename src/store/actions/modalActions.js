import { MODAL_CHANGE } from "../constants/constants";

const show = 'show';
const hide = 'hide';

export const modalShow = () => {
    return (dispatch) => {
        dispatch({type: MODAL_CHANGE, payload: show});
    };
};

export const modalHide = () => {
    return (dispatch) => {
        dispatch({type: MODAL_CHANGE, payload: hide});
    };
};