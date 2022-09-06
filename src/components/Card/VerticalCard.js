import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { COLORS, FONTS, ICONS, SIZES } from '../../constants';

const VerticalCard = ({ containerStyle, item, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 200,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.radius,
        alignItems: 'center',
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.lightGrey,
        ...containerStyle,
      }}
      onPress={onPress}>
      {/* Calories and Favourite */}
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Image
            source={ICONS.calories}
            style={{
              width: 30,
              height: 30,
            }}
          />
          <Text style={{ ...FONTS.body3, color: COLORS.font }}>
            {23} Calories
          </Text>
        </View>
        <Image
          source={ICONS.calories}
          style={{
            width: 20,
            height: 20,
            tintColor: item.isFavourite ? COLORS.primary : COLORS.grey,
          }}
        />
      </View>

      {/* Image */}
      <View
        style={{
          height: 150,
          width: 150,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          source={{
            uri: 'https://healthandjiva.s3.ap-south-1.amazonaws.com/noodle_soup.png',
          }}
          style={{ height: '100%', width: '100%' }}
        />
      </View>

      {/* Info */}
      <View
        style={{
          alignItems: 'center',
          marginTop: -20,
        }}>
        <Text style={{ ...FONTS.h3 }}>{'Food Item'}</Text>
        <Text
          style={{
            ...FONTS.body3,
            color: COLORS.font,
            textAlign: 'center',
          }}>
          {'There is a LOT TO TELL'}
        </Text>
        <Text style={{ ...FONTS.h2, marginTop: SIZES.radius }}>${23}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCard;
