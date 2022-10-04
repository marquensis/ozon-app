import React from 'react';
import { createStore } from 'redux';

function nextStateId(newState) {
  const maxId = newState.reduce((maxId, state) => Math.max(state.id, maxId), -1)
  return maxId + 1
}

function showHideModal (state = false, action) {
    switch (action.type) {
        case true:
          return {
            ...state, 
            newState: [
              {
                id: nextStateId(state.newState),
                completed: true
              }
            ]
          }
        default:
          return state
    }
}

const store = createStore(showHideModal, [false]);

store.subscribe(() =>
  console.log(store.getState())
)

export default store;