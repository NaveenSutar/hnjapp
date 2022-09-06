import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { IMAGES, FONTS, SIZES, COLORS } from '../../constants';

const AuthLayout = ({ title, subtitle, titleContainerStyle, children }) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.contentContainerStyle}>
        {/* App Logo */}

        <View style={styles.appLogoContainer}>
          <Image
            source={IMAGES.logo_02}
            resizeMode="contain"
            style={styles.appLogoImage}
          />
        </View>
        {/* Title */}
        <View
          style={{
            ...styles.titleContainer,
            ...titleContainerStyle,
          }}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subTitleText}>{subtitle}</Text>
        </View>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: SIZES.height > 800 ? SIZES.padding : SIZES.halfPadding,
    backgroundColor: COLORS.white,
  },
  contentContainerStyle: { flex: 1, paddingHorizontal: SIZES.padding },
  appLogoContainer: { alignItems: 'center' },
  appLogoImage: {
    height: 120,
    width: 250,
  },
  titleContainer: {
    marginTop: SIZES.height > 800 ? SIZES.padding : 0,
  },
  titleText: {
    textAlign: 'center',
    ...FONTS.h2,
  },
  subTitleText: {
    textAlign: 'center',
    color: COLORS.grey,
    marginTop: SIZES.halfMargin,
    ...FONTS.subtitle,
  },
});

export default AuthLayout;
