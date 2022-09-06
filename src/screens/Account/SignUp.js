import React, { useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormInput,
  FormDateInput,
  FormPicker,
  FormCountryPicker,
  TextButtonSignIn,
} from '../../components';
import { COLORS, SIZES, ICONS, GENDERS, IMAGES, FONTS } from '../../constants';
import { userActions } from '../../store';
import { utils } from '../../utils';

const SignUp = ({ navigation, route }) => {
  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName);
  const [firstNameError, setFirstNameError] = useState('');

  const [lastName, setLastName] = useState(user.lastName);

  const [email, setEmail] = useState(user.email);
  const [emailError, setEmailError] = useState('');

  const [dob, setDob] = useState(user.dob);

  const [gender, setGender] = useState(user.gender);

  const [country, setCountry] = useState(user.country);

  function updateAccountDetails() {
    const userDetails = {
      firstName,
      lastName,
      email,
      dob,
      gender,
      country,
    };
    dispatch(userActions.updateUserDetails(userDetails, navigation));
  }
  function isEnableSave() {
    return (
      firstName !== '' &&
      firstNameError === '' &&
      email !== '' &&
      emailError === ''
    );
  }

  function renderForm() {
    return (
      <View>
        {/* First Name */}

        <FormInput
          label="First Name *"
          value={firstName}
          placeholder="John"
          autoCapitalize="words"
          onChange={value => {
            utils.validateFieldForEmpty(value, setFirstNameError);
            setFirstName(value);
          }}
          errorMsg={firstNameError}
          containerStyle={
            {
              // marginTop: SIZES.halfMargin,
            }
          }
          prependComponent={
            <Image
              source={ICONS.user}
              style={{
                width: SIZES.height / 40,
                height: SIZES.height / 40,
                tintColor: COLORS.font,
              }}
            />
          }
        />

        {/* Last Name */}
        <FormInput
          label="Last Name"
          placeholder="Doe"
          autoCapitalize="words"
          value={lastName}
          onChange={value => {
            setLastName(value);
          }}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
          prependComponent={
            <Image
              source={ICONS.user}
              style={{
                width: SIZES.height / 40,
                height: SIZES.height / 40,
                tintColor: COLORS.font,
              }}
            />
          }
        />

        {/* Email */}
        <FormInput
          label="Email *"
          placeholder={'johndoe@domain.com'}
          value={email?.trim()}
          onChange={value => {
            // utils.validateFieldForEmpty(value, setEmailError);
            utils.validateEmail(value.trim(), setEmailError);
            setEmail(value);
          }}
          errorMsg={emailError}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
          prependComponent={
            <Image
              source={ICONS.email}
              style={{
                width: SIZES.height / 40,
                height: SIZES.height / 40,
                tintColor: COLORS.font,
              }}
            />
          }
        />

        {/* D.O.B */}
        <FormDateInput
          label="Date of Birth"
          placeholder="MM/DD/YYYY"
          value={dob}
          setDate={setDob}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
          prependComponent={
            <Image
              source={ICONS.calender}
              style={{
                width: SIZES.height / 40,
                height: SIZES.height / 40,
                tintColor: COLORS.font,
              }}
            />
          }
        />

        {/* Gender */}
        <FormPicker
          label="Gender"
          placeholder="Select gender"
          modalTitle="Select Gender"
          value={gender}
          setValue={setGender}
          options={GENDERS}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
          prependComponent={
            <Image
              source={ICONS.gender}
              style={{
                width: SIZES.height / 40,
                height: SIZES.height / 40,
                tintColor: COLORS.font,
              }}
            />
          }
        />

        {/* Country */}
        <FormCountryPicker
          label="Country"
          placeholder="Select Country"
          value={country}
          setCountry={setCountry}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={IMAGES.logo}
            style={{
              height: SIZES.height / 10,
              width: SIZES.height / 10,
              marginLeft: -SIZES.margin,
            }}
            height={SIZES.height / 10}
            width={SIZES.height / 10}
          />
          <Text
            style={{
              ...FONTS.logo,
              color: COLORS.primary,
              marginLeft: -SIZES.halfMargin,
            }}>
            Health & Jiva
          </Text>
        </View>

        <Text
          style={{
            ...FONTS.h1,
            color: COLORS.font,
            marginTop: SIZES.halfMargin,
          }}>
          It's About You
        </Text>
        <Text
          style={{
            ...FONTS.body1,
            color: COLORS.font,
            marginTop: SIZES.halfMargin,
          }}>
          We need some more information about you
        </Text>

        <KeyboardAwareScrollView
          keyboardDismissMode="on-drag"
          contentContainerStyle={styles.contentContainer}>
          {renderForm()}
          <TextButtonSignIn
            label="Save"
            disabled={isEnableSave() ? false : true}
            buttonContainerStyle={{
              marginVertical: SIZES.margin,
              backgroundColor: isEnableSave() ? COLORS.primary : COLORS.white,
            }}
            onPress={updateAccountDetails}
          />
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },

  container: {
    padding: SIZES.padding,
    alignItems: 'center',
    flex: 1,
  },

  leftComponentIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.grey,
  },

  rightComponent: {
    width: 40,
  },

  contentContainer: {
    marginTop: SIZES.margin,
    width: SIZES.width - SIZES.margin * 2,
  },

  modalStyle: {
    height: 250,
  },
});
export default SignUp;
