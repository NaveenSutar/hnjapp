import React from 'react';
import { View, StyleSheet, ActivityIndicator, Image, Text } from 'react-native';
import {
  SCREENS,
  SCREENS_ACTIVITY_INDICATORS,
  SIZES,
  FONTS,
  COLORS,
} from '../constants';

const CustomActivityIndicator = ({ screen }) => {
  function renderActivityIndictor() {
    switch (screen) {
      case SCREENS.signup:
        return <ActivityIndicator />;
      case SCREENS.prakriti_dashboard:
        return screenImageAndText(screen);
      case SCREENS.home:
        return screenImageAndText(screen);
      case SCREENS.diet:
        return screenImageAndText(screen);
      case SCREENS.diet_weeks:
        return screenImageAndText(screen);
      case SCREENS.daily_dishes:
        return screenImageAndText(screen);
      case SCREENS.dish_details:
        return screenImageAndText(screen);
      case SCREENS.my_prakriti:
        return screenImageAndText(screen);
      case SCREENS.yoga_list:
        return screenImageAndText(screen);
      case SCREENS.yoga:
        return screenImageAndText(screen);
      default:
        return <ActivityIndicator />;
    }
  }

  function screenImageAndText(screenName) {
    const screenData = SCREENS_ACTIVITY_INDICATORS.find(
      item => item.screen === screenName,
    );
    return setActivityIndicatorImage(screenData.image, screenData.text);
  }

  function setActivityIndicatorImage(imageUrl, text) {
    return (
      <View style={styles.screen}>
        <Image style={styles.image} source={imageUrl} />
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
  return <View style={styles.container}>{renderActivityIndictor()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  screen: {
    marginBottom: SIZES.margin,
    alignItems: 'center',
    width: SIZES.width,
  },
  text: {
    alignSelf: 'center',
    fontSize: 15,
    width: SIZES.width * 0.8,
    textAlign: 'center',
    opacity: 0.3,
    ...FONTS.hnj_body,
  },
  image: {
    height: SIZES.height * 0.12,
    width: SIZES.width * 0.25,
  },
});

export default CustomActivityIndicator;
