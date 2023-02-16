import { combineReducers } from 'redux';
import { cart } from './cartReducer';
import { itemsAndIds } from './itemsReducer';
import { modal } from './modalReducer';
import { preloader } from './preloaderReducer';
import { recommended } from './recommendedReducer';

// main reducer
export const rootReducer = combineReducers({
  cart,
  itemsAndIds,
  recommended,
  modal,
  preloader
});
