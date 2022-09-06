import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Linking,
  SafeAreaView,
} from 'react-native';
import { FONTS, COLORS, SIZES, ICONS, GIFS, IMAGES } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { Header, IconButton } from '../components';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
const Help = () => {
  const navigation = useNavigation();

  function redirectToInstaProfile() {
    Linking.openURL('https://www.instagram.com/healthandjiva/');
  }

  function renderHeader() {
    return (
      <Header
        title={'Help & Support'}
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
  function renderRefer() {
    return (
      <View style={styles.boxContainer}>
        <Image source={GIFS.contact} style={styles.contactImage} />
        <Text style={styles.heading}>Get in Touch!</Text>
        <Text style={styles.subHeading}>
          Want to know more or join us, write at {'\n'}
          info@healthandjiva.com
        </Text>
        <View style={{ flexDirection: 'row' }}>
          <Text onPress={redirectToInstaProfile} style={styles.instaLink}>
            Follow us on
          </Text>
          <TouchableOpacity onPress={redirectToInstaProfile}>
            <Image source={ICONS.instagram} style={styles.iconImage} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderRefer()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  boxContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    ...FONTS.h2,
    margin: SIZES.halfMargin,
    color: '#679279',
  },
  subHeading: {
    ...FONTS.body1,
    textAlign: 'center',
    margin: SIZES.halfMargin,
    // textDecorationLine: 'underline',
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
  contactImage: {
    width: SIZES.width * 0.45,
    height: SIZES.height * 0.25,
  },
  iconImage: {
    width: 30,
    height: 30,
    margin: SIZES.halfMargin / 2,
  },
  instaLink: {
    ...FONTS.body1,
    textAlign: 'center',
    margin: SIZES.halfMargin / 2,
    textDecorationLine: 'underline',
  },
});
export default Help;
