import axios from 'axios';
import { ADD_ALL_ITEMS, ADD_CART_ITEM_ID, ADD_ITEMS_FAILURE, ADD_IDS_FAILURE } from "../constants/constants";

export const getItems = () => {
    const resultItems = [];
    return async (dispatch) => {
        let morePages = true;
        let currentPage = 0;
        try {
            while(morePages) {
                currentPage++;
                let response = await axios.get(`http://localhost:3001/api/v1/goods?page=${currentPage}`);
                let data = response.data.goods;
                resultItems.push(...data);
                morePages = currentPage < 2;
            }
        } catch (error) {
            dispatch(addItemsFailure(error.message));
        }
        dispatch(addItemsSuccess(resultItems));
    }
}
export const getIds = () => {
    let resultIds = [];
    return async (dispatch) => {
        try {
            let response = await axios.get(`http://localhost:3001/api/v1/cart`);
            let data = response.data;
            const ids = data.cart.map(o => o.id);
            resultIds = data.cart.filter(({id}, index) => !ids.includes(id, index + 1)).sort((a,b) => a.id > b.id ? -1 : 1);
        } catch (error) {
            dispatch(addIdsFailure(error.message));
        }
        dispatch(addIdsSuccess(resultIds));
    }
}

const addItemsSuccess = data => ({
    type: ADD_ALL_ITEMS,
    payload: data
});
const addItemsFailure = error => ({
    type: ADD_ITEMS_FAILURE,
    payload: error
});
const addIdsSuccess = data => ({
    type: ADD_CART_ITEM_ID,
    payload: data
});
const addIdsFailure = error => ({
    type: ADD_IDS_FAILURE,
    payload: error
});