import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Dash from 'react-native-dash';
import {Point} from '../';
import {COLORS} from '../../constants';
import {utils} from '../../utils';

const PointLine = ({isLastMember, data}) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerGlue}>
        <Text style={styles.dayTextStyle}> {utils.formatDate(data, 'DD')}</Text>
        <Text style={styles.monthTextStyle}>
          {utils.formatDate(data, 'ddd').toUpperCase()}
        </Text>
      </View>
      <View style={styles.dividerStyle}>
        {!isLastMember && (
          <Dash dashGap={7} dashColor="#e3e3e3" style={styles.dashStyle} />
        )}

        <Point />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 24,
  },
  containerGlue: {
    marginTop: -7,
    marginRight: 12,
    alignItems: 'center',
    flexDirection: 'column',
  },
  dividerStyle: {
    paddingTop: 12,
    marginLeft: 12,
  },
  dayTextStyle: {
    color: COLORS.primary,
  },
  monthTextStyle: {
    color: COLORS.primary,
  },
  dashStyle: {
    width: 1,
    height: 145 * 3,
    flexDirection: 'column',
  },
});

export default PointLine;
