import React from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { COLORS, FONTS, ICONS, SIZES } from '../../constants';
import { utils } from '../../utils';

const HorizontalCard = ({
  containerStyle,
  imageStyle,
  startDate,
  endDate,
  title,
  onSelect,
  description = true,
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.container,
        ...containerStyle,
      }}
      onPress={() => onSelect(startDate, endDate)}>
      {/* Info */}
      <View style={styles.infoContainer}>
        {/* Title */}
        <Text style={styles.infoTitle}>{title}</Text>

        {/* Description */}
        {description ? (
          <View style={styles.descContainer}>
            <View style={styles.descItem}>
              <Text style={styles.descTitle}>Start Date: </Text>
              <Text style={styles.descValue}>
                {' '}
                {utils.formatDate(startDate, 'ddd, MMM Do')}
              </Text>
            </View>
            <View style={styles.descItem}>
              <Text style={styles.descTitle}>End Date: </Text>
              <Text style={styles.descValue}>
                {utils.formatDate(endDate, 'ddd, MMM Do')}
              </Text>
            </View>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.grey,
  },
  infoContainer: {
    flex: 1,
    marginVertical: SIZES.margin,
    paddingHorizontal: SIZES.halfPadding,
  },
  infoTitle: {
    ...FONTS.h3,
    color: COLORS.font,
    textAlign: 'center',
  },
  descContainer: {
    marginTop: SIZES.margin,
  },
  descItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descTitle: { color: COLORS.font, ...FONTS.body3 },
  descValue: { color: COLORS.font, ...FONTS.body3 },
});
export default HorizontalCard;
