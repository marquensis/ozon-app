import {nanoid} from 'nanoid';
import { CHANGE_CART_ITEMS } from '../constants/constants';
import { offPreloader } from './preloaderActions';
import { updateActualTotal } from './totalActions';

export const createCartItems = () => {
    let cartItems = [];
    return (dispatch, getState) => {
        const {allItems} = getState().itemsAndIds;
        const {cartItemId} = getState().itemsAndIds;
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
                cartItems.push(eachItem);
            })
        }
        dispatch(changeItems(cartItems));
        dispatch(updateActualTotal());
        dispatch(offPreloader());
    }
}

export const resetCartValue = (itemId, newValue) => {
    return (dispatch, getState) => {
        const {cartItems} = getState().cart;
        cartItems.forEach((el, id) => {
            itemId === el.id ? cartItems[id].value = +newValue : cartItems[id].value = el.value;
            cartItems[id].updatedPrice = el.price * el.value;
            cartItems[id].updatedWeight = el.weight * el.value;
            cartItems[id].updatedDiscount = (el.price * el.value) * el.discount / 100;
            cartItems[id].totalPrice = (el.price * el.value) - (el.price * el.value) * el.discount / 100;
        });
        dispatch(changeItems(cartItems));
        dispatch(updateActualTotal());
    };
}

const changeItems = data => ({
    type: CHANGE_CART_ITEMS,
    payload: data
});