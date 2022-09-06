import { types } from '../';

function setSelectedTab(selectedTab) {
  return dispatch => {
    dispatch({ type: types.SET_SELECTED_TAB, payload: selectedTab });
  };
}

function toggleAppHeader(isHeaderVisible) {
  return dispatch => {
    dispatch({ type: types.TOGGLE_APP_HEADER, payload: isHeaderVisible });
  };
}
export default { setSelectedTab, toggleAppHeader };
