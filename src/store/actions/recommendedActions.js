import {nanoid} from 'nanoid';
import { CHANGE_REC_ITEMS } from '../constants/constants';

export const createRecItems = () => {
    let recListCreate = [];
    return (dispatch, getState) => {
        const {allItems} = getState().itemsAndIds;
        allItems.forEach((item) => {
            const eachItem = (item === undefined) ? {} : {
                ...item,
                ...{
                    key: nanoid(),
                    totalPrice: item.price - (item.price / 100 * item.discount)
                }
            };
            recListCreate.push(eachItem);
        });
        dispatch(changeItems(recListCreate));
    }
}

const changeItems = data => ({
    type: CHANGE_REC_ITEMS,
    payload: data
});