import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { LineDivider } from '../components';
import { COLORS, FONTS } from '../constants';

const InfoItem = ({ label, value, withDivider = true }) => {
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.textLabel}>{label}</Text>
        <Text style={styles.valueLabel}>{value}</Text>
      </View>

      {withDivider && (
        <LineDivider
          lineStyle={{
            backgroundColor: COLORS.lightGrey,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
  },
  textLabel: {
    color: COLORS.grey,
    ...FONTS.subtitle,
  },
  valueLabel: {
    flex: 1,
    textAlign: 'right',
    ...FONTS.subtitle,
  },
});
export default InfoItem;
