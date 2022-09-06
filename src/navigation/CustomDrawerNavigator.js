/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import Animated, { interpolateNode } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { COLORS, SCREENS, SIZES, ICONS, FONTS, IMAGES } from '../constants';
import { authActions, tabActions } from '../store';
import {
  MainLayout,
  Account,
  AccountEdit,
  Refer,
  Help,
  TermsOfService,
  Subscription,
} from '../screens';

const Drawer = createDrawerNavigator();

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 40,
        marginBottom: SIZES.halfMargin,
        alignItems: 'center',
        paddingLeft: SIZES.halfPadding,
        borderRadius: SIZES.radius,
        backgroundColor: isFocused ? 'rgba(0, 0, 0, 0.1)' : null,
      }}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          width: 20,
          height: 20,
          tintColor: COLORS.white,
        }}
      />

      <Text
        style={{
          marginLeft: SIZES.halfMargin,
          color: COLORS.white,
          ...FONTS.h3,
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const selectedTab = useSelector(state => state.tab.selectedTab);
  const { firstName, lastName } = useSelector(state => state.user);
  return (
    <DrawerContentScrollView
      scrollEnabled={true}
      contentContainerStyle={styles.contentContainerStyle}>
      <View style={styles.contentContainerStyleView}>
        {/* Close */}
        <View style={styles.contentContainerStyleCloseIconView}>
          <TouchableOpacity
            style={styles.contentContainerStyleCloseIconTouch}
            onPress={() => navigation.closeDrawer()}>
            <Image
              source={ICONS.cross}
              style={styles.contentContainerCloseIconImage}
            />
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <TouchableOpacity
          style={styles.contentContainerProfileTouch}
          onPress={() => {
            navigation.closeDrawer();
            navigation.navigate(SCREENS.account);
          }}>
          <Image
            source={IMAGES.user}
            style={styles.contentContainerProfileImage}
          />

          <View
            style={{
              marginLeft: SIZES.radius,
            }}>
            <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
              {`${firstName} ${lastName}`}
            </Text>
            <Text style={{ color: COLORS.white, ...FONTS.body2 }}>
              View your profile
            </Text>
          </View>
        </TouchableOpacity>

        {/*  Drawer Items */}
        <View style={styles.contentContainerDrawerItemContainer}>
          <CustomDrawerItem
            label={SCREENS.home}
            icon={ICONS.home}
            isFocused={selectedTab === SCREENS.home}
            onPress={() => {
              dispatch(tabActions.setSelectedTab(SCREENS.home));
              navigation.navigate(SCREENS.main_layout);
            }}
          />

          {/* Line Divider */}
          <View style={styles.lineDivider} />

          <CustomDrawerItem
            label={SCREENS.subscription}
            icon={ICONS.subscription}
            isFocused={selectedTab === SCREENS.subscription}
            onPress={() => {
              navigation.navigate(SCREENS.subscription);
            }}
          />

          <CustomDrawerItem
            label={SCREENS.refer}
            icon={ICONS.profile}
            isFocused={selectedTab === SCREENS.refer}
            onPress={() => {
              navigation.navigate(SCREENS.refer);
            }}
          />
          <CustomDrawerItem
            label={SCREENS.help_center}
            icon={ICONS.help}
            isFocused={selectedTab === SCREENS.help_center}
            onPress={() => {
              navigation.navigate(SCREENS.help_center);
            }}
          />
          <CustomDrawerItem
            label={SCREENS.termsOfService}
            icon={ICONS.termsOfService}
            isFocused={selectedTab === SCREENS.termsOfService}
            onPress={() => {
              navigation.navigate(SCREENS.termsOfService);
            }}
          />
        </View>
        <View style={styles.logout}>
          <CustomDrawerItem
            label={SCREENS.logout}
            icon={ICONS.logout}
            onPress={() => dispatch(authActions.logout())}
          />
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const CustomDrawerNavigator = () => {
  const [progress, setProgress] = useState(new Animated.Value(0));
  const scale = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });

  const borderRadius = interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 26],
  });

  const animatedStyle = { borderRadius, transform: [{ scale }] };

  return (
    <View style={styles.container}>
      <Drawer.Navigator
        drawerType="slide"
        overlayColor={COLORS.transparent}
        drawerStyle={styles.drawerStyle}
        sceneContainerStyle={styles.sceneContainerStyle}
        initialRouteName={SCREENS.main_layout}
        drawerContent={props => {
          setTimeout(() => {
            setProgress(props.progress);
          }, 0);
          return <CustomDrawerContent navigation={props.navigation} />;
        }}>
        <Drawer.Screen name={SCREENS.main_layout}>
          {props => (
            <MainLayout {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name={SCREENS.account}>
          {props => <Account {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name={SCREENS.account_edit}>
          {props => (
            <AccountEdit {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name={SCREENS.refer}>
          {props => <Refer {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name={SCREENS.help_center}>
          {props => <Help {...props} drawerAnimationStyle={animatedStyle} />}
        </Drawer.Screen>
        <Drawer.Screen name={SCREENS.termsOfService}>
          {props => (
            <TermsOfService {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
        <Drawer.Screen name={SCREENS.subscription}>
          {props => (
            <Subscription {...props} drawerAnimationStyle={animatedStyle} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </View>
  );
};

export default CustomDrawerNavigator;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  drawerStyle: {
    flex: 1,
    width: '65%',
    paddingRight: 20,
    backgroundColor: COLORS.transparent,
  },
  sceneContainerStyle: {
    backgroundColor: COLORS.transparent,
  },
  contentContainerStyle: {
    flex: 1,
  },
  contentContainerStyleView: {
    flex: 1,
    paddingHorizontal: SIZES.halfPadding,
  },
  contentContainerStyleCloseIconView: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  contentContainerStyleCloseIconTouch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainerCloseIconImage: {
    height: 35,
    width: 35,
    tintColor: COLORS.white,
  },
  contentContainerProfileTouch: {
    flexDirection: 'row',
    marginTop: SIZES.halfMargin,
    alignItems: 'center',
  },
  contentContainerProfileImage: {
    width: 50,
    height: 50,
    borderRadius: SIZES.radius,
  },
  contentContainerDrawerItemContainer: {
    flex: 1,
    marginTop: SIZES.height > 800 ? SIZES.margin : SIZES.margin,
  },
  lineDivider: {
    height: 1,
    marginVertical: SIZES.halfMargin,
    marginLeft: SIZES.halfMargin,
    backgroundColor: COLORS.lightGrey,
  },
  logout: {
    marginBottom: SIZES.height > 800 ? SIZES.padding : 0,
  },
});
