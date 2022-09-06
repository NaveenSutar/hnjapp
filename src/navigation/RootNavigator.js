import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';
import { AuthNavigator, AppNavigator, AccountNavigator } from '.';
import PushNotificationService from '../services/PushNotificationService';
import LocalStorageService from '../services/LocalStorageService';
import { authActions, userActions } from '../store';

const linking = {
  prefixes: ['hnjapp://']
};

const localStorageService = LocalStorageService.getService();
const RootNavigator = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  const user = useSelector(state => state.user);

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await localStorageService.getDataFromLocalStorage();
      if (!userData) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, id, expiryDate } = transformedData;
      const expirationDate = new Date(expiryDate);

      if (expirationDate <= new Date() || !token || !id) {
        dispatch(authActions.setDidTryAL());
        return;
      }
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      dispatch(authActions.authenticate(id, token, expirationTime));
      dispatch(userActions.getUserDetails());
    };

    PushNotificationService.initService();
    PushNotificationService.handleForegroundNotification();
    tryLogin();

    setTimeout(() => SplashScreen.hide(), 2000);
  }, [dispatch]);

  return (
    <NavigationContainer
      linking={linking}
    >
      {isAuth &&
        didTryAutoLogin &&
        user.firstName !== '' &&
        user.firstName !== null && <AppNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {isAuth && didTryAutoLogin && user.firstName === '' && (
        <AccountNavigator />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
