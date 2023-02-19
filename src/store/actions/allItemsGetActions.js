import axios from 'axios';
import { ALL_ITEMS_ADD, ALL_ITEMS_ERROR, ALL_ITEMS_SUCCESS } from '../constants/constants';

export const getItems = () => {
    return async (dispatch, getState) => {
        let {requestStart} = getState().allItems;
        let morePages = true;
        let currentPage = 0;
        let status;
        if (requestStart) {
            try {
                while(morePages) {
                    currentPage++;
                    let response = await axios.get(`http://localhost:3001/api/v1/goods?page=${currentPage}`);
                    status = response.status === 200 ? 'Success' : 'Failure';
                    let data = response.data.goods;
                    dispatch(addItems(data));
                    morePages = currentPage < 2;
                    if(currentPage === 2) dispatch(itemsSuccess(status));
                }
            } catch (error) {
                dispatch(addItemsFailure([status, error.message]));
            }
        }
    }
}

const addItems = data => ({
    type: ALL_ITEMS_ADD,
    payload: data
});

const itemsSuccess = data => ({
    type: ALL_ITEMS_SUCCESS,
    payload: data
})

const addItemsFailure = error => ({
    type: ALL_ITEMS_ERROR,
    payload: error
});