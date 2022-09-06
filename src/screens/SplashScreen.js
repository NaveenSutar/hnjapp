import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import LocalStorageService from '../services/LocalStorageService';
import { authActions } from '../store';
import SplashScreen from 'react-native-splash-screen';

// const localStorageService = LocalStorageService.getService();

const SplashScreenView = props => {
  useEffect(() => {
    SplashScreen.hide();
  });
  //   const dispatch = useDispatch();

  //   useEffect(() => {
  //     const tryLogin = async () => {
  //       const userData = await localStorageService.getDataFromLocalStorage();
  //       if (!userData) {
  //         dispatch(authActions.setDidTryAL());
  //         return;
  //       }
  //       const transformedData = JSON.parse(userData);
  //       const {token, id, expiryDate} = transformedData;
  //       const expirationDate = new Date(expiryDate);

  //       if (expirationDate <= new Date() || !token || !id) {
  //         dispatch(authActions.setDidTryAL());
  //         return;
  //       }
  //       const expirationTime = expirationDate.getTime() - new Date().getTime();

  //       dispatch(authActions.authenticate(id, token, expirationTime));
  //     };

  //     tryLogin();
  //   }, [dispatch]);
  //   return (
  //     <View style={styles.container}>
  //       <Text>Here Splash Screen should Come</Text>
  //     </View>
  //   );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

export default SplashScreenView;
