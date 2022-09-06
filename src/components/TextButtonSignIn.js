import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FONTS, COLORS, SIZES } from '../constants';

const TextButtonSignIn = ({
  buttonContainerStyle,
  disabled,
  label,
  labelStyle,
  label2 = '',
  label2Style,
  children,
  onPress,
  textColor,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.5}
      onPress={onPress}
      style={{
        ...styles.buttonContainerStyle,
        ...buttonContainerStyle,
      }}>
      {children}
      <Text
        style={{
          ...styles.textStyle,
          color: textColor ? textColor : COLORS.white,
        }}>
        {label}
      </Text>

      {label2 != '' && (
        <Text
          style={{
            ...styles.label2Style,
            ...label2Style,
          }}>
          {label2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    width: '100%',
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
  },
  textStyle: {
    width: '100%',
    textAlign: 'center',
    ...FONTS.h3,
  },
  label2Style: {
    flex: 1,
    textAlign: 'right',
    color: COLORS.white,
    ...FONTS.h3,
  },
});

export default TextButtonSignIn;
