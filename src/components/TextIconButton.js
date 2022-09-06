import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import { FONTS, COLORS } from '../constants';

const TextIconButton = ({
  containerStyle,
  label,
  labelStyle,
  icon,
  iconPosition,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...containerStyle,
      }}
      onPress={onPress}>
      {iconPosition === 'LEFT' && (
        <Image
          source={icon}
          style={{
            ...styles.image,
            ...iconStyle,
          }}
        />
      )}
      <Text
        style={{
          ...FONTS.subtitle,
          ...labelStyle,
        }}>
        {label}
      </Text>
      {iconPosition === 'RIGHT' && (
        <Image
          source={icon}
          style={{
            ...styles.image,
            ...iconStyle,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

TextIconButton.propTypes = {
  iconPosition: PropTypes.oneOf(['LEFT', 'RIGHT']),
};

const styles = StyleSheet.create({
  image: {
    marginLeft: 5,
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default TextIconButton;
