import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import RecommendedList from "../Recommended/Recommended";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import ShadowView from "../ShadowView/ShadowView";
import cartItemsId from "../../fixtures/cart-item-id";
import recItems from "../../fixtures/fixtures";
import "swiper/css/bundle";
import ShowHideContext from "../../contexts/ContextView";

function App () {

    const [view, setView] = useState('hide');

    return (
        <>  
            <ShowHideContext.Provider value={{view, setView}}>
                <ShadowView />
                <AppHeader/>
                <ShoppingCart cartId={cartItemsId} rec={recItems}/>
                <RecommendedList rec={recItems}/>
            </ShowHideContext.Provider>
        </>
    )
}
export default App;