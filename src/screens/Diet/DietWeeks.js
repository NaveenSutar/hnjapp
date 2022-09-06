import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  Linking,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  HorizontalCard,
  LineDivider,
  CustomActivityIndicator,
  IconButton,
  CustomModal,
} from '../../components';
import { FONTS, SCREENS, COLORS, SIZES, IMAGES, ICONS } from '../../constants';
import { userActions } from '../../store';
import { useSelector } from 'react-redux';
import { utils } from '../../utils';

const DietWeeks = () => {
  const { diet } = useSelector(state => state.user);
  const [weekWiseSubscription, setWeekWiseSubscription] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    let weeks;
    async function getWeeksForSubscription() {
      weeks = await userActions.subscriptionWeeks(diet);
      setWeekWiseSubscription(weeks);
    }
    getWeeksForSubscription();
  }, [diet]);

  const navigation = useNavigation();

  const weeksBackgroundColor = ['#F5D6CE', '#D4EAC7', '#D8E3F4', '#DAD5C9'];

  function navigateToWeeklyPlan(startDate, endDate) {
    navigation.navigate(SCREENS.daily_dishes, { startDate, endDate });
  }

  function onLinkPress() {
    setIsModalVisible(true);
  }

  function openBanyanBotanicalsLink() {
    Linking.openURL(
      'https://www.banyanbotanicals.com/info/ayurvedic-living/living-ayurveda/diet/ayurvedic-diet-intro/',
    );
  }
  function openHealthlineLink() {
    Linking.openURL('https://www.healthline.com/nutrition/ayurvedic-diet');
  }
  function openGoopLink() {
    Linking.openURL(
      'https://goop.com/food/recipes/ayurveda-how-to-eat-for-your-dosha/',
    );
  }
  function openNIHLink() {
    Linking.openURL('https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3611641/');
  }

  function openNHPLink() {
    Linking.openURL(
      'https://www.nhp.gov.in/PRAKRITI(Psycho-somatic-constitution)_mtl',
    );
  }

  function openTermsOfServiceLink() {
    Linking.openURL('https://healthandjiva.com/terms-of-service/');
  }

  function renderRefrenceModal() {
    return (
      <CustomModal
        showModal={isModalVisible}
        onPress={value => setIsModalVisible(value)}
        containerStyle={styles.modalContainer}>
        <View style={{ alignItems: 'center', padding: SIZES.padding }}>
          <Text style={styles.linkModelHeading}>
            Health Assesment Refrences
          </Text>
        </View>
        <View style={styles.modalHedingUnderLine} />
        <View style={{ padding: SIZES.halfPadding }}>
          <Text style={styles.links} onPress={openHealthlineLink}>
            1. Healthline - Ayurveda Diet. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openGoopLink}>
            2. Goop - Eat For Your Dosha . <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openBanyanBotanicalsLink}>
            3. Banyan Botanicals. <Image source={ICONS.openLink} />
          </Text>
          <Text onPress={openNIHLink} style={styles.links}>
            4. National Library of Medicine. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openNHPLink}>
            5. National Health Portal. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openTermsOfServiceLink}>
            6. Terms Of Service - Health {'&'} Jiva.{' '}
            <Image source={ICONS.openLink} />
          </Text>
        </View>
      </CustomModal>
    );
  }

  function renderWeeksCard() {
    return (
      <View>
        <View style={styles.mainContainer}>
          <View style={styles.header}>
            <Text style={styles.textStyle}>Weekly Diet Chart</Text>
            <Image
              source={IMAGES.diet_header_1}
              resizeMode="contain"
              style={styles.dietImage}
            />
          </View>
        </View>
        {/* code need to remove */}
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onLinkPress}>
          <Text
            style={{
              ...FONTS.body1,
              textDecorationLine: 'underline',
              padding: SIZES.halfPadding,
            }}>
            References
          </Text>
          <IconButton
            icon={ICONS.link}
            iconStyle={{
              tintColor: COLORS.primary,
              height: 22,
              width: 22,
            }}
          />
        </Pressable>
        <FlatList
          ItemSeparatorComponent={() => (
            <LineDivider lineStyle={styles.separatorLineStyle} />
          )}
          data={weekWiseSubscription}
          numColumns={2}
          key={'_'}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <HorizontalCard
                containerStyle={{
                  ...styles.horizontalCardContainerStyle,
                  backgroundColor: weeksBackgroundColor[index],
                }}
                startDate={item.startDate}
                endDate={item.endDate}
                title={item.tag}
                onSelect={(startDate, endDate) =>
                  navigateToWeeklyPlan(startDate, endDate)
                }
              />
            </View>
          )}
        />
      </View>
    );
  }
  return weekWiseSubscription.length ? (
    <View>
      {renderWeeksCard()}
      {renderRefrenceModal()}
    </View>
  ) : (
    <CustomActivityIndicator screen={SCREENS.diet_weeks} />
  );
};

const styles = StyleSheet.create({
  horizontalCardContainerStyle: {
    width: SIZES.width * 0.4,
    marginHorizontal: SIZES.margin,
    alignSelf: 'flex-start',
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: COLORS.white,
    ...FONTS.h1,
    padding: SIZES.halfPadding,
  },
  separatorLineStyle: {
    height: 20,
    backgroundColor: COLORS.gray1,
  },
  header: {
    height: 60,
    width: utils.SCREEN_WIDTH * 0.84,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#679279',
    marginTop: SIZES.height > 800 ? SIZES.margin * 2 : 30,
    marginBottom: SIZES.height > 800 ? SIZES.margin * 2 : 40,
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: utils.SCREEN_WIDTH * 0.05,
  },
  dietImage: {
    width: SIZES.width * 0.4,
    aspectRatio: 1,
  },
  weekIcon: {
    width: 50,
    height: 50,
  },
  bgImage: {
    // width: '80%',
    // height: '80%',
    // opacity: 0.8,
  },
  linkModelHeading: {
    ...FONTS.h3,
    color: COLORS.grey,
  },
  links: {
    color: COLORS.primary,
    padding: SIZES.padding * 0.2,
    textDecorationLine: 'underline',
  },
  modalHedingUnderLine: {
    borderWidth: 0.8,
    borderColor: COLORS.grey,
    width: '50%',
    alignSelf: 'center',
  },
});

export default DietWeeks;
