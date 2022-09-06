import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { FONTS, SIZES } from '../constants';

const IconLabel = ({
  containerStyle,
  icon,
  iconStyle,
  label,
  labelStyle,
  right = false,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}>
      {!right ? (
        <Image
          source={icon}
          style={{
            ...styles.imageStyle,
            ...iconStyle,
          }}
        />
      ) : null}

      <Text
        style={{
          marginLeft: SIZES.margin,
          ...FONTS.subtitle,
          ...labelStyle,
        }}>
        {label}
      </Text>

      {right ? (
        <Image
          source={icon}
          style={{
            ...styles.imageStyle,
            ...iconStyle,
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SIZES.halfPadding,
    paddingHorizontal: SIZES.halfPadding,
    borderRadius: SIZES.radius,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
});
export default IconLabel;
