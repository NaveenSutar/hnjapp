import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet,
  Modal,
} from 'react-native';

import { LineDivider } from '../';
import { FONTS, SIZES, COLORS, ICONS } from '../../constants';

const FormPicker = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  prependComponent,
  value,
  setValue,
  modalTitle,
  modalStyle,
  options = [],
  errorMsg = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);
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
        onPress={() => setIsVisible(true)}>
        {prependComponent}

        <Text
          style={[
            { ...styles.textStyle },
            { color: value === '' ? COLORS.font : COLORS.black },
          ]}>
          {value === '' ? placeholder : value}
        </Text>

        <Image source={ICONS.down_arrow} style={styles.downArrow} />
      </TouchableOpacity>

      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContainer}>
          {/* Transparent Background */}
          <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>

          <View
            style={{
              width: SIZES.width * 0.8,
              padding: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: COLORS.white,
              ...modalStyle,
            }}>
            <Text style={{ ...FONTS.h3 }}>{modalTitle}</Text>

            <FlatList
              data={options}
              keyExtractor={item => `${item.id}`}
              contentContainerStyle={{
                marginTop: SIZES.radius,
              }}
              renderItem={({ item, index }) => (
                <>
                  <TouchableOpacity
                    style={styles.modalOptionsContainer}
                    onPress={() => {
                      setIsVisible(false);
                      setValue(item.value);
                    }}>
                    <Text
                      style={{
                        ...FONTS.body1,
                        color: COLORS.font,
                      }}>
                      {item.label}
                    </Text>
                  </TouchableOpacity>

                  {index < options.length - 1 && <LineDivider />}
                </>
              )}
            />
          </View>
        </View>
      </Modal>
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

  textStyle: {
    flex: 1,
    marginLeft: SIZES.halfMargin,
    ...FONTS.body1,
    textAlignVertical: 'center',
  },

  downArrow: {
    height: SIZES.height / 40,
    width: SIZES.height / 40,
    tintColor: COLORS.font,
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBlack,
  },

  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalOptionsContainer: {
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FormPicker;
