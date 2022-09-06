import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const LineDivider = ({ lineStyle }) => {
  return <View style={[styles.container, lineStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    height: 1,
    width: '100%',
    backgroundColor: COLORS.lightGrey,
  },
});
export default LineDivider;
