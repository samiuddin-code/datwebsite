const AppReducer = (state, action) => {
  switch(action.type) {
    case 'MODAL_STATE':
      return {
        ...state,
        modal: action.payload
    }
    default:
      return state;
  }
}
export default AppReducer;