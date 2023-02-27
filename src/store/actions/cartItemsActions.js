import {nanoid} from 'nanoid';
import { CART_ITEMS_ADD, CART_ITEMS_DELETE, CART_ITEMS_CHANGE } from '../constants/constants';
import { offPreloader } from './preloaderActions';
import { updateActualTotal } from './totalActions';

export const cartItemCreate = () => {
    return (dispatch, getState) => {
        dispatch(offPreloader());
        const {allItems} = getState().allItems;
        const {cartItemId} = getState().cartIds;
        const {cartItems} = getState().cart;
        const idsListSet = new Set(cartItems.map(item => item.id));
        const idsList = Array.from(idsListSet);
        let itemsList = [];
        if (cartItemId && allItems) {
            cartItemId.forEach((item) => {
                const equalId = allItems.find(recVal => item.id === recVal.id);
                const eachItem = (equalId === undefined) ? {} : {
                    ...item,
                    ...equalId,
                    ...{
                        key: nanoid(),
                        updatedPrice: equalId.price * equalId.value,
                        updatedWeight: equalId.weight * equalId.value,
                        updatedDiscount: (equalId.price * equalId.value) * equalId.discount / 100,
                        totalPrice: (equalId.price * equalId.value) - (equalId.price * equalId.value) * equalId.discount / 100
                    }
                };
                if (!idsList.includes(eachItem.id)) {
                    itemsList.push(eachItem);
                }

            })
        }
        dispatch(itemsAdd(itemsList));
        dispatch(updateActualTotal());
    }
}

export const cartItemDelete = (itemId) => {
    return (dispatch) => {
        dispatch(itemsDelete(itemId));
    }
}

export const resetCartValue = (itemId, newValue) => {
    return (dispatch) => {
        dispatch(itemsChange({id: itemId, value: +newValue}));
        dispatch(updateActualTotal());
    }
}

const itemsAdd = data => ({
    type: CART_ITEMS_ADD,
    payload: data
});

const itemsDelete = data => ({
    type: CART_ITEMS_DELETE,
    payload: data
});

const itemsChange = data => ({
    type: CART_ITEMS_CHANGE,
    payload: data
});