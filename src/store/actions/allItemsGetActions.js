import axios from 'axios';
import { ALL_ITEMS_ERROR, ALL_ITEMS_SUCCESS, ALL_ITEMS_START_REQUEST } from '../constants/constants';
import { error } from '../constants/constants';
import { modalShow, setErrorText } from './modalActions';

export const getItems = (currentPage) => {
    return async (dispatch) => {
        dispatch(startRequest());
        let itemsList = [];
        let status;
        let errorText = '';
        try {
            let response = await axios.get(`http://localhost:3001/api/v1/goods?page=${currentPage}`);
            status = response.status === 200 ? 'Success' : 'Failure';
            let data = response.data.goods;
            itemsList.push(...data);
        } catch (err) {
            errorText += `Сервер не отвечает. Невозможно получить список товаров - ошибка: ${err.message}. Подождите пожалуйста!`;
            setErrorText(errorText);
            dispatch(addItemsFailure({status: status, error: errorText}));
            modalShow(error);
            getItems();
        }
        if (status === 200 && itemsList.length === 0) {
            errorText = 'Список товаров недоступен. Попробуйте позже';
            setErrorText(errorText);
            modalShow(error);
        }
        dispatch(itemsSuccess({status: status, data: itemsList, error: errorText}));
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