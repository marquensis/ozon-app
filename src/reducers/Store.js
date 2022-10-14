import React from 'react';
import { createStore } from 'redux';

const HIDE = 'HIDE';
const SHOW = 'SHOW';

function showHideModal (state = HIDE, action) {
  if (action.type === 'SHOW') {
    return SHOW;
  } else if (action.type === 'HIDE') {
    return HIDE;
  } 
  return state;
}

const store = createStore(showHideModal, HIDE);

store.subscribe(() =>
  console.log(store.getState())
);

export default store;