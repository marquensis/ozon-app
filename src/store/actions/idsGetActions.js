import axios from 'axios';
import { IDS_ERROR, IDS_SUCCESS, IDS_START_REQUEST } from '../constants/constants';

export const getIds = () => {
    return async (dispatch, getState) => {
        dispatch(startRequest());
        let {requestStart} = getState().cartIds;
        let idsList = [];
        let status;
        if(requestStart) {
            try {
                let response = await axios.get(`http://localhost:3001/api/v1/cart`);
                status = response.status === 200 ? 'Success' : 'Failure';
                let data = response.data;
                const ids = data.cart.map(o => o.id);
                idsList = data.cart.filter(({id}, index) => !ids.includes(id, index + 1)).sort((a,b) => a.id > b.id ? -1 : 1);
                
            } catch (error) {
                dispatch(addIdsFailure(status, error.message));
            }
            dispatch(idsSuccess([status, idsList]));
        }
    }
}
const startRequest = () => ({
    type: IDS_START_REQUEST,
    payload: true
})
const idsSuccess = data => ({
    type: IDS_SUCCESS,
    payload: data
})
const addIdsFailure = error => ({
    type: IDS_ERROR,
    payload: error
});