import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { IconButton } from '../components';
import { FONTS, COLORS, ICONS, SIZES } from '../constants';

const StepperInput = ({ containerStyle, value = 1, onAdd, onMinus }) => {
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}>
      <IconButton
        containerStyle={styles.iconContainer}
        icon={ICONS.minus}
        iconStyle={[
          styles.icon,
          { tintColor: value > 1 ? COLORS.primary : COLORS.grey },
        ]}
        onPress={onMinus}
      />

      <View style={styles.textContainer}>
        <Text style={{ ...FONTS.h2 }}>{value}</Text>
      </View>

      <IconButton
        containerStyle={styles.iconContainer}
        icon={ICONS.plus}
        iconStyle={[styles.icon, { tintColor: COLORS.primary }]}
        onPress={onAdd}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    width: 130,
    backgroundColor: COLORS.lightGrey,
    borderRadius: SIZES.radius,
  },
  iconContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: { height: 25, width: 25 },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default StepperInput;
