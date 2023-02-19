import { PRELOADER_CHANGE } from "../constants/constants";

export const offPreloader = () => {
    return (dispatch) => {
        dispatch({type: PRELOADER_CHANGE, payload: false});
    };
};

export const onPreloader = () => {
    return (dispatch) => {
        dispatch({type: PRELOADER_CHANGE, payload: true});
    };
};