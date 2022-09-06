import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLORS, FONTS, SIZES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { utils } from '../../utils';

const QCheckBox = ({ onItemChecked, options, quesId, scriptType }) => {
  const [toggleCheckBoxOptions, setToggleCheckboxOptions] = useState([
    false,
    false,
    false,
  ]);
  useEffect(() => {
    async function setCheckBoxState() {
      const prakritiAnswerFromAsyncStorage = await AsyncStorage.getItem(
        'prakritiAnswers',
      );
      const parsedPrakritiAnswerFromAsyncStorage = JSON.parse(
        prakritiAnswerFromAsyncStorage,
      );
      if (parsedPrakritiAnswerFromAsyncStorage) {
        const isQuestionFound = parsedPrakritiAnswerFromAsyncStorage.find(
          item => item.id === quesId,
        );
        if (isQuestionFound) {
          setToggleCheckboxOptions([...isQuestionFound.answers]);
        }
      }
    }
    if (scriptType === utils.PRAKRITI_SCRIPT_TYPES.question) {
      setCheckBoxState();
    }
  }, [quesId, scriptType]);

  function toggleCheckBox(newValue, index) {
    setToggleCheckboxOptions(prevValue => {
      const updatedState = [...prevValue];
      updatedState[index] = newValue;
      /* Sending back to prakriti question screen which options are checked */
      onItemChecked(updatedState);
      return updatedState;
    });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={options}
        keyExtractor={item => `${item.id}`}
        contentContainerStyle={{
          marginTop: SIZES.halfMargin,
        }}
        extraData={toggleCheckBoxOptions}
        renderItem={({ item, index }) => (
          <>
            <TouchableOpacity
              keyExtractor={index}
              activeOpacity={0.5}
              style={styles.checkBoxContainer}
              onPress={() => {}}>
              <BouncyCheckbox
                size={SIZES.height / 35}
                fillColor={COLORS.primary}
                unfillColor="#FFFFFF"
                text={item.value}
                iconStyle={{
                  borderColor: COLORS.font,
                  borderRadius: SIZES.height / 120,
                }}
                isChecked={toggleCheckBoxOptions[index]}
                disableBuiltInState={true}
                onPress={newValue =>
                  toggleCheckBox(!toggleCheckBoxOptions[index], index)
                }
                textStyle={{
                  ...FONTS.body1,
                  color: COLORS.font,
                  textDecorationLine: 'none',
                }}
              />

              {/* <Text style={styles.textStyle} numberOfLines={2}>
                {item.value}
              </Text> */}
            </TouchableOpacity>
          </>
        )}
      />
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

  textErrorMsg: {
    color: COLORS.danger,
    ...FONTS.subtitle,
  },

  icon: {
    width: 20,
    height: 25,
    tintColor: COLORS.black,
    alignSelf: 'flex-end',
  },

  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLORS.font,
    borderWidth: 0.5,
    marginVertical: SIZES.halfMargin,
    padding: SIZES.halfPadding * 2,
    borderRadius: SIZES.radius / 2,
  },

  textStyle: {
    ...FONTS.body1,
    color: COLORS.font,
    marginLeft: SIZES.halfMargin,
  },

  outerIconContainer: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 'auto',
  },

  innerIconContainer: {},
});

export default QCheckBox;
