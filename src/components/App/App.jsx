import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import cartItems from "../../fixtures/cart-fixtures";
import recItems from "../../fixtures/fixtures";
import "swiper/css/bundle";

function App () {
    return (
        <div id="app">
            <AppHeader/>
            <ShoppingCart cart={cartItems}/>
            <RecommendedList rec={recItems}/>
        </div>
    )
}

export default App;