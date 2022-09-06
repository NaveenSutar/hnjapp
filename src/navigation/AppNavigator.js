import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SCREENS } from '../constants';
import { CustomDrawerNavigator } from '.';
import {
  DietPlan,
  DietWeeks,
  DailyDishes,
  DishDetails,
  MyPrakriti,
  PrakritiDashBoard,
  PrakritiQuestions,
  YogaList,
  YogaDetails,
  Yoga,
  Refer,
  Help,
  TermsOfService,
  Subscription,
  CancelSubscription,
} from '../screens';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={SCREENS.home}>
      {/* Home via CustomDrawer*/}
      <Stack.Screen name={SCREENS.home} component={CustomDrawerNavigator} />
      {/* Account */}
      {/* <Stack.Screen name={SCREENS.account} component={Account} />
      <Stack.Screen name={SCREENS.account_edit} component={AccountEdit} /> */}

      {/* Diet Plan */}
      <Stack.Screen name={SCREENS.diet} component={DietPlan} />
      <Stack.Screen name={SCREENS.diet_weeks} component={DietWeeks} />
      <Stack.Screen name={SCREENS.daily_dishes} component={DailyDishes} />
      <Stack.Screen name={SCREENS.dish_details} component={DishDetails} />

      {/* Yoga */}
      <Stack.Screen name={SCREENS.yoga} component={Yoga} />
      <Stack.Screen name={SCREENS.yoga_list} component={YogaList} />
      <Stack.Screen name={SCREENS.yoga_details} component={YogaDetails} />

      {/* Prakriti */}
      <Stack.Screen name={SCREENS.my_prakriti} component={MyPrakriti} />
      <Stack.Screen
        name={SCREENS.prakriti_question}
        component={PrakritiQuestions}
      />
      <Stack.Screen
        name={SCREENS.prakriti_dashboard}
        component={PrakritiDashBoard}
      />
      <Stack.Screen name={SCREENS.refer} component={Refer} />
      <Stack.Screen name={SCREENS.help_center} component={Help} />
      <Stack.Screen name={SCREENS.termsOfService} component={TermsOfService} />
      {/* Subscription */}
      <Stack.Screen name={SCREENS.subscription} component={Subscription} />
      <Stack.Screen
        name={SCREENS.cancel_subscription}
        component={CancelSubscription}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
