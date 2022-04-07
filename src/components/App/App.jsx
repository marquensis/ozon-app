import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import "swiper/css/bundle";

function App () {
    return (
        <div id="app">
            <AppHeader/>
            <ShoppingCart/>
            <RecommendedList/>
        </div>
    )
}
export default App;