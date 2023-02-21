import axios from 'axios';
import { ALL_ITEMS_ERROR, ALL_ITEMS_SUCCESS, ALL_ITEMS_START_REQUEST } from '../constants/constants';

export const getItems = (currentPage) => {
    return async (dispatch, getState) => {
        dispatch(startRequest());
        let {requestStart} = getState().allItems;
        let itemsList = [];
        let status;
        if (requestStart) {
            try {
                let response = await axios.get(`http://localhost:3001/api/v1/goods?page=${currentPage}`);
                status = response.status === 200 ? 'Success' : 'Failure';
                let data = response.data.goods;
                itemsList.push(...data);
            } catch (error) {
                dispatch(addItemsFailure([status, error.message]));
            }
            dispatch(itemsSuccess([status, itemsList]));
        }
    }
}
const startRequest = () => ({
    type: ALL_ITEMS_START_REQUEST,
    payload: true,
})

const itemsSuccess = data => ({
    type: ALL_ITEMS_SUCCESS,
    payload: data
})

const addItemsFailure = error => ({
    type: ALL_ITEMS_ERROR,
    payload: error
});