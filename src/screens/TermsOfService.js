import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Linking,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header, IconButton } from '../components';
import { FONTS, COLORS, SIZES, ICONS, IMAGES } from '../constants';
import { useNavigation } from '@react-navigation/native';

const TermsOfService = () => {
  const navigation = useNavigation();
  function openTerms() {
    Linking.openURL('https://healthandjiva.com/terms-of-service/');
  }
  function renderHeader() {
    return (
      <Header
        title={'Terms Of Service'}
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

  function renderTermsOfService() {
    return (
      <View style={styles.termsOfServiceContainer}>
        <Text style={styles.termsOfServiceText}>
          Ayurveda literally means “Science of life” or “Knowledge of life”.
          Ayurveda places great emphasis on prevention and encourages the
          maintenance of health through close attention to balance in one’s
          life, right thinking, diet, lifestyle, and the use of herbs. Knowledge
          of Ayurveda helps to understand this balance of body, mind, and
          consciousness according to one’s own individual constitution and how
          to make lifestyle changes to bring about and maintain this balance.
          {'\n'}
          {'\n'}
          Just as everyone has a unique fingerprint, each person has a
          particular pattern of energy—an individual combination of physical,
          mental, and emotional characteristics—which comprises their own
          constitution. This constitution is determined at conception by a
          number of factors and remains the same throughout one’s life.
          {'\n'}
          {'\n'}
          It describes the beneficial and harmful factors of life[1].
          {'\n'}
          {'\n'}
          The practice of Ayurveda as medicine is believed to date back to over
          five thousand years,{' '}
          <Text style={styles.readMore} onPress={openTerms}>
            Read More
          </Text>
        </Text>
        {/* <Button onPress={openTerms} title="Read More" /> */}
      </View>
    );
  }
  return (
    // <ScrollView>
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {renderHeader()}
        {renderTermsOfService()}
      </ScrollView>
    </SafeAreaView>

    // </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
  termsOfServiceContainer: {
    padding: SIZES.padding,
  },
  termsOfServiceText: {
    ...FONTS.body1,
  },
  readMore: {
    ...FONTS.body1,
    color: COLORS.primary,
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
});

export default TermsOfService;
