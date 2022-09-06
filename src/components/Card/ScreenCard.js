import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';

const ScreenCard = ({
  label,
  body,
  footNote,
  containerStyle,
  imageBackground,
  icon,
  imageBackgroundWidth,
}) => {
  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      <View style={styles.textContainer}>
        {label ? <Text style={styles.textHeaderStyle}>{label}</Text> : null}
        <Text style={label ? styles.textBodyStyle : styles.textHeaderStyle}>
          {body}
        </Text>
        <View style={styles.footLabel}>
          <Text style={styles.textLinkStyle}>{footNote}</Text>
          <Image style={styles.icon} source={{ uri: icon }} />
        </View>
        {imageBackgroundWidth ? (
          <Image
            style={styles.imgBackgroundWidth}
            source={{ uri: imageBackgroundWidth }}
          />
        ) : (
          <Image
            style={styles.imgBackground}
            source={{ uri: imageBackground }}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    height: SIZES.height > 800 ? SIZES.height - 100 : SIZES.height - 120,
    paddingHorizontal: 25,
    marginVertical: SIZES.height > 800 ? 40 : 20,
  },
  textHeaderStyle: {
    color: COLORS.grey,
    ...FONTS.h2,
    margin: 15,
  },
  textBodyStyle: {
    color: COLORS.grey,
    ...FONTS.subtitle,
    margin: 15,
  },
  textLinkStyle: {
    margin: 15,
    color: COLORS.transparentBlack,
    ...FONTS.h3,
  },
  imgBackgroundWidth: {
    width: SIZES.width * 1.12,
    height: SIZES.height * 0.4,
    alignSelf: 'center',
    marginLeft: '25%',
    borderRadius: SIZES.radius,
  },
  imgBackground: {
    width: SIZES.width,
    height: SIZES.height * 0.4,
    alignSelf: 'center',
    borderRadius: SIZES.radius,
  },
  icon: {
    width: 35,
    height: 35,
    // margin: 18,
    marginRight: 60,
    alignSelf: 'center',
  },
  footLabel: {
    flexDirection: 'row',
    // width: '100%',
  },
});

export default ScreenCard;
