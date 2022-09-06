import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { COLORS, FONTS, ICONS, SIZES } from '../../constants';
import { LineDivider, IconButton, CustomModal } from '../';

const FormCheckbox = ({
  containerStyle,
  inputContainerStyle,
  label,
  boxType = 'square',
  onAnimationType = 'fade',
  offAnimationType = 'fade',
  errorMsg = '',
  options = [],
  info = null,
  onItemChecked,
  id = null,
}) => {
  const [toggleCheckBoxOptions, setToggleCheckboxOptions] = useState([
    false,
    false,
    false,
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  function toggleCheckBox(newValue, index) {
    setToggleCheckboxOptions(prevValue => {
      const updatedState = [...prevValue];
      updatedState[index] = newValue;
      /* Sending back to prakriti question screen which options are checked */
      onItemChecked(updatedState);
      return updatedState;
    });
  }

  function infoIconComponent() {
    return (
      info && (
        <IconButton
          icon={ICONS.information}
          containerStyle={styles.innerIconContainer}
          iconStyle={styles.icon}
          onPress={() => setIsModalVisible(prevState => !prevState)}
        />
      )
    );
  }

  return (
    <View style={{ ...containerStyle, ...styles.container }}>
      <View style={styles.textContainer}>
        <Text style={styles.textLabelStyle} numberOfLines={2}>
          {label}
        </Text>

        <Text style={styles.textErrorMsg}>{errorMsg}</Text>
      </View>
      <View
        style={{
          ...styles.baseInputContainer,
          ...inputContainerStyle,
        }}>
        <FlatList
          data={options}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          ListFooterComponent={infoIconComponent}
          ListFooterComponentStyle={styles.outerIconContainer}
          renderItem={({ item, index }) => (
            <>
              <TouchableOpacity
                style={styles.checkBoxContainer}
                onPress={() => {}}>
                <CheckBox
                  tintColor={COLORS.font}
                  onCheckColor={COLORS.primary}
                  onTintColor={COLORS.primary}
                  boxType={boxType}
                  value={toggleCheckBoxOptions[index]}
                  onAnimationType={onAnimationType}
                  offAnimationType={offAnimationType}
                  onValueChange={newValue => toggleCheckBox(newValue, index)}
                  tintColors={{ true: '#FBFBFB', false: COLORS.lightGrey }}
                />
                <Text style={styles.textStyle} numberOfLines={2}>
                  {item.value}
                </Text>
              </TouchableOpacity>

              {index < options.length - 1 && <LineDivider />}
            </>
          )}
        />
      </View>

      <CustomModal
        showModal={isModalVisible}
        onTouch={value => setIsModalVisible(value)}>
        <Text style={{ ...FONTS.body2, color: COLORS.transparentBlack }}>
          {info}
        </Text>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textContainer: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 25,
    marginTop: SIZES.height > 800 ? 40 : 20,
  },
  textLabelStyle: {
    color: COLORS.font,
    ...FONTS.h2,
  },
  textErrorMsg: {
    color: COLORS.danger,
    ...FONTS.subtitle,
  },
  baseInputContainer: {
    flexDirection: 'row',
    height: SIZES.height > 800 ? SIZES.height - 100 : SIZES.height - 120,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.height > 800 ? 4 * SIZES.radius : 2 * SIZES.radius,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.transparentPrimary,
  },
  icon: {
    width: 25,
    height: 25,
    tintColor: COLORS.black,
    alignSelf: 'flex-end',
    margin: 20,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    height: SIZES.height > 800 ? 100 : 60,
    alignItems: 'center',
    paddingLeft: 15,
    margin: 2,
  },
  textStyle: {
    ...FONTS.subtitle,
    marginHorizontal: 20,
    color: COLORS.grey,
  },
  outerIconContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 'auto',
  },
  innerIconContainer: {},
});

export default FormCheckbox;
