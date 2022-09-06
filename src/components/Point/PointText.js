import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, SIZES } from '../../constants';

const PointText = props => {
  const { onDaySelectedEventInPoint, containerStyle } = props;
  return (
    <TouchableOpacity onPress={onDaySelectedEventInPoint}>
      <View style={{ ...containerStyle, ...styles.container }}>
        <Text style={styles.day}>{props.label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    marginBottom: 10,
    width: 35,
    height: 35,
    backgroundColor: COLORS.transparentPrimary,
    borderRadius: 30,
    shadowColor: COLORS.transparentPrimary,
    shadowRadius: SIZES.radius,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  day: {
    color: COLORS.black,
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
});

export default PointText;
