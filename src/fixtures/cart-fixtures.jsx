import cartItemsId from "./cart-item-id";
import recItems from "./fixtures";

const cartItems = cartItemsId.map((item) => {
    const id = (rec) => item.id === rec.id;
    const equalId = recItems.find(id);
    return Object.assign({}, equalId, item);
});

export default cartItems;