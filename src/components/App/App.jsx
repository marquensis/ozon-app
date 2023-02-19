import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import LoginWindow from "../LoginWindow/LoginWindow";
import Preloader from "../Prelodaer/Preloader";
import Errors from "../Errors/Errors";
import "swiper/css/bundle";
import { Provider } from "react-redux";
import { store } from "../../store";

// yarn mb start --configfile api.ejs


function App () {
    
    return (
        <>
            <Provider store={store}>
                <Preloader />
                <Errors />
                <LoginWindow />
                <AppHeader/>
                <ShoppingCart />
                <RecommendedList />
            </Provider>
        </>
    )
}
export default App;