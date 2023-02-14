import { UPDATE_TOTAL } from "../types/types";

export const updateActualTotal = (cartItems) => {
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
    return updateData(newTotal);
}

const updateData = data => ({
    type: UPDATE_TOTAL,
    payload: data
});