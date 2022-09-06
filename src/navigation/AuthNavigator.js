import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Otp, SignIn } from '../screens';
import { SCREENS } from '../constants';

const Stack = createStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.signin} component={SignIn} />
      <Stack.Screen name={SCREENS.otp} component={Otp} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
