/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { Home, MyPrakriti, Yoga, DietPlan } from '../screens';
import { Header } from '../components';
import {
  COLORS,
  FONTS,
  SIZES,
  SCREENS,
  BOTTOM_TABS,
  ICONS,
  IMAGES,
} from '../constants';
import { tabActions } from '../store';

const TabButton = ({
  label,
  icon,
  isFocused,
  outerContainerStyle,
  innerContainerStyle,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View
        style={[styles.tabButtonOuterContainer, outerContainerStyle]}>
        <Animated.View
          style={[styles.tabButtonInnerContainer, innerContainerStyle]}>
          <Image
            source={icon}
            style={{
              width: 20,
              height: 20,
              tintColor: isFocused ? COLORS.white : COLORS.grey,
            }}
          />

          {isFocused && (
            <Text numberOfLines={1} style={styles.tabButtonText}>
              {label}
            </Text>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const MainLayout = ({ drawerAnimationStyle, navigation }) => {
  const flatListRef = useRef();
  const dispatch = useDispatch();
  const selectedTab = useSelector(state => state.tab.selectedTab);

  // Reanimated Shared Value
  const homeTabFlex = useSharedValue(1);
  const homeTabColor = useSharedValue(COLORS.white);
  const myPrakritiTabFlex = useSharedValue(1);
  const myPrakritiTabColor = useSharedValue(COLORS.white);
  const yogaTabFlex = useSharedValue(1);
  const yogaTabColor = useSharedValue(COLORS.white);
  const dietTabFlex = useSharedValue(1);
  const dietTabColor = useSharedValue(COLORS.white);

  // Reanimated Animated Style

  const homeFlexStyle = useAnimatedStyle(() => {
    return {
      flex: homeTabFlex.value,
    };
  });

  const homeColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: homeTabColor.value,
    };
  });

  const myPrakritiFlexStyle = useAnimatedStyle(() => {
    return {
      flex: myPrakritiTabFlex.value,
    };
  });

  const myPrakritiColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: myPrakritiTabColor.value,
    };
  });

  const yogaFlexStyle = useAnimatedStyle(() => {
    return {
      flex: yogaTabFlex.value,
    };
  });

  const yogaColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: yogaTabColor.value,
    };
  });

  const dietFlexStyle = useAnimatedStyle(() => {
    return {
      flex: dietTabFlex.value,
    };
  });

  const dietColorStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: dietTabColor.value,
    };
  });

  useEffect(() => {
    dispatch(tabActions.setSelectedTab(SCREENS.home));
  }, [dispatch]);

  useEffect(() => {
    if (selectedTab === SCREENS.home) {
      flatListRef?.current?.scrollToIndex({
        index: 0,
        animated: false,
      });

      homeTabFlex.value = withTiming(4, {
        duration: 500,
        useNativeDriver: true,
      });
      homeTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
        useNativeDriver: true,
      });
    } else {
      homeTabFlex.value = withTiming(1, {
        duration: 500,
        useNativeDriver: true,
      });
      homeTabColor.value = withTiming(COLORS.white, {
        duration: 500,
        useNativeDriver: true,
      });
    }

    if (selectedTab === SCREENS.my_prakriti) {
      flatListRef?.current?.scrollToIndex({
        index: 1,
        animated: false,
      });

      myPrakritiTabFlex.value = withTiming(4, {
        duration: 500,
        useNativeDriver: true,
      });
      myPrakritiTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
        useNativeDriver: true,
      });
    } else {
      myPrakritiTabFlex.value = withTiming(1, {
        duration: 500,
        useNativeDriver: true,
      });
      myPrakritiTabColor.value = withTiming(COLORS.white, {
        duration: 500,
        useNativeDriver: true,
      });
    }

    if (selectedTab === SCREENS.yoga) {
      flatListRef?.current?.scrollToIndex({
        index: 2,
        animated: false,
      });

      yogaTabFlex.value = withTiming(4, {
        duration: 500,
        useNativeDriver: true,
      });
      yogaTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
        useNativeDriver: true,
      });
    } else {
      yogaTabFlex.value = withTiming(1, {
        duration: 500,
        useNativeDriver: true,
      });
      yogaTabColor.value = withTiming(COLORS.white, {
        duration: 500,
        useNativeDriver: true,
      });
    }

    if (selectedTab === SCREENS.diet) {
      flatListRef?.current?.scrollToIndex({
        index: 3,
        animated: false,
      });

      dietTabFlex.value = withTiming(4, {
        duration: 500,
        useNativeDriver: true,
      });
      dietTabColor.value = withTiming(COLORS.primary, {
        duration: 500,
        useNativeDriver: true,
      });
    } else {
      dietTabFlex.value = withTiming(1, {
        duration: 500,
        useNativeDriver: true,
      });
      dietTabColor.value = withTiming(COLORS.white, {
        duration: 500,
        useNativeDriver: true,
      });
    }
  }, [
    selectedTab,
    homeTabColor,
    homeTabFlex,
    myPrakritiTabColor,
    myPrakritiTabFlex,
    yogaTabColor,
    yogaTabFlex,
    dietTabColor,
    dietTabFlex,
  ]);

  return (
    <Animated.View style={{ ...styles.container, ...drawerAnimationStyle }}>
      <SafeAreaView style={{ ...styles.container }}>
        {/* Header  TODO: Make header invisible in case of diet navigator using redux */}
        {/* {selectedTab !== SCREENS.yoga ? ( */}

        <Header
          title={selectedTab.toUpperCase()}
          leftComponent={
            <TouchableOpacity
              style={styles.headerLeftComponentTouch}
              onPress={() => navigation.openDrawer()}>
              <Image source={ICONS.menu} />
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity style={styles.headerRightComponentTouch}>
              <Image
                style={styles.headerRightComponentImage}
                source={IMAGES.user}
              />
            </TouchableOpacity>
          }
        />

        {/* Content */}
        <View style={styles.contentContainer}>
          <FlatList
            ref={flatListRef}
            horizontal
            scrollEnabled={false}
            pagingEnabled
            snapToAlignment="center"
            snapToInterval={SIZES.width}
            showsHorizontalScrollIndicator={false}
            data={BOTTOM_TABS}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item, index }) => {
              return (
                <View
                  style={{
                    // height: SIZES.height,
                    width: SIZES.width,
                  }}>
                  {item.label === SCREENS.home && <Home />}
                  {item.label === SCREENS.my_prakriti && <MyPrakriti />}
                  {item.label === SCREENS.yoga && <Yoga />}
                  {item.label === SCREENS.diet && <DietPlan />}
                </View>
              );
            }}
          />
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          {/* Tabs */}
          <View style={styles.footerTabsContainer}>
            <TabButton
              label={SCREENS.home}
              icon={ICONS.home}
              isFocused={selectedTab === SCREENS.home}
              outerContainerStyle={homeFlexStyle}
              innerContainerStyle={homeColorStyle}
              onPress={() => {
                dispatch(tabActions.setSelectedTab(SCREENS.home));
              }}
            />

            <TabButton
              label={SCREENS.my_prakriti}
              icon={ICONS.prakriti}
              isFocused={selectedTab === SCREENS.my_prakriti}
              outerContainerStyle={myPrakritiFlexStyle}
              innerContainerStyle={myPrakritiColorStyle}
              onPress={() =>
                dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti))
              }
            />

            <TabButton
              label={SCREENS.yoga}
              icon={ICONS.yoga}
              isFocused={selectedTab === SCREENS.yoga}
              outerContainerStyle={yogaFlexStyle}
              innerContainerStyle={yogaColorStyle}
              onPress={() => dispatch(tabActions.setSelectedTab(SCREENS.yoga))}
            />

            <TabButton
              label={SCREENS.diet}
              icon={ICONS.diet}
              isFocused={selectedTab === SCREENS.diet}
              outerContainerStyle={dietFlexStyle}
              innerContainerStyle={dietColorStyle}
              onPress={() => dispatch(tabActions.setSelectedTab(SCREENS.diet))}
            />
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  headerContainer: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    alignItems: 'center',
  },

  headerLeftComponentTouch: {
    width: SIZES.height / 20,
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: SIZES.radius,
  },

  headerRightComponentTouch: {
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerRightComponentImage: {
    width: SIZES.height / 20,
    height: 0,
    borderRadius: SIZES.radius,
  },

  contentContainer: {
    flex: 1,
  },

  footerContainer: {
    // elevation: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
  },
  // footerShadow: {
  //   position: 'absolute',
  //   top: -15,
  //   left: 0,
  //   right: 0,
  //   height: SIZES.height / 10,
  //   borderTopLeftRadius: SIZES.height / 50,
  //   borderTopRightRadius: SIZES.height / 50,
  // },

  footerTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderTopLeftRadius: SIZES.height / 50,
    borderTopRightRadius: SIZES.height / 50,
    backgroundColor: COLORS.white,

    borderTopColor: Platform.OS === 'android' ? '#00000025' : null,
    borderTopWidth: Platform.OS === 'android' ? 2 : 0,
    borderLeftColor: Platform.OS === 'android' ? '#00000025' : null,
    borderLeftWidth: Platform.OS === 'android' ? 2 : 0,
    borderRightColor: Platform.OS === 'android' ? '#00000025' : null,
    borderRightWidth: Platform.OS === 'android' ? 2 : 0,
  },

  tabButtonOuterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabButtonInnerContainer: {
    flexDirection: 'row',
    width: '80%',
    padding: SIZES.height / 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },

  tabButtonText: {
    marginLeft: SIZES.halfMargin,
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default MainLayout;
