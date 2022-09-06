import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  Linking,
} from 'react-native';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import { FlatGrid } from 'react-native-super-grid';
import { SIZES, IMAGES, FONTS, COLORS, SCREENS, ICONS } from '../../constants';
import { useSelector } from 'react-redux';
import {
  LineDivider,
  CustomActivityIndicator,
  IconButton,
} from '../../components';
import SelectableChips from 'react-native-chip/SelectableChips';
import { userActions } from '../../store';
import { CustomModal } from '../../components';

const PrakritiDashBoard = () => {
  const user = useSelector(state => state.user);
  const { id } = useSelector(state => state.auth);
  const [doshaData, setDoshaData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const barWidth = SIZES.width - 50;

  useEffect(() => {
    async function getUserPrakritiData() {
      const prakritiDetails = await userActions.doshaData(id);
      setDoshaData(prakritiDetails);
    }
    getUserPrakritiData();
  }, [id, setDoshaData]);

  function openCharakSamhitaLink() {
    Linking.openURL(
      'https://www.carakasamhitaonline.com/index.php?title=Ayurveda',
    );
  }

  function openBanyanBotanicalsLink() {
    Linking.openURL(
      'https://www.banyanbotanicals.com/info/ayurvedic-living/learning-ayurveda/intro-to-ayurveda/',
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

  function openHealthlineLink() {
    Linking.openURL(
      'https://www.healthline.com/nutrition/vata-dosha-pitta-dosha-kapha-dosha',
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
          <Text onPress={openNIHLink} style={styles.links}>
            1. National Library of Medicine. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openNHPLink}>
            2. National Health Portal. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openCharakSamhitaLink}>
            3. CHARAK SAMHITA. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openBanyanBotanicalsLink}>
            4. Banyan Botanicals - Ayurveda. <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openHealthlineLink}>
            5. Healthline - Ayurveda {'&'} Doshas.{' '}
            <Image source={ICONS.openLink} />
          </Text>
          <Text style={styles.links} onPress={openTermsOfServiceLink}>
            6. Terms Of Service - Health {'&'} Jiva.{' '}
            <Image source={ICONS.openLink} />
          </Text>
        </View>
      </CustomModal>
    );
  }

  function onLinkPress() {
    setIsModalVisible(true);
  }

  function renderDashBoard() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Your mind-body type is:</Text>
          <Text style={styles.dosha}>{doshaData.doshaName.toUpperCase()}</Text>
          <Image
            style={styles.headerImage}
            source={IMAGES[doshaData.doshaName]}
            resizeMode="contain"
          />
          <View style={styles.card}>
            <View style={{ margin: SIZES.halfMargin }}>
              <View style={styles.doshaContainer}>
                <Image
                  style={styles.doshaContainerImage}
                  source={IMAGES.vata}
                />

                <Text style={[styles.labelDosha, { color: COLORS.vata }]}>
                  Vata
                </Text>
                <Text style={styles.doshaTypeText}>
                  This type is full of energy and creativity.
                </Text>
              </View>
              <View style={{ marginLeft: SIZES.halfMargin }}>
                <ProgressBarAnimated
                  width={barWidth}
                  height={12}
                  value={user.vataPercentage}
                  backgroundColor={COLORS.vata}
                  useNativeDriver="false"
                />
              </View>
            </View>

            <View style={{ margin: SIZES.halfMargin }}>
              <View style={styles.doshaContainer}>
                <Image
                  style={styles.doshaContainerImage}
                  source={IMAGES.pitta}
                />
                <Text style={[styles.labelDosha, { color: COLORS.pitta }]}>
                  Pitta
                </Text>
                <Text style={styles.doshaTypeText}>
                  This type are sharp thinkers.
                </Text>
              </View>
              <View style={{ marginLeft: SIZES.halfMargin }}>
                <ProgressBarAnimated
                  height={12}
                  width={barWidth}
                  value={user.pittaPercentage}
                  backgroundColor={COLORS.pitta}
                  useNativeDriver="false"
                />
              </View>
            </View>
            <View style={{ margin: SIZES.halfMargin }}>
              <View style={styles.doshaContainer}>
                <Image
                  style={styles.doshaContainerImage}
                  source={IMAGES.kapha}
                />
                <Text style={[styles.labelDosha, { color: COLORS.kapha }]}>
                  Kapha
                </Text>
                <Text style={styles.doshaTypeText}>
                  This type is warm of heart and steady of mind.
                </Text>
              </View>
              <View style={{ marginLeft: SIZES.halfMargin }}>
                <ProgressBarAnimated
                  height={12}
                  width={barWidth}
                  value={user.kaphaPercentage}
                  backgroundColor={COLORS.kapha}
                  useNativeDriver="false"
                />
              </View>
            </View>
          </View>
          {/* {!user.diet ? renderGenerateDietPlanButton() : null} */}
          <View style={styles.doshaTable}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.doshaName}>Vata</Text>
              <View style={styles.verticalLine} />
              <Text style={[styles.labelDetailDosha]}>
                Air & Ether, Principle Of Movement & Communication
              </Text>
            </View>
            <LineDivider />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.doshaName}>Pitta</Text>
              <View style={styles.verticalLine} />

              <Text style={[styles.labelDetailDosha]}>
                Fire & Water, Principle Of Transformation & Digestion
              </Text>
            </View>
            <LineDivider />
            <View style={{ flexDirection: 'row' }}>
              <Text style={[styles.doshaName, { marginHorizontal: 4 }]}>
                Kapha
              </Text>
              <View style={styles.verticalLine} />

              <Text style={[styles.labelDetailDosha]}>
                Earth & Water, Principle Of Structure & Lubrication
              </Text>
            </View>
          </View>
          <Text style={styles.title}>About Your Dosha</Text>
          <View style={styles.underline} />
          <Text style={{ margin: SIZES.halfMargin, ...FONTS.body3 }}>
            {doshaData.doshaProperty.para1}
            {doshaData.doshaProperty.para2}
            {doshaData.doshaProperty.para3}
          </Text>
          <View style={{ marginHorizontal: 30 }}>
            <SelectableChips
              initialChips={Object.values(doshaData.doshaProperty.para4)}
              chipStyle={styles.propertyStyle}
              valueStyle={{
                ...FONTS.body3,
                color: COLORS.font,
              }}
            />
            {/* <IconLabel
              containerStyle={styles.propertyStyle}
              icon={ICONS.clock}
              label={'as'}
              labelStyle={{
                color: COLORS.white,
              }}
            /> */}
          </View>

          {/* <FlatGrid
            itemDimension={120}
            data={Object.values(data.doshaProperty.para4)}
            style={styles.property}
            spacing={15}
            renderItem={({item}) => <Text style={styles.chip}>{item}</Text>}
          /> */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>
              {doshaData.doshaName && doshaData.doshaName.toUpperCase()}{' '}
              Characteristics
            </Text>
          </View>
          <View style={styles.underline} />
          {/* changes to remove */}
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text
              onPress={onLinkPress}
              style={{
                ...FONTS.body1,
                alignSelf: 'center',
                textDecorationLine: 'underline',
              }}>
              References
              <IconButton
                icon={ICONS.link}
                iconStyle={{
                  tintColor: COLORS.primary,
                  height: 22,
                  width: 22,
                }}
              />
            </Text>
          </View>

          <FlatGrid
            itemDimension={100}
            data={doshaData.doshaCharacteristics}
            style={styles.gridView}
            spacing={10}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item.key}</Text>
                <Text style={styles.itemCode}>{item.value}</Text>
              </View>
            )}
          />
        </View>
      </ScrollView>
    );
  }
  return doshaData ? (
    <ScrollView>
      {renderDashBoard()}
      {renderRefrenceModal()}
    </ScrollView>
  ) : (
    <CustomActivityIndicator screen={SCREENS.prakriti_dashboard} />
  );
};
const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: COLORS.white,
  },
  container: {
    flex: 1,
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
  card: {
    width: SIZES.width,
    height: SIZES.height * 0.3,
    alignItems: 'flex-start',
  },
  title: {
    alignSelf: 'center',
    ...FONTS.subtitle,
    marginTop: SIZES.halfMargin / 2,
  },
  headerImage: {
    width: SIZES.width * 0.15,
    height: SIZES.height * 0.08,
    alignSelf: 'center',
  },
  gridView: {
    marginTop: SIZES.halfMargin,
    flex: 1,
  },
  doshaContainer: {
    flexDirection: 'row',
    margin: SIZES.halfMargin / 3,
  },
  doshaContainerImage: {
    width: 30,
    height: 30,
    margin: SIZES.halfMargin / 2,
  },
  doshaTypeText: {
    color: COLORS.font,
    ...FONTS.body3,
    margin: SIZES.halfMargin,
    marginLeft: SIZES.halfMargin,
  },
  itemContainer: {
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.halfPadding,
    height: SIZES.height * 0.15,
    backgroundColor: '#0B5345',
  },
  itemName: {
    ...FONTS.body1,
    color: COLORS.white,
    fontWeight: '600',
  },
  itemCode: {
    ...FONTS.body3,
    color: COLORS.white,
  },
  underline: {
    marginVertical: 5,
    borderWidth: 0.8,
    borderColor: COLORS.primary,
    width: '10%',
    alignSelf: 'center',
  },
  labelDosha: {
    color: '#2156C6',
    marginTop: SIZES.halfMargin,
    marginLeft: SIZES.halfMargin / 2,
    ...FONTS.subtitle,
  },
  heading: {
    color: '#180B54',
  },
  dosha: {
    alignSelf: 'center',
    ...FONTS.h3,
  },
  property: {
    flexDirection: 'row',
    width: 'auto',
    height: 'auto',
    flex: 1,
  },

  labelDetailDosha: {
    fontSize: 12,
    marginTop: SIZES.halfMargin,
    marginLeft: SIZES.halfMargin,
  },
  propertyStyle: {
    width: 'auto',
    height: 'auto',
    backgroundColor: '#D7EEE1',
    borderColor: '#D7EEE1',
    ...FONTS.body3,
  },
  doshaTable: {
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: 'auto',
    alignSelf: 'center',
    borderRadius: SIZES.radius,
    padding: SIZES.halfPadding,
  },
  verticalLine: {
    height: SIZES.height * 0.05,
    width: 2,
    backgroundColor: COLORS.lightGrey,
  },
  doshaName: {
    ...FONTS.body1,
    marginHorizontal: SIZES.margin,
    marginTop: SIZES.halfMargin / 2,
  },
  footerContainer: { height: 30, marginTop: 10 },

  linkModelHeading: {
    ...FONTS.h3,
    color: COLORS.grey,
  },
  links: {
    color: COLORS.primary,
    padding: SIZES.halfPadding,
    textDecorationLine: 'underline',
  },
  modalHedingUnderLine: {
    marginVertical: 0.5,
    borderWidth: 0.8,
    borderColor: COLORS.grey,
    width: '50%',
    alignSelf: 'center',
  },
  buttonContainer: {
    padding: SIZES.padding,
    marginHorizontal: SIZES.margin,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    shadowOpacity: 0.4,
    shadowColor: COLORS.black,
    marginBottom: SIZES.halfMargin * 6,
  },
  popupDietButton: {
    padding: SIZES.halfPadding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    width: SIZES.width * 0.73,
    marginBottom: SIZES.halfMargin,
  },
  dietModelText: {
    ...FONTS.body3,
    color: COLORS.font,
    padding: SIZES.padding,
  },
});

export default PrakritiDashBoard;
