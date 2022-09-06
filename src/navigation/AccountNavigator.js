import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../constants';
import { SignUp } from '../screens';

const Stack = createStackNavigator();

const AccountNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={SCREENS.signup}
        component={SignUp}
        initialParams={{ headerTitle: '', showLeftComponent: false }}
      />
    </Stack.Navigator>
  );
};

export default AccountNavigator;
