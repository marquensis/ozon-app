import { CHANGE_PRELOADER } from "../constants/constants";

export const offPreloader = () => {
    return (dispatch) => {
        dispatch({type: CHANGE_PRELOADER, payload: false});
    };
};