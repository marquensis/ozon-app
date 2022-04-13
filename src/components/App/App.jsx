import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import cartItemsId from "../../fixtures/cart-item-id";
import recItems from "../../fixtures/fixtures";
import "swiper/css/bundle";

function App () {
    return (
        <>
            <AppHeader/>
            <ShoppingCart cartId={cartItemsId} rec={recItems}/>
            <RecommendedList rec={recItems}/>
        </>
    )
}

export default App;