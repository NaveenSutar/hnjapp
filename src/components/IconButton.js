import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';
import {COLORS} from '../constants';

const IconButton = ({
  containerStyle,
  icon,
  iconStyle,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...containerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <Image
        source={icon}
        style={{
          ...styles.imageStyle,
          ...iconStyle,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 30,
    height: 30,
    tintColor: COLORS.white,
  },
});

export default IconButton;
