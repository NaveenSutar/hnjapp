import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { COLORS, SCREENS, SIZES, FONTS, GIFS } from '../constants';
import { tabActions } from '../store';
import { TextButton } from '../components';

const AnalysePrakriti = () => {
  const dispatch = useDispatch();
  return (
    <View style={styles.analysePrakritiContainer}>
      <Image
        style={styles.analysePrakritiScreenImage}
        source={GIFS.fill_prakriti_screen}
      />
      <Text style={styles.prakritiAnalysisTextBold}>
        Prakriti Analysis enables to analyze our body constitution and
        understand our inner self.
      </Text>
      <Text style={styles.prakritiAnalysisTextBody}>
        To attain calmness of mind with yoga, start now.
      </Text>
      {/* <TextButton
        buttonContainerStyle={styles.analysePrakritiButton}
        label="Analyse Prakriti"
        labelStyle={{
          color: COLORS.white,
          ...FONTS.h3,
        }}
        onPress={() => {
          dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti));
        }}
      /> */}
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti));
        }}
        style={styles.buttonContainerStyle}>
        <Text style={styles.textStyle}>Analyse Prakriti</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  analysePrakritiContainer: {
    marginTop: SIZES.margin * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainerStyle: {
    width: SIZES.width / 1.5,
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    marginTop: SIZES.margin,
  },
  textStyle: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
  prakritiAnalysisTextBold: {
    paddingHorizontal: SIZES.padding * 1.5,
    marginVertical: SIZES.halfMargin,
    ...FONTS.subtitle,
  },
  prakritiAnalysisTextBody: {
    paddingHorizontal: SIZES.padding * 0.5,
    paddingBottom: 5,
    ...FONTS.body2,
  },
  analysePrakritiScreenImage: {
    height: SIZES.height * 0.25,
    width: SIZES.height * 0.25,
  },
});

export default AnalysePrakriti;
