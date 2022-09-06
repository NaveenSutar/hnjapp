import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  LineDivider,
  HorizontalCard,
  CustomActivityIndicator,
} from '../../components';
import { COLORS, SIZES, FONTS, SCREENS, IMAGES } from '../../constants';
import { userActions } from '../../store';

const YogaList = () => {
  const { yoga } = useSelector(state => state.user);
  const [yogaPlan, setYogaPlan] = useState(null);
  useEffect(() => {
    async function getYogaPlan() {
      const yogaDetails = await userActions.yogaPlan(yoga);
      setYogaPlan(yogaDetails);
    }
    getYogaPlan();
  }, [yoga]);

  /* get the desired yoga data from store */
  const navigation = useNavigation();

  function renderList() {
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Text style={styles.textStyle}>Mindful Yoga For Your Dosha</Text>
          <LineDivider lineStyle={styles.separatorStyle} />
          <View
            style={{
              flexDirection: 'row',
              width: SIZES.width * 0.75,
            }}>
            <Image
              source={IMAGES.opening_brace}
              style={styles.braceStyle}></Image>
            <Text style={styles.mistakesText}>
              {yogaPlan.howToPerformYoga[0]}
              {yogaPlan.howToPerformYoga[1]}
            </Text>
            <Image
              source={IMAGES.closing_brace}
              style={[styles.braceStyle, { marginTop: 12 }]}></Image>
          </View>
        </View>
        <FlatList
          ItemSeparatorComponent={() => (
            <LineDivider lineStyle={styles.separatorLineStyle} />
          )}
          data={yogaPlan.asanas}
          numColumns={2}
          key={'_'}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.yogaContainer}>
              <HorizontalCard
                containerStyle={styles.horizontalCardContainerStyle}
                title={item.name}
                description={false}
                onSelect={() =>
                  navigation.navigate(SCREENS.yoga_details, {
                    selectedAsanas: yogaPlan.asanas[index],
                  })
                }
              />
            </View>
          )}
        />
      </View>
    );
  }
  return yogaPlan ? (
    renderList()
  ) : (
    <CustomActivityIndicator screen={SCREENS.yoga_list} />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  headerContainerStyle: {
    height: 50,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.margin,
    alignItems: 'center',
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
  innerContainer: {
    width: SIZES.width * 0.9,
    marginTop: SIZES.height > 800 ? SIZES.margin : 0,
    marginBottom: SIZES.height > 800 ? SIZES.margin : 10,
    alignSelf: 'center',
  },
  horizontalCardContainerStyle: {
    backgroundColor: COLORS.transparentPrimary,
    width: SIZES.width * 0.4,
    marginHorizontal: 20,
    alignSelf: 'flex-start',
    height: SIZES.height * 0.2,
  },
  textStyle: {
    color: COLORS.grey,
    ...FONTS.h2,
    textAlign: 'center',
    margin: SIZES.halfMargin,
  },
  separatorLineStyle: {
    height: 20,
    backgroundColor: COLORS.gray1,
  },
  mistakesText: {
    marginTop: SIZES.margin,
    color: COLORS.font,
    paddingHorizontal: SIZES.halfPadding,
    ...FONTS.body3,
  },
  braceStyle: {
    width: SIZES.width * 0.09,
    height: 220,
    // width: SIZES.width * 0.12,
  },
  separatorStyle: {
    backgroundColor: COLORS.primary,
    height: 2,
    width: 160,
    alignSelf: 'center',
  },
  yogaContainer: { flex: 1, flexDirection: 'row' },
});

export default YogaList;
