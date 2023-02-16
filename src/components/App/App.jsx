import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import LoginWindow from "../LoginWindow/LoginWindow";
import Preloader from "../Prelodaer/Preloader";
import "swiper/css/bundle";

// yarn mb start --configfile api.ejs


function App () {
    
    return (
        <>
            <Preloader /> : 
            <>
                <LoginWindow />
                <AppHeader/>
                <ShoppingCart />
                <RecommendedList />
            </>
        </>
    )
}
export default App;