import React from 'react';
import {View, StyleSheet} from 'react-native';
import {COLORS} from '../constants';
const VerticalLineDivider = ({lineStyle}) => {
  return <View style={[styles.container, lineStyle]} />;
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '1',
    backgroundColor: COLORS.lightGreen,
  },
});
export default VerticalLineDivider;
