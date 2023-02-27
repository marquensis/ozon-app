import axios from 'axios';
import { IDS_ERROR, IDS_SUCCESS, IDS_START_REQUEST } from '../constants/constants';
import { error } from '../constants/constants';
import { modalShow, setErrorText } from './modalActions';

export const getIds = () => {
    return async (dispatch) => {
        dispatch(startRequest());
        let idsList = [];
        let status;
        let errorText = '';
        try {
            let response = await axios.get(`http://localhost:3001/api/v1/cart`);
            status = response.status === 200 ? 'Success' : 'Failure';
            let data = response.data;
            const ids = data.cart.map(o => o.id);
            idsList = data.cart.filter(({id}, index) => !ids.includes(id, index + 1)).sort((a,b) => a.id > b.id ? -1 : 1);
            
        } catch (err) {
            errorText += `Сервер не отвечает. Невозможно получить товары корзины - ошибка: ${err.message}. Подождите пожалуйста!`;
            setErrorText(errorText);
            dispatch(addIdsFailure({status: status, error: errorText}));
            modalShow(error);
            getIds();
        }
        if (status === 200 && idsList.length === 0) {
            errorText = 'Список товаров недоступен. Попробуйте позже';
            setErrorText(errorText);
            modalShow(error);
        }
        dispatch(idsSuccess({status: status, data: idsList, error: errorText}));
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