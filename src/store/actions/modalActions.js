import { MODAL_LOGIN_CHANGE , MODAL_ERROR_CHANGE} from "../constants/constants";

export const modalShow = (modalName) => {
    return (dispatch) => {
        if(modalName === 'login') {
            dispatch(loginModal(true));
        } else if (modalName === 'error') {
            dispatch(errorModal(true));
        }
    };
};

export const modalHide = (modalName) => {
    return (dispatch) => {
        if(modalName === 'login') {
            dispatch(loginModal(false));
        } else if (modalName === 'error') {
            dispatch(errorModal(false));
        }
    };
};


const loginModal = data => ({
    type: MODAL_LOGIN_CHANGE, 
    payload: data
});

const errorModal = data => ({
    type: MODAL_ERROR_CHANGE, 
    payload: data
});