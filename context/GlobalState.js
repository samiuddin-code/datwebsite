import React, { createContext, useReducer } from 'react';
import AppReducer from '@/context/AppReducer';

// Initial state
const initialState = {
  modal:false
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function modalState() {
    dispatch({
      type: 'MODAL_STATE',
      payload: !state.modal
    });
  }

  return (<GlobalContext.Provider value={{
    modal: state.modal,
    modalState,
  }}>
    {children}
  </GlobalContext.Provider>);
}