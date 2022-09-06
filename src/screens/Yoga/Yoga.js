import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { SCREENS, COLORS, FONTS, SIZES, IMAGES } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
  CustomActivityIndicator,
  AnalysePrakriti,
  TextButton,
  CustomModal,
} from '../../components';
import { YogaList } from '../';
import { ScrollView } from 'react-native-gesture-handler';
import { userActions } from '../../store';
import { useNavigation } from '@react-navigation/native';

const Yoga = () => {
  const user = useSelector(state => state.user);
  // const user = { prakritiAnswers: [] };
  const dispatch = useDispatch();
  const [isFreeTrialModalVisible, setIsFreeTialModalVisible] = useState(false);
  const navigation = useNavigation();

  function isUserPrakritiCalculated() {
    if (user.prakritiAnswers.length) {
      if (user.yoga && user.subscriptionId) {
        return <YogaList />;
      } else {
        return renderGenerateYogaPlanButton();
      }
    } else {
      return renderAnalysePrakritiButton();
    }
  }

  function renderAnalysePrakritiButton() {
    return <AnalysePrakriti />;
  }

  function renderGenerateYogaPlanButton() {
    return (
      <View>
        <Image source={IMAGES.generate_yoga} style={styles.generateYogaImage} />

        {/* <TouchableOpacity
          activeOpacity={0.5}
          onPress={generateYogaPlan}
          style={styles.buttonContainerStyle}>
          <Text style={styles.buttonTextStyle}>Generate Yoga Plan</Text>
        </TouchableOpacity> */}
        <View
          style={{
            backgroundColor: COLORS.white,
            margin: SIZES.margin,
            borderRadius: SIZES.radius,
            padding: SIZES.padding,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            elevation: 3,
          }}>
          <Text style={{ ...FONTS.h1 }}>Personalised Yoga</Text>
          <Text style={{ ...FONTS.body2 }}>
            {' '}
            Click here for highly personalised yoga plans.
          </Text>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={generateYogaPlan}
            style={styles.buttonContainerStyle}>
            <Text style={styles.buttonTextStyle}>Generate</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function renderFreeTrialPopup() {
    setIsFreeTialModalVisible(true);
  }

  function generateYogaPlan() {
    if (user.subscriptionId) {
      dispatch(userActions.generateYogaPlan());
    } else {
      return renderFreeTrialPopup();
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {user.prakritiAnswers ? (
          isUserPrakritiCalculated()
        ) : (
          <CustomActivityIndicator screen={SCREENS.yoga} />
        )}
      </ScrollView>
      <CustomModal
        showModal={isFreeTrialModalVisible}
        onPress={() => {
          setIsFreeTialModalVisible(false);
        }}>
        <Image source={IMAGES.free_trial} style={styles.freeTrialImage} />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate(SCREENS.subscription);
            setIsFreeTialModalVisible(false);
          }}
          style={styles.modalButton}>
          <Text style={styles.modalButtonTextStyle}>Start Free Trial</Text>
        </TouchableOpacity>
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainerStyle: {
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    width: SIZES.width / 3,
    marginTop: SIZES.margin,
  },
  buttonTextStyle: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
  modalButton: {
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  modalButtonTextStyle: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
  saveButton: {
    width: '100%',
    padding: SIZES.halfPadding * 1.5,
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h3,
  },
  generateYogaImage: {
    height: SIZES.height / 2.5,
    width: SIZES.width,
  },
  freeTrialImage: {
    height: SIZES.height / 4,
    width: SIZES.width / 1.5,
  },
});

export default Yoga;
