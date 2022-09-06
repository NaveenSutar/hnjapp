import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { COLORS, SIZES, ICONS, IMAGES, FONTS } from '../../constants';
import { Header, IconButton, TextButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { userActions } from '../../store';
import { useDispatch } from 'react-redux';

const CancelSubscription = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function renderHeader() {
    return (
      <Header
        title={'Cancel Subscription'}
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
  function cancelSubscription() {
    dispatch(userActions.cancelSubscription(navigation));
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderHeader()}
        <View style={styles.cancelSubscriptionContainer}>
          <Text style={styles.cancelSubscriptionHeading}>
            We Are Sad To See You Go
          </Text>
          <Text style={styles.cancelSubscriptionSubTitle}>
            We hope we have provided you our best if not please help us
            understand how we can do better . Wishing you the best of Health
          </Text>
          <Image source={IMAGES.cancel_subscription} />
        </View>
        <View style={styles.cancelConfirmationContainer}>
          <Text style={styles.cancelConfirmationText}>
            Are you sure you want to unsubscribe now?
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <TextButton
            buttonContainerStyle={styles.nerverMindButtonStyle}
            label="Never Mind"
            labelStyle={{
              color: COLORS.white,
              ...FONTS.h3,
            }}
            onPress={() => {
              navigation.goBack();
            }}
          />
          <TextButton
            buttonContainerStyle={styles.cancelSubscriptionButtonStyle}
            label="Cancel my subscription"
            labelStyle={{
              color: '#898B9A',
            }}
            onPress={cancelSubscription}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
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
  leftComponentIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.grey,
  },
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
  cancelSubscriptionContainer: {
    backgroundColor: COLORS.lightBlack,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin,
    padding: SIZES.padding,
    alignItems: 'center',
  },
  cancelSubscriptionHeading: {
    ...FONTS.h2,
  },
  cancelSubscriptionSubTitle: {
    ...FONTS.body2,
    marginVertical: SIZES.margin,
    marginHorizontal: SIZES.margin,
  },
  cancelConfirmationContainer: {
    alignItems: 'center',
    marginVertical: SIZES.margin,
  },
  cancelConfirmationText: {
    ...FONTS.body2,
    color: COLORS.grey,
  },
  buttonContainer: {
    padding: SIZES.padding,
  },
  nerverMindButtonStyle: {
    marginVertical: SIZES.halfMargin,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius,
  },
  cancelSubscriptionButtonStyle: {
    marginVertical: SIZES.halfMargin,
    borderRadius: SIZES.radius,
    padding: SIZES.padding / 2,
    backgroundColor: COLORS.lightGrey,
  },
});

export default CancelSubscription;
