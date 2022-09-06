import React from 'react';
import Share from 'react-native-share';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import { FONTS, COLORS, SIZES, ICONS, IMAGES } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { Header, IconButton } from '../components';
const Refer = () => {
  const navigation = useNavigation();
  const url = 'https://healthandjiva.com/';
  const title = 'Health & Jiva Wellness App';
  const message =
    'Download Health & Jiva to get access to your Personalised Health Plan based on Ayurveda.';

  const options = {
    title,
    url,
    message,
  };
  const copyToClipboard = () => {
    Clipboard.setString(url);
  };
  const shareApp = async (customOptions = options) => {
    try {
      await Share.open(customOptions);
    } catch (err) {
      console.error(err);
    }
  };

  function renderHeader() {
    return (
      <Header
        title={'Invite Friend'}
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
        <View style={styles.innerContainer}>
          <Text style={styles.heading}>
            Share Health & Jiva App with your folks and help them get
            personalised Health plan and achieve wholesome wellbeing.
          </Text>
          <View style={styles.copyContainer}>
            <Text style={styles.heading}>{url}</Text>
            <TouchableOpacity onPress={copyToClipboard}>
              <Image source={ICONS.copy} style={styles.copyImage} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.shareButton}
            onPress={async () => {
              await shareApp();
            }}>
            <Text style={styles.shareText}>SHARE</Text>
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
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  boxContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    borderWidth: 1,
    borderColor: COLORS.transparentPrimary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginBottom: SIZES.margin,
    width: SIZES.width * 0.9,
    backgroundColor: COLORS.transparentPrimary,
    shadowColor: COLORS.transparentPrimary,
    shadowOpacity: 3,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 5,
  },
  heading: {
    ...FONTS.body1,
  },
  shareButton: {
    backgroundColor: COLORS.primary,
    width: SIZES.width * 0.35,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
    margin: SIZES.margin,
    height: SIZES.height * 0.05,
    justifyContent: 'center',
  },
  shareText: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  copyImage: {
    width: SIZES.width * 0.08,
    height: SIZES.height * 0.04,
  },
  copyContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.halfPadding,
    borderRadius: SIZES.radius,
    margin: SIZES.margin,
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
});
export default Refer;
