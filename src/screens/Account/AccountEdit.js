import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import { AppNavigator } from '../../navigation';

import {
  Header,
  IconButton,
  TextButton,
  FormInput,
  FormDateInput,
  FormPicker,
  FormCountryPicker,
} from '../../components';
import { COLORS, SIZES, ICONS, GENDERS, IMAGES, FONTS } from '../../constants';
import { userActions } from '../../store';
import { utils } from '../../utils';

const AccountEdit = ({ navigation, route }) => {
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

  function renderHeader() {
    return (
      <Header
        title={route.params.headerTitle}
        showLeftComponent={route.params.showLeftComponent}
        leftComponent={
          <IconButton
            icon={ICONS.back}
            containerStyle={styles.leftComponentIconContainer}
            iconStyle={styles.leftComponentIcon}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <TouchableOpacity style={styles.headerRightComponentTouch}>
            <Image
              style={styles.headerRightComponentImage}
              source={IMAGES.user}
            />
          </TouchableOpacity>
        }
      />
    );
  }

  function renderForm() {
    return (
      <View style={styles.formContainer}>
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
          inputContainerStyle={{
            backgroundColor: COLORS.white,
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

        {/* Last Name */}
        <FormInput
          label="Last Name"
          placeholder="Doe"
          autoCapitalize="words"
          value={lastName}
          onChange={value => {
            setLastName(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
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
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
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
          inputContainerStyle={{
            backgroundColor: COLORS.white,
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
          inputContainerStyle={{
            backgroundColor: COLORS.white,
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
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}

      <KeyboardAwareScrollView
        keyboardDismissMode="on-drag"
        contentContainerStyle={styles.contentContainer}>
        {renderForm()}
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={updateAccountDetails}
          style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>Save</Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  leftComponentIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.grey,
  },
  leftComponentIcon: { width: 20, height: 20, tintColor: COLORS.grey },
  headerRightComponentTouch: {
    borderRadius: SIZES.radius,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerRightComponentImage: {
    width: SIZES.height / 25,
    height: 0,
    borderRadius: SIZES.radius,
  },
  formContainer: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: '#F5F5F8',
  },
  contentContainer: {
    paddingHorizontal: SIZES.padding,
  },
  buttonContainerStyle: {
    width: '100%',
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.margin * 4,
  },
  buttonTextStyle: {
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
  modalStyle: {
    height: 250,
  },
});
export default AccountEdit;
