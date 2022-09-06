import React from 'react';
import { View, Text, TextInput, StyleSheet, Platform } from 'react-native';

import { FONTS, SIZES, COLORS } from '../../constants';

const FormInput = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  inputStyle,
  value = '',
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType = 'default',
  autoCompleteType = 'off',
  autoCapitalize = 'none',
  errorMsg = '',
  maxLength,
}) => {
  return (
    <View style={{ ...containerStyle }}>
      <View style={styles.innerContainer}>
        <Text style={styles.textLabelStyle}>{label}</Text>
        <Text style={styles.textErrorMsg}>{errorMsg}</Text>
      </View>

      <View
        style={{
          ...styles.baseInputContainer,
          ...inputContainerStyle,
        }}>
        {prependComponent}
        <TextInput
          style={{ ...styles.textInput, ...inputStyle }}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={COLORS.font}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCompleteType={autoCompleteType}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          onChangeText={text => onChange(text)}
        />
        {appendComponent}
      </View>
    </View>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  innerContainer: {
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

  baseInputContainer: {
    flexDirection: 'row',
    height: SIZES.height / 18,
    padding: SIZES.halfPadding,
    marginTop: SIZES.halfMargin / 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightBlack,
  },

  textInput: {
    flex: 1,
    lineHeight: Platform.OS === 'android' ? SIZES.height / 40 : null,
    height: Platform.OS === 'android' ? SIZES.height / 18 : null,
    textAlignVertical: 'center',
    marginLeft: SIZES.halfMargin,
    ...FONTS.body1,
  },
});
