import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { FONTS, SIZES, COLORS, ICONS } from '../../constants';

const FormCountryPicker = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  setCountry,
  value,
  errorMsg = '',
  callingCode = false,
}) => {
  const [withFilter, setWithFilter] = useState(true);
  const [withCallingCode, setWithCallingCode] = useState(true);
  const [open, setOpen] = useState(false);

  function onSelect(country) {
    if (callingCode) {
      setCountry(country.callingCode[0]);
    } else {
      setCountry(country.name);
    }
  }

  return (
    <View style={{ ...containerStyle }}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabelStyle}>{label}</Text>
        {/* <Text style={styles.textErrorMsg}>{errorMsg}</Text> */}
      </View>

      <TouchableOpacity
        style={{
          ...styles.inputContainer,
          ...inputContainerStyle,
        }}
        onPress={() => setOpen(true)}>
        <Image source={ICONS.country} style={styles.imageStyle} />
        <Text
          style={[
            { ...styles.textStyle },
            { color: value ? COLORS.black : COLORS.font },
          ]}>
          {value ? (callingCode ? `+${value}` : value) : placeholder}
        </Text>
      </TouchableOpacity>

      <CountryPicker
        visible={open}
        onClose={() => setOpen(false)}
        {...{
          onSelect,
          withFilter,
          withCallingCode,
        }}
        containerButtonStyle={styles.country}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textLabelStyle: {
    color: COLORS.font,
    ...FONTS.body2,
  },

  textErrorMsg: {
    color: COLORS.danger,
    ...FONTS.body2,
  },

  inputContainer: {
    flexDirection: 'row',
    height: SIZES.height / 18,
    padding: SIZES.halfPadding,
    marginTop: SIZES.halfMargin / 2,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightBlack,
  },

  imageStyle: {
    width: SIZES.height / 40,
    height: SIZES.height / 40,
    tintColor: COLORS.font,
  },

  textStyle: {
    marginLeft: SIZES.halfMargin,
    ...FONTS.body1,
    textAlignVertical: 'center',
  },

  country: {
    opacity: 0,
    height: 0,
  },
});

export default FormCountryPicker;
