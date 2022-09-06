import { types } from '../';

const initialState = {
  selectedTab: '',
  headerShown: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    case types.TOGGLE_APP_HEADER:
      return {
        ...state,
        headerShown: action.payload,
      };
    default:
      return state;
  }
};
