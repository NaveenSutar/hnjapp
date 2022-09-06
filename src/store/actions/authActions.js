import LocalStorageService from '../../services/LocalStorageService';
import http from '../../services/HttpService';
import { utils } from '../../utils';
import { types } from '../';
import { SCREENS } from '../../constants';
import { userActions } from '../index';

let timer;

const localStorageService = LocalStorageService.getService();

function sendOtp(mobile, navigation) {
  return async () => {
    try {
      const response = await http.get('/user/otp', { params: { mobile } });
      navigation.navigate(SCREENS.otp, { mobile });
    } catch (err) {
      console.log(err);
      utils.hasErrors(err);
    }
  };
}

function verifyOtp(token, mobile) {
  return async dispatch => {
    try {
      const response = await http.get('/user/validate-otp', {
        params: { token, mobile },
      });
      if (response.data.message) {
        dispatch(signUp('otp', mobile));
      } else {
        utils.hasErrors([{ message: 'Netwotk error' }]);
      }
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function signUp(authType, value) {
  return async dispatch => {
    try {
      const response = await http.post('/user/signin', {
        type: authType,
        value: value,
      });
      dispatch(
        authenticate(
          response.data.id,
          response.data.token,
          parseInt(response.data.expiresIn, 10) * 1000,
          authType,
        ),
      );
      dispatch(userActions.getUserDetails());
      const expirationDate = new Date(
        new Date().getTime() + parseInt(response.data.expiresIn, 10) * 1000,
      );
      saveDataToLocalStorage(
        response.data.token,
        response.data.id,
        expirationDate,
      );
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function authenticate(id, token, expiryTime, type) {
  return dispatch => {
    dispatch(setLogoutTimer(expiryTime));
    dispatch({ type: types.AUTHENTICATE, payload: { id, token, type } });
  };
}

function setLogoutTimer(expirationTime) {
  return dispatch => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
}

function logout() {
  return async dispatch => {
    clearLogoutTimer();
    await localStorageService.clearData();
    dispatch({ type: types.LOGOUT });
  };
}

function clearLogoutTimer() {
  if (timer) {
    clearTimeout(timer);
  }
}

async function saveDataToLocalStorage(token, id, expirationDate) {
  await localStorageService.saveDataToLocalStorage(token, id, expirationDate);
}

function setDidTryAL() {
  return { type: types.SET_DID_TRY_AL };
}
export default { sendOtp, verifyOtp, logout, authenticate, setDidTryAL };
