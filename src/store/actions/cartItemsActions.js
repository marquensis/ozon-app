import {nanoid} from 'nanoid';
import { CHANGE_CART_ITEMS } from '../constants/constants';
import { offPreloader } from './preloaderActions';
import { updateActualTotal } from './totalActions';

export const createCartItems = (cartId, recItems) => {
    let cartItems = [];
    return (dispatch) => {
        if (cartId && recItems) {
            cartId.forEach((item) => {
                const equalId = recItems.find(recVal => item.id === recVal.id);
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
        dispatch(updateActualTotal(cartItems));
        dispatch(offPreloader());
    }
}

export const resetCartValue = (cartItems, itemId, newValue) => {
    return (dispatch) => {
        cartItems.forEach((el, id) => {
            itemId === el.id ? cartItems[id].value = +newValue : cartItems[id].value = el.value;
            cartItems[id].updatedPrice = el.price * el.value;
            cartItems[id].updatedWeight = el.weight * el.value;
            cartItems[id].updatedDiscount = (el.price * el.value) * el.discount / 100;
            cartItems[id].totalPrice = (el.price * el.value) - (el.price * el.value) * el.discount / 100;
        });
        dispatch(changeItems(cartItems));
        dispatch(updateActualTotal(cartItems));
    };
}

const changeItems = data => ({
    type: CHANGE_CART_ITEMS,
    payload: data
});