import { TOTAL_UPDATE } from "../constants/constants";

export const updateActualTotal = () => {
    return (dispatch, getState) => {
        const {cartItems} = getState().cart;
        const newTotal = {
            weight: cartItems.reduce((prev, current) => {
                return (prev + current.updatedWeight) || 0
            }, 0),
            value: cartItems.reduce((prev, current) => {
                return (prev + current.value) || 0
            }, 0),
            price: cartItems.reduce((prev, current) => {
                return (prev + current.updatedPrice) || 0
            }, 0),
            totalPrice: cartItems.reduce((prev, current) => {
                return (prev + current.updatedDiscount) || 0
            }, 0),
            discount: cartItems.reduce((prev, current) => {
                return (prev + current.totalPrice) || 0
            }, 0),
        };
        dispatch(updateData(newTotal));
    };
}

const updateData = data => ({
    type: TOTAL_UPDATE,
    payload: data
});