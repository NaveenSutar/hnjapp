import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Image,
  SafeAreaView,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import { useDispatch } from 'react-redux';
import {
  FONTS,
  SIZES,
  COLORS,
  RESEND_OTP_TIME_LIMIT,
  IMAGES,
} from '../../constants';
import { authActions } from '../../store';
import { TextButtonSignIn, TextButton } from '../../components';
import { AuthLayout } from '../';

let resendOtpTimerInterval;

const Otp = ({ navigation, route }) => {
  const dispatch = useDispatch();
  //TODO: check in old app is the otp screen was reloading multiople times

  const [resendButtonDisabledTime, setResendButtonDisabledTime] = useState(
    RESEND_OTP_TIME_LIMIT,
  );
  const [filledCode, setFilledCode] = useState('5');
  useEffect(() => {
    startResendOtpTimer();

    return () => {
      if (resendOtpTimerInterval) {
        clearInterval(resendOtpTimerInterval);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resendButtonDisabledTime]);

  function openPrivacyPolicy() {
    Linking.openURL('https://healthandjiva.com/privacy-policy/');
  }

  function startResendOtpTimer() {
    if (resendOtpTimerInterval) {
      clearInterval(resendOtpTimerInterval);
    }
    resendOtpTimerInterval = setInterval(() => {
      if (resendButtonDisabledTime <= 0) {
        clearInterval(resendOtpTimerInterval);
      } else {
        setResendButtonDisabledTime(resendButtonDisabledTime - 1);
      }
    }, 1000);
  }

  function verifyOTP() {
    dispatch(authActions.verifyOtp(filledCode, route.params.mobile));
  }

  function onResendButtonPress() {
    setResendButtonDisabledTime(RESEND_OTP_TIME_LIMIT);
    startResendOtpTimer();
    dispatch(authActions.sendOtp(route.params.mobile));
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
          OTP Authentication
        </Text>
        <Text
          style={{
            ...FONTS.body1,
            color: COLORS.font,
            marginTop: SIZES.halfMargin,
            textAlign: 'center',
          }}>
          An authentication code has been sent to your mobile number
        </Text>

        <View style={styles.otpContainer}>
          {/* OTP */}
          <OTPInputView
            pinCount={6}
            autoFocusOnLoad
            style={styles.otpInputView}
            codeInputFieldStyle={{
              ...styles.otpInputField,
              ...FONTS.h2,
            }}
            onCodeFilled={code => {
              setFilledCode(code);
            }}
          />

          {/* Countdown Timer */}
          <View style={styles.timerContainer}>
            <Text style={{ color: COLORS.grey, ...FONTS.body1 }}>
              Didn't receive code.
            </Text>
            <TextButton
              label={
                resendButtonDisabledTime !== 0
                  ? ` Resend in (${resendButtonDisabledTime}s)`
                  : ' Resend'
              }
              disabled={resendButtonDisabledTime === 0 ? false : true}
              buttonContainerStyle={styles.buttonContainer}
              labelStyle={{
                color:
                  resendButtonDisabledTime === 0 ? COLORS.primary : COLORS.font,
                ...FONTS.body1,
              }}
              onPress={onResendButtonPress}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View style={{ width: '100%' }}>
          <TextButtonSignIn
            label="Continue"
            disabled={false}
            buttonContainerStyle={{
              backgroundColor: COLORS.primary,
            }}
            onPress={verifyOTP}
          />

          <View style={styles.tncContainer}>
            <Text style={{ ...FONTS.body1, color: COLORS.font }}>
              By Signing up, you agree to our.
            </Text>
            <TextButton
              label="Terms and Conditions"
              buttonContainerStyle={styles.buttonContainer}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.body1,
              }}
              onPress={openPrivacyPolicy}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Otp;

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

  otpContainer: {
    flex: 1,
    marginTop: SIZES.margin,
  },

  otpInputView: {
    width: SIZES.width - SIZES.margin * 2,
    alignItems: 'center',
    justifyContent: 'center',
    height: SIZES.width / 8,
  },

  otpInputField: {
    width: SIZES.width / 8,
    height: SIZES.width / 6,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightBlack,
    color: COLORS.font,
  },

  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.margin,
  },

  continueButton: {
    height: 50,
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },

  tncContainer: {
    marginTop: SIZES.margin,
    alignItems: 'center',
  },

  buttonContainer: {
    backgroundColor: null,
  },
});
