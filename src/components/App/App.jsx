import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import cartItemsId from "../../fixtures/cart-item-id";
import recItems from "../../fixtures/fixtures";
import "swiper/css/bundle";

const cartItems = cartItemsId.map((item) => {
    const equalId = recItems.find(rec => rec.id === item.id);
    return { ...item, ...equalId };
})

function App () {
    return (
        <>
            <AppHeader/>
            <ShoppingCart cart={cartItems}/>
            <RecommendedList rec={recItems}/>
        </>
    )
}

export default App;