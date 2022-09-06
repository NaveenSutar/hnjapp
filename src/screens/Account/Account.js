import React from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, SCREENS, SIZES, ICONS } from '../../constants';
import {
  Header,
  IconButton,
  InfoItem,
  LineDivider,
  TextButton,
} from '../../components';
import { utils } from '../../utils';

const Account = ({ navigation }) => {
  const user = useSelector(state => state.user);
  function renderHeader() {
    return (
      <Header
        title="MY ACCOUNT"
        leftComponent={
          <IconButton
            icon={ICONS.back}
            containerStyle={styles.headerIconContainer}
            iconStyle={styles.headerIcon}
            onPress={() => navigation.goBack()}
          />
        }
        rightComponent={
          <TextButton
            label="Edit"
            labelStyle={{
              color: COLORS.primary,
            }}
            buttonContainerStyle={styles.headerRightComponentContainer}
            onPress={() =>
              navigation.navigate(SCREENS.account_edit, {
                showLeftComponent: true,
                headerTitle: 'Edit',
              })
            }
          />
        }
      />
    );
  }
  function renderSectionOne() {
    return (
      <View style={styles.sectionOneContainer}>
        {/* TODO: Restrict number of alphabets to display  */}
        <InfoItem label="First Name" value={user.firstName} />

        <InfoItem label="Last Name" value={user.lastName} />
        {/* TODO: Separate Mobile number with country code */}
        <InfoItem label="Phone Number" value={user.mobile} />

        <InfoItem label="Email" value={user.email} />

        <InfoItem label="Gender" value={user.gender} />

        <InfoItem
          label="Date of Birth"
          value={utils.formatDate(user.dob)}
          withDivider={false}
        />
      </View>
    );
  }

  function renderSectionTwo() {
    return (
      <View style={styles.sectionTwoContainer}>
        <InfoItem label="Food Allergies" value={user.foodAllergies} />
        <InfoItem
          label="Breakfast Preference"
          value={user.breakfastPreference}
        />
        <InfoItem label="Lunch Preference" value={user.lunchPreference} />
        <InfoItem label="Dinner Preference" value={user.dinnerPreference} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        {renderSectionOne()}
        {/* {renderSectionTwo()} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    height: 50,
    marginHorizontal: SIZES.padding,
    marginTop: SIZES.margin,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.grey,
  },
  headerIcon: {
    width: 20,
    height: 20,
    tintColor: COLORS.grey,
  },
  headerRightComponentContainer: {
    backgroundColor: null,
  },
  scrollViewContainer: {
    paddingHorizontal: SIZES.padding,
  },
  lineDividerStyle: {
    marginTop: SIZES.margin,
  },
  sectionOneContainer: {
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    backgroundColor: '#F5F5F8',
  },
  sectionTwoContainer: {
    marginTop: SIZES.margin,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.padding,
    backgroundColor: '#F5F5F8',
  },
});

export default Account;
