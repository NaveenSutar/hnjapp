import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { FONTS, SIZES, COLORS, ICONS } from '../../constants';
import { utils } from '../../utils';
const FormDateInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  setDate,
  value,
  errorMsg = '',
  prependComponent,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ ...containerStyle }}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabelStyle}>{label}</Text>
        <Text style={styles.textErrorMsg}>{errorMsg}</Text>
      </View>

      <TouchableOpacity
        style={{
          ...styles.inputContainer,
          ...inputContainerStyle,
        }}
        onPress={() => setOpen(true)}>
        {prependComponent}
        <Text
          style={[
            { ...styles.textStyle },
            { color: value ? COLORS.black : COLORS.font },
          ]}>
          {value ? utils.formatDate(value) : placeholder}
        </Text>

        {/* <Image source={ICONS.calender} style={styles.imageStyle} /> */}
      </TouchableOpacity>

      <DatePicker
        modal
        open={open}
        date={value ? utils.generateDateObjectFromString(value) : new Date()}
        mode="date"
        title={label}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
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
    height: SIZES.height / 40,
    width: SIZES.height / 40,
  },

  textStyle: {
    flex: 1,
    ...FONTS.body1,
    marginLeft: SIZES.halfMargin,
  },
});

export default FormDateInput;
