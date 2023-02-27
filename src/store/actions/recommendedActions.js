import {nanoid} from 'nanoid';
import { RECOMMEDED_ITEMS_ADD } from '../constants/constants';

export const createRecItems = () => {
    return (dispatch, getState) => {
        const {allItems} = getState().allItems;
        const {recItems} = getState().recommended;
        const idsListSet = new Set(recItems.map(item => item.id));
        const idsList = Array.from(idsListSet);
        let itemsList = [];
        allItems.forEach((item) => {
            const eachItem = (item === undefined) ? {} : {
                ...item,
                ...{
                    key: nanoid(),
                    totalPrice: item.price - (item.price / 100 * item.discount)
                }
            };

            if (!idsList.includes(eachItem.id)) {
                itemsList.push(eachItem);
            }
        });
        dispatch(changeItems(itemsList));
    }
}

const changeItems = data => ({
    type: RECOMMEDED_ITEMS_ADD,
    payload: data
});