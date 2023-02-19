import axios from 'axios';
import { IDS_ADD, IDS_ERROR, IDS_SUCCESS } from '../constants/constants';

export const getIds = () => {
    return async (dispatch, getState) => {
        let {requestStart} = getState().cartIds;
        let status;
        if(requestStart) {
            try {
                let response = await axios.get(`http://localhost:3001/api/v1/cart`);
                status = response.status === 200 ? 'Success' : 'Failure';
                let data = response.data;
                const ids = data.cart.map(o => o.id);
                dispatch(addIds(data.cart.filter(({id}, index) => !ids.includes(id, index + 1)).sort((a,b) => a.id > b.id ? -1 : 1)));
                dispatch(idsSuccess(status));
            } catch (error) {
                dispatch(addIdsFailure(status, error.message));
            }
        }
    }
}

const addIds = data => ({
    type: IDS_ADD,
    payload: data
});
const idsSuccess = data => ({
    type: IDS_SUCCESS,
    payload: data
})
const addIdsFailure = error => ({
    type: IDS_ERROR,
    payload: error
});