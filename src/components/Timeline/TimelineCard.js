import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { COLORS, IMAGES, SIZES, FONTS } from '../../constants';
import LineDivider from '../LineDivider';
const TimelineCard = ({ data, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onPress(data.id)}
      disabled={!data.id}>
      <Text style={styles.timeStyle}> {data.time}</Text>
      <View
        style={{
          ...styles.cardContainer,
          backgroundColor: COLORS.white,
        }}>
        <View style={styles.cardContainerGlue}>
          <View style={styles.innerRowContainer}>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.titleStyle,
                }}>
                {data.tag}
              </Text>
              <Text style={styles.subtitleStyle}>
                {data.name.charAt(0).toUpperCase() + data.name.slice(1)}
              </Text>
            </View>
            <Image
              source={data.id ? { uri: data.imageUrl } : IMAGES.preferred_meal}
              style={styles.mealImage}
            />
          </View>
          {data.id && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.titleStyle}>Origin: </Text>
                <Text style={styles.subtitleStyle}>
                  {data.origin.charAt(0).toUpperCase() + data.origin.slice(1)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    ...styles.titleStyle,
                    marginRight: SIZES.halfMargin,
                  }}>
                  Category:
                </Text>
                <Text style={styles.subtitleStyle} numberOfLines={3}>
                  {data.category.charAt(0).toUpperCase() +
                    data.category.slice(1)}
                </Text>
              </View>
            </View>
          )}
          {data.id && (
            <View>
              <LineDivider
                lineStyle={{
                  backgroundColor: COLORS.primary,
                  marginVertical: SIZES.halfMargin,
                }}
              />
              <Text
                style={{
                  ...FONTS.subtitle,
                  marginLeft: 'auto',
                  color: COLORS.primary,
                  marginRight: SIZES.halfMargin,
                }}>
                View Recipe
              </Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '85%',
    paddingTop: 12,
    paddingLeft: 16,
    paddingBottom: 3,
    borderRadius: 322,
    alignSelf: 'baseline',
  },
  cardContainer: {
    marginTop: -SIZES.halfMargin,
    paddingTop: SIZES.padding,
    marginLeft: SIZES.margin,
    elevation: 8,
    borderRadius: 12,
    flexDirection: 'row',
    paddingBottom: 12,
    shadowColor: COLORS.transparentPrimary,
    shadowOpacity: 3,
    shadowOffset: {
      width: 5,
      height: 5,
    },
  },
  cardContainerGlue: {
    width: '100%',
    paddingLeft: 4,
    height: SIZES.height * 0.2,
  },
  innerRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    color: '#556084',
    marginRight: SIZES.halfMargin,
    fontSize: 14,
    ...FONTS.body1,
  },
  subtitleStyle: {
    color: COLORS.font,
    ...FONTS.body3,
  },
  timeStyle: {
    color: '#556084',
    marginLeft: SIZES.margin,
    marginBottom: SIZES.halfMargin,
    ...FONTS.body2,
  },
  mealImage: {
    width: SIZES.width * 0.18,
    aspectRatio: 1,
  },
});
export default TimelineCard;
