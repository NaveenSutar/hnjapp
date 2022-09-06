import React from 'react';
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { COLORS, FONTS, SIZES } from '../constants';

const CustomSwitch = ({ label = '', onChange, value }) => {
  return (
    <TouchableWithoutFeedback onPress={() => onChange(!value)}>
      <View style={styles.container}>
        <View
          style={value ? styles.switchOnContainer : styles.switchOffContainer}>
          <View
            style={{
              ...styles.dot,
              backgroundColor: value ? COLORS.white : COLORS.grey,
            }}
          />
        </View>

        {label !== '' && (
          <Text
            style={{
              color: value ? COLORS.primary : COLORS.grey,
              marginLeft: SIZES.margin,
              ...FONTS.body2,
            }}>
            {label}
          </Text>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  switchOnContainer: {
    width: 40,
    height: 20,
    paddingRight: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  switchOffContainer: {
    width: 40,
    height: 20,
    paddingLeft: 2,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.grey,
    borderRadius: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});

export default CustomSwitch;
