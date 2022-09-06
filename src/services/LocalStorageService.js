import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalStorageService = (function () {
  let _service;

  function _getService() {
    if (!_service) {
      // eslint-disable-next-line consistent-this
      _service = this;
      return _service;
    }
    return _service;
  }

  async function _saveDataToLocalStorage(token, id, expirationDate) {
    await AsyncStorage.setItem(
      'user_data',
      JSON.stringify({ token, id, expiryDate: expirationDate.toISOString() }),
    );
  }

  async function _getDataFromLocalStorage() {
    return await AsyncStorage.getItem('user_data');
  }

  async function _clearData() {
    await AsyncStorage.removeItem('user_data');
  }

  return {
    getService: _getService,
    saveDataToLocalStorage: _saveDataToLocalStorage,
    getDataFromLocalStorage: _getDataFromLocalStorage,
    clearData: _clearData,
  };
})();

export default LocalStorageService;
