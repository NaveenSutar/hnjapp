import { Platform, Dimensions } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { COLORS } from '../constants';
import moment from 'moment';

const Screen = Dimensions.get('window');

const SCREEN_WIDTH = Screen.width;

const SCREEN_HEIGHT = Screen.height;

const isIOS = Platform.OS === 'ios';

const isAndroid = Platform.OS === 'android';

const isWeb = Platform.OS === 'web';

const PRAKRITI_SCRIPT_TYPES = {
  question: 'question',
  assessment: 'assessment',
};

function logErrorWithMessage(message, errorSource) {
  if (__DEV__) {
    console.log(message, errorSource);
  }
}

function isValidMobileNumber(value) {
  if (value.length === 10) {
    return true;
  } else if (value.length === 11 && value.charAt(0) === '0') {
    return true;
  } else {
    return false;
  }
}

function validateMobileNumber(value, setMobileNumberError) {
  if (value === '') {
    setMobileNumberError('');
  } else if (isValidMobileNumber(value)) {
    setMobileNumberError('');
  } else {
    setMobileNumberError('Invalid Mobile Number');
  }
}

function isValidEmail(value) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(value).toLowerCase());
}

function validateEmail(value, setEmailError) {
  if (value === '') {
    setEmailError('');
  } else if (isValidEmail(value)) {
    setEmailError('');
  } else {
    setEmailError('Invalid Email');
  }
}

function validateFieldForEmpty(value, setEmptyFieldError) {
  if (value.trim() === '') {
    setEmptyFieldError('Mandatory Field');
  } else {
    setEmptyFieldError('');
  }
}

function hasErrors(err) {
  if (err.response) {
    showSnackbar(err.response.data[0].message, COLORS.danger); // TODO: Change it to read through all the errors
  } else if (err.request) {
    showSnackbar(
      'Please check your network connectivity, try again later',
      COLORS.danger,
    );
  } else {
    showSnackbar(
      'Oops Something went wrong, please try again later',
      COLORS.danger,
    );
  }
}

function successMsg(message) {
  showSnackbar(message, COLORS.primary);
}

function errorMsg(message) {
  showSnackbar(message, COLORS.danger);
}

function showSnackbar(title, textColor, backgroundColor) {
  Snackbar.show({
    text: title,
    duration: 2000,
    textColor: textColor,
    backgroundColor: backgroundColor ? backgroundColor : '#FBFBFB',
  });
}

function formatDate(date, format = 'DD/MM/YYYY') {
  return date ? moment(date).format(format) : null;
}

function generateDateObjectFromString(dateAsString) {
  return moment(dateAsString).toDate();
}

function formatDateonTag(date) {
  return moment(date).format('hh');
}

function convertUnixToDateFormat(date) {
  return { date: moment.unix(date).toDate() };
}
function convertMilliSecToMin(time) {
  return time / 1000 / 60;
}

const utils = {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  isIOS,
  isAndroid,
  isWeb,
  PRAKRITI_SCRIPT_TYPES,
  validateMobileNumber,
  validateEmail,
  logErrorWithMessage,
  hasErrors,
  showSnackbar,
  formatDate,
  generateDateObjectFromString,
  validateFieldForEmpty,
  formatDateonTag,
  convertMilliSecToMin,
  successMsg,
  errorMsg,
  convertUnixToDateFormat,
};

export default utils;
