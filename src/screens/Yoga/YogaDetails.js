import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, ICONS, FONTS, IMAGES } from '../../constants';
import { Header, IconButton, LineDivider } from '../../components';

const YogaDetails = ({ route }) => {
  const { selectedAsanas } = route.params;
  const navigation = useNavigation();
  function renderHeader() {
    return (
      <Header
        title="Details"
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

  function renderDetails() {
    return (
      <View style={styles.detailsContainer}>
        <View style={styles.imageCardContainer}>
          <Image
            source={{ uri: selectedAsanas.image[0] }}
            resizeMode="contain"
            style={styles.yogaImage}
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={{ ...FONTS.body1 }}>{selectedAsanas.description}</Text>
        </View>
      </View>
    );
  }
  function renderSteps() {
    return (
      <View style={styles.stepsContainer}>
        <Text style={styles.stepButton}>Let's Get Started</Text>
        {/* Yoga Details */}

        {selectedAsanas.steps.map((item, index) => {
          return (
            <View key={`${index.toString()}`} style={styles.stepsItem}>
              <LineDivider></LineDivider>
              <Text style={styles.stepText}>
                Step {index + 1}:{' '}
                <Text
                  style={{
                    color: COLORS.font,
                    ...FONTS.body4,
                  }}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </Text>
              <LineDivider />
            </View>
          );
        })}
      </View>
    );
  }

  function renderFooter() {
    return <View style={styles.footerContainer} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {renderHeader()}

      {/* Food Details*/}
      <ScrollView>
        {renderDetails()}
        {renderSteps()}
      </ScrollView>

      {renderFooter()}
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
  detailsContainer: {
    marginTop: SIZES.radius,
    marginBottom: SIZES.margin,
    paddingHorizontal: SIZES.padding,
  },
  imageCardContainer: {
    height: 190,
    borderRadius: SIZES.radius,
    backgroundColor: '#F5F5F8',
    alignItems: 'center',
  },
  stepsContainer: {
    paddingHorizontal: SIZES.halfPadding,
    justifyContent: 'center',
  },
  stepButton: {
    color: COLORS.primary,
    ...FONTS.h2,
    alignSelf: 'center',
  },
  stepsItem: {
    flex: 1,
    marginLeft: SIZES.halfMargin,
    justifyContent: 'center',
  },
  descriptionContainer: {
    marginTop: SIZES.margin,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowColor: COLORS.transparentPrimary,
    shadowOpacity: 3,
    elevation: 5,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    backgroundColor: '#D4EAC7',
  },
  stepText: {
    color: '#679279',
    ...FONTS.body4,
    fontWeight: 'bold',
    margin: SIZES.halfMargin / 2,
  },
  yogaImage: {
    width: SIZES.width * 0.5,
    height: '100%',
  },
  footerContainer: {
    height: 30,
  },
});

export default YogaDetails;
