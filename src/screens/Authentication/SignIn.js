import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { AuthLayout } from '../';
import {
  FormInput,
  TextButtonSignIn,
  FormCountryPicker,
} from '../../components';
import { utils } from '../../utils';
import { authActions } from '../../store';
import { SIZES, COLORS, ICONS, IMAGES, FONTS } from '../../constants';

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  /* Country Picker State */
  const [country, setCountry] = useState(null);

  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');

  function isEnableSignIn() {
    return mobile !== '' && mobileError === '';
  }

  function sendOTP() {
    const trimmedMobile = mobile.replace(/[^\d]/g, '');
    dispatch(authActions.sendOtp(`${country}${trimmedMobile}`, navigation));
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
            Let's Sign You In
          </Text>
          <Text
            style={{
              ...FONTS.body1,
              color: COLORS.font,
              marginTop: SIZES.halfMargin,
            }}>
            Welcome on your journey to better health
          </Text>

          {/* Country Picker */}

          <View style={{ flexDirection: 'row', marginTop: SIZES.margin }}>
            <FormCountryPicker
              containerStyle={{ flex: 1, marginEnd: SIZES.halfMargin }}
              label="Code"
              placeholder=""
              value={country}
              setCountry={setCountry}
              callingCode={true}
            />

            <FormInput
              label="Mobile Number"
              keyboardType="number-pad"
              autoCapitalize="none"
              autoCorrect={false}
              value={mobile}
              containerStyle={{ flex: 3 }}
              maxLength={10}
              onChange={value => {
                // utils.validateMobileNumber(value, setMobileError);
                setMobile(value);
              }}
              errorMsg={mobileError}
              prependComponent={
                <Image
                  source={ICONS.phone}
                  style={{
                    width: SIZES.height / 40,
                    height: SIZES.height / 40,
                    tintColor: COLORS.font,
                  }}
                />
              }
              appendComponent={
                <View style={styles.appendComponentContainer}>
                  <Image
                    source={
                      mobile === '' || (mobile !== '' && mobileError === '')
                        ? ICONS.correct
                        : ICONS.cancel
                    }
                    style={{
                      ...styles.appendComponentImage,
                      tintColor:
                        mobile === ''
                          ? COLORS.font
                          : mobile !== '' && mobileError === ''
                          ? COLORS.primary
                          : COLORS.warning,
                    }}
                  />
                </View>
              }
            />
          </View>

          <TextButtonSignIn
            label="Sign In"
            disabled={isEnableSignIn() ? false : true}
            buttonContainerStyle={{
              position: 'absolute',
              bottom: SIZES.margin,
              backgroundColor: isEnableSignIn() ? COLORS.primary : COLORS.white,
            }}
            onPress={sendOTP}
          />
        </View>
      </TouchableWithoutFeedback>
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

  appendComponentContainer: {
    justifyContent: 'center',
  },

  appendComponentImage: {
    height: SIZES.height / 40,
    width: SIZES.height / 40,
  },
});

export default SignIn;
