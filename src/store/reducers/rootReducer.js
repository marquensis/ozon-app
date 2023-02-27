import { combineReducers } from 'redux';
import { cart } from './cartReducer';
import { allItems } from './itemsReducer';
import { modal } from './modalReducer';
import { preloader } from './preloaderReducer';
import { recommended } from './recommendedReducer';
import { cartIds } from './idsReducer';

// main reducer
export const rootReducer = combineReducers({
  allItems,
  cartIds,
  recommended,
  cart,
  modal,
  preloader
});
