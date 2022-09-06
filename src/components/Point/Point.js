import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const Point = props => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer} />
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    top: 0,
    left: -4,
    width: 10,
    height: 10,
    backgroundColor: COLORS.transparentPrimary,
    borderRadius: 30,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.transparentPrimary,
    shadowRadius: SIZES.radius,
    shadowOpacity: 0.3,
    shadowOffset: {
      wodth: 0,
      height: 3,
    },
  },
  innerContainer: {
    width: 20,
    height: 20,
    borderColor: 'rgba(152, 76, 248, 0.1)',
    borderWidth: 1,
    backgroundColor: 'rgba(152, 76, 248, 0.05)',
    borderRadius: 16,
  },
});

export default Point;
