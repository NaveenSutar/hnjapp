import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { userActions, tabActions } from '../../store';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { CustomActivityIndicator } from '../../components';
import { FONTS, COLORS, SIZES, IMAGES, ICONS, SCREENS } from '../../constants';
import Pie from 'react-native-pie';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from '@react-native-community/blur';

const Home = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector(state => state.user);

  const [dietNutrientsPercentage, setDietNutrientsPercentage] = useState({
    protein: 0,
    carbohydrate: 0,
    fat: 0,
    calories: 0,
  });

  useEffect(() => {
    async function getDietNutrients() {
      const nutrients = await userActions.dietNutrients(user.diet);

      const nutrientsPercentage = convertNutrientsToPercentage({
        protein: nutrients.protein,
        fat: nutrients.fat,
        carbohydrate: nutrients.carbohydrate,
      });
      setDietNutrientsPercentage({
        protein: nutrientsPercentage.proteinPercentage,
        carbohydrate: nutrientsPercentage.carbohydratePercentage,
        fat: nutrientsPercentage.fatPercentage,
        calories: nutrients.calories,
      });
    }
    if (user.diet && user.isDietActive) {
      getDietNutrients();
    }
  }, [user.diet, user.isDietActive]);

  useEffect(() => {
    dispatch(userActions.getSubscriptionId());
    dispatch(userActions.getYogaId());
    dispatch(userActions.getDietPlanId());
  }, [dispatch]);

  useEffect(() => {
    if (user.diet) {
      dispatch(userActions.activeDiet(user.diet));
    }
  }, [dispatch, user.diet]);

  function convertNutrientsToPercentage(nutrients) {
    const totalSum = Object.values(nutrients).reduce((a, b) => a + b);
    const proteinPercentage = +((nutrients.protein / totalSum) * 100).toFixed(
      0,
    );
    const fatPercentage = +((nutrients.fat / totalSum) * 100).toFixed(0);
    const carbohydratePercentage = +(
      (nutrients.carbohydrate / totalSum) *
      100
    ).toFixed(0);

    return { proteinPercentage, fatPercentage, carbohydratePercentage };
  }

  function isUserPrakritiCalculated() {
    return user.prakritiAnswers.length
      ? renderWellnessPlanScreen()
      : renderHomeScreen();
  }

  function renderHomeScreen() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.heading}>Dear {user.firstName}...!</Text>
          {/* <Text style={styles.body}>Lorem ipsum is simply dummy text.</Text> */}
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={IMAGES.home_3}
              style={{
                height: SIZES.height / 2.5,
                width: SIZES.width,
              }}
            />
          </View>

          <View
            style={{
              padding: SIZES.padding,
              borderRadius: SIZES.radius * 2,
              marginVertical: SIZES.margin,
              marginHorizontal: SIZES.margin,
              backgroundColor: COLORS.lightBlack,
              flex: 1,
              justifyContent: 'space-between',
            }}>
            <Text style={{ ...FONTS.subtitle, marginBottom: SIZES.halfMargin }}>
              Welcome,
            </Text>
            <Text style={{ ...FONTS.body2, marginBottom: SIZES.margin }}>
              Congratulations on taking your first to your personalised health
              and wellness plan by answering the following Prakriti Questions.
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.getStartedButtonContainer}
              onPress={() => {
                dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti));
              }}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>

          {/*  <Text style={styles.blogHead}>Popular Blogs</Text>

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={styles.scrollContainer}
            horizontal={true}>
            {[1, 2, 3, 4, 5].map(() => {
              return (
                <ImageBackground
                  source={IMAGES.back}
                  resizeMode="cover"
                  borderRadius={SIZES.radius}
                  style={styles.blogContainer}>
                  <View style={styles.blogContentContainer}>
                    <View style={styles.blogContentHeader}>
                      <Text style={styles.blogContentHeaderText}>
                        Covid Heroes
                      </Text>
                      <Text style={styles.blogContentHeaderText}>2 Mins</Text>
                    </View>
                    <Text style={styles.blogContentText} numberOfLines={2}>
                      Lorem ipsum is simply a dummy text of.
                    </Text>
                  </View>
                </ImageBackground>
              );
            })}

            <View style={{ marginRight: SIZES.margin }}></View>
          </ScrollView>

          <View
            style={[
              styles.thirdCard,
              styles.shadow,
              styles.subscribeContainer,
            ]}>
            <View style={styles.thirdCardContainer}>
              <Image
                source={IMAGES.star}
                height={SIZES.width / 12}
                width={SIZES.width / 12}
                style={[styles.thirdCardLeftImage]}
              />
              <View style={styles.thirdCardRightContainer}>
                <Text style={styles.thirdCardRightHeading}>Upto 70% off</Text>
                <Text style={styles.thirdCardRightBody}>
                  Be an early bird and get discounts on our subscription
                </Text>

                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.subButton}
                  onPress={() => {
                    navigation.navigate(SCREENS.subscription);
                  }}>
                  <Text
                    style={[
                      styles.thirdCardRightBody,
                      { color: COLORS.primary },
                    ]}>
                    Subscribe
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.getStartedContainer, styles.shadow]}>
            <Image source={ICONS.correct} style={styles.getStartedIcon} />

            <Text style={styles.getStartedText}>
              There are some set of questions we have, to better understand your
              body type
            </Text>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.getStartedButtonContainer}
              onPress={() => {
                dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti));
              }}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
 */}
          {/* 
          <View style={{ marginBottom: SIZES.margin }}></View> */}
        </View>
      </SafeAreaView>
    );
  }

  function renderWellnessPlanScreen() {
    return (
      <SafeAreaView>
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>Dear {user.firstName}...!</Text>
          <Text style={styles.body}>
            Depending on your body type we have following recommendations
          </Text>
          <View style={[styles.firstCard, styles.shadow]}>
            <View style={styles.firstLeftContainer}>
              <Image
                source={IMAGES.home_prakriti}
                style={styles.prakritiImage}
              />
            </View>

            <View style={styles.firstRightContainer}>
              <View style={styles.firstCardRightElements}>
                <View style={styles.firstCardBullet} />
                <View style={styles.firstCardBulletHeading}>
                  <Text style={styles.firstCardBulletText}>Vata</Text>
                  <View style={styles.firstCardBulletPie}>
                    <Pie
                      radius={15}
                      innerRadius={10}
                      sections={[
                        {
                          percentage: user.vataPercentage,
                          color: COLORS.vata,
                        },
                      ]}
                      backgroundColor="#ddd"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.firstCardRightElements}>
                <View style={styles.firstCardBullet} />
                <View style={styles.firstCardBulletHeading}>
                  <Text style={styles.firstCardBulletText}>Pitta</Text>
                  <View style={styles.firstCardBulletPie}>
                    <Pie
                      radius={15}
                      innerRadius={10}
                      sections={[
                        {
                          percentage: user.pittaPercentage,
                          color: COLORS.pitta,
                        },
                      ]}
                      backgroundColor="#ddd"
                    />
                  </View>
                </View>
              </View>

              <View style={styles.firstCardRightElements}>
                <View style={styles.firstCardBullet} />
                <View style={styles.firstCardBulletHeading}>
                  <Text style={styles.firstCardBulletText}>Kapha</Text>
                  <View style={styles.firstCardBulletPie}>
                    <Pie
                      radius={15}
                      innerRadius={10}
                      sections={[
                        {
                          percentage: user.kaphaPercentage,
                          color: COLORS.kapha,
                        },
                      ]}
                      backgroundColor="#ddd"
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.heading}>Your Food Inclusions</Text>
          <Text style={styles.body}>
            Lorem ipsum is simply dummy text of the printing
          </Text>
          <View style={styles.secondCardContainer}>
            <View style={[styles.secOne, styles.shadow]}>
              {!user.diet && !user.isDietActive && (
                <Text
                  style={{
                    zIndex: 11,
                    position: 'absolute',
                    textAlign: 'center',
                    marginHorizontal: SIZES.halfMargin,
                    marginTop: SIZES.margin * 2,
                    ...FONTS.body2,
                  }}>
                  Please generate diet plan to get nutrients
                </Text>
              )}
              {!user.diet && !user.isDietActive && (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => {
                    dispatch(tabActions.setSelectedTab(SCREENS.diet));
                  }}
                  style={[
                    {
                      zIndex: 11,
                      position: 'absolute',
                      alignSelf: 'center',
                      // left: SIZES.width / 5,
                      marginHorizontal: SIZES.margin * 3,
                      borderColor: COLORS.primary,
                      borderWidth: 1,
                      padding: SIZES.halfPadding / 2,
                      borderRadius: SIZES.radius,
                      alignItems: 'center',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.fourthCardButtonText,
                      { color: COLORS.primary },
                    ]}>
                    Generate Diet plan
                  </Text>
                </TouchableOpacity>
              )}
              {!user.diet && !user.isDietActive && (
                <BlurView
                  style={styles.blurStyle}
                  blurType="light"
                  blurAmount={10}
                  reducedTransparencyFallbackColor="white"
                />
              )}

              <View style={styles.secondCardLeftContainer}>
                <Pie
                  radius={70}
                  innerRadius={50}
                  sections={[
                    {
                      percentage:
                        dietNutrientsPercentage.protein > 0
                          ? dietNutrientsPercentage.protein
                          : 50,

                      color: '#45AFFA',
                    },
                    {
                      percentage:
                        dietNutrientsPercentage.protein > 0
                          ? dietNutrientsPercentage.protein
                          : 20,

                      color: '#FBEB41',
                    },
                    {
                      percentage:
                        dietNutrientsPercentage.protein > 0
                          ? dietNutrientsPercentage.protein
                          : 30,

                      color: '#FF8650',
                    },
                  ]}
                  dividerSize={0}
                  strokeCap={'round'}
                />
              </View>
              <View style={styles.secondCardRightBulletsContainer}>
                <View style={styles.secondCardbulletElementContainer}>
                  <View
                    style={{
                      ...styles.secondCardBullet,
                      backgroundColor: '#45AFFA',
                    }}
                  />
                  <View style={styles.secondCardVitalsContainer}>
                    <Text style={styles.secondCardVitalNum}>
                      {dietNutrientsPercentage.protein} %
                    </Text>
                    <Text style={styles.secondCardVitalUnit}>Protein</Text>
                  </View>
                </View>
                <View style={styles.secondCardbulletElementContainer}>
                  <View
                    style={{
                      ...styles.secondCardBullet,
                      backgroundColor: '#FBEB41',
                    }}
                  />
                  <View style={styles.secondCardVitalsContainer}>
                    <Text style={styles.secondCardVitalNum}>
                      {' '}
                      {dietNutrientsPercentage.fat} %
                    </Text>
                    <Text style={styles.secondCardVitalUnit}>Fat</Text>
                  </View>
                </View>

                <View style={styles.secondCardbulletElementContainer}>
                  <View
                    style={{
                      ...styles.secondCardBullet,
                      backgroundColor: '#FF8650',
                    }}
                  />
                  <View style={styles.secondCardVitalsContainer}>
                    <Text style={styles.secondCardVitalNum}>
                      {' '}
                      {dietNutrientsPercentage.carbohydrate} %
                    </Text>
                    <Text style={styles.secondCardVitalUnit}>Carbs</Text>
                  </View>
                </View>
              </View>
            </View>

            <View
              style={{
                flex: 4,
              }}>
              <View style={[styles.secTwo, styles.shadow]}>
                {!user.diet && !user.isDietActive && (
                  <BlurView
                    style={styles.blurStyle}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                  />
                )}

                <Text style={styles.secTwoVitalHeader}>Calorie</Text>
                <Text style={styles.secTwoVitalNum}>
                  {dietNutrientsPercentage.calories}
                </Text>
                <Text style={styles.secTwoVitalUnit}>Kcal</Text>
              </View>
              <View style={[styles.secThree, styles.shadow]}>
                {!user.diet && !user.isDietActive && (
                  <BlurView
                    style={styles.blurStyle}
                    blurType="light"
                    blurAmount={10}
                    reducedTransparencyFallbackColor="white"
                  />
                )}

                <Text style={styles.secTwoVitalHeader}>Water</Text>
                <Text style={styles.secTwoVitalNum}>8</Text>
                <Text style={styles.secTwoVitalUnit}>Glasses</Text>
              </View>
            </View>
          </View>
          <View style={[styles.thirdCard, styles.shadow]}>
            <View style={styles.thirdCardContainer}>
              <Image
                source={IMAGES.badge_home}
                style={[styles.thirdCardLeftImage, { resizeMode: 'contain' }]}
              />
              <View style={styles.thirdCardRightContainer}>
                <Text style={styles.thirdCardRightHeading}>
                  Personalised tip for the day
                </Text>
                <Text style={styles.thirdCardRightBody}>
                  Drink 8 glasses of water today. Keep your kidney healthy.
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.forthCard, styles.shadow]}>
            <View style={styles.thirdCardContainer}>
              <Image
                source={IMAGES.yoga_home}
                style={styles.thirdCardLeftImage}
              />
              <View
                style={[styles.thirdCardRightContainer, { marginVertical: 0 }]}>
                <Text style={styles.thirdCardRightHeading}>
                  Today's Excercises
                </Text>
                <Text style={styles.thirdCardRightBody}>
                  Get started with our recommended exercise
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.fourthCardButtonContainer}
                  onPress={() => {
                    dispatch(tabActions.setSelectedTab(SCREENS.yoga));
                  }}>
                  <Text style={styles.fourthCardButtonText}>Get Started</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: SIZES.margin }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      {user.prakritiAnswers ? (
        isUserPrakritiCalculated()
      ) : (
        <CustomActivityIndicator screen={SCREENS.home} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: SIZES.padding,
  },

  heading: {
    ...FONTS.subtitle,
    color: 'grey',
    paddingHorizontal: SIZES.padding,
  },

  body: {
    ...FONTS.body2,
    color: 'grey',
    paddingHorizontal: SIZES.padding,
  },

  firstCard: {
    flexDirection: 'row',
    margin: SIZES.margin,
    borderRadius: SIZES.radius,
    // height: SIZES.height / 4,
    backgroundColor: '#fff',
    padding: SIZES.halfPadding,
  },

  firstLeftContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: SIZES.margin,
  },

  prakritiImage: {
    width: SIZES.width / 2,
    height: SIZES.width / 1.7,
    // marginVertical: SIZES.halfMargin,
  },

  firstRightContainer: {
    flex: 1,
  },

  firstCardRightElements: {
    flex: 1,
    flexDirection: 'row',
    margin: SIZES.halfMargin / 3,
  },

  firstCardBullet: {
    backgroundColor: COLORS.primary,
    flex: 1,
    borderRadius: SIZES.radius,
  },

  firstCardBulletHeading: {
    backgroundColor: 'white',
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  firstCardBulletText: {
    flex: 1,
    ...FONTS.body1,
    marginTop: SIZES.halfMargin,
  },

  firstCardBulletPie: {
    height: 30,
    width: 30,
    borderRadius: 100,
    margin: 2.5,
    marginBottom: SIZES.halfMargin,
  },

  secondCardContainer: {
    marginTop: SIZES.margin,
    flexDirection: 'row',
    height: SIZES.height / 4,
    marginHorizontal: SIZES.margin,
  },

  secOne: {
    flex: 10,
    borderRadius: SIZES.radius,
    backgroundColor: '#fff',
    marginEnd: SIZES.halfMargin,
    flexDirection: 'row',
    padding: SIZES.padding,
  },

  secondCardLeftContainer: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginEnd: SIZES.margin,
  },

  secondCardBigPie: {
    width: 140,
    height: 140,
    backgroundColor: 'tomato',
    borderRadius: 200,
  },

  secondCardRightBulletsContainer: {
    flex: 1,
    justifyContent: 'center',
  },

  secondCardbulletElementContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: SIZES.halfMargin / 5,
  },

  secondCardBullet: {
    backgroundColor: COLORS.primary,
    height: SIZES.width / 25,
    width: SIZES.width / 25,
    borderRadius: 4,
    marginEnd: 5,
  },

  secondCardVitalsContainer: {
    backgroundColor: 'white',
    flex: 15,
  },

  secondCardVitalNum: {
    flex: 1,
    ...FONTS.body1,
  },

  secondCardVitalUnit: {
    flex: 1,
    ...FONTS.body2,
  },

  secTwo: {
    flex: 1,
    borderRadius: SIZES.radius,
    marginStart: SIZES.halfMargin,
    marginBottom: SIZES.halfMargin,
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.halfPadding,
  },

  secTwoVitalHeader: {
    ...FONTS.body1,
  },

  secTwoVitalNum: {
    ...FONTS.h2,
    color: COLORS.primary,
  },

  secTwoVitalUnit: {
    ...FONTS.body1,
    color: 'grey',
  },

  secThree: {
    backgroundColor: '#fff',
    flex: 1,
    borderRadius: SIZES.radius,
    marginStart: SIZES.halfMargin,
    marginTop: SIZES.halfMargin,
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SIZES.halfPadding,
  },

  thirdCard: {
    marginTop: SIZES.margin,
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    marginHorizontal: SIZES.margin,
  },

  thirdCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  thirdCardLeftImage: {
    flex: 3,
    marginEnd: SIZES.margin,
  },

  thirdCardRightContainer: {
    flex: 9,
  },

  thirdCardRightHeading: {
    ...FONTS.body1,
    paddingBottom: SIZES.halfPadding,
  },

  thirdCardRightBody: {
    ...FONTS.body2,
    color: 'grey',
  },

  forthCard: {
    marginTop: SIZES.margin,
    backgroundColor: COLORS.transparentPrimary,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
    justifyContent: 'center',
    marginHorizontal: SIZES.margin,
  },

  fourthCardButtonContainer: {
    borderRadius: SIZES.radius,
    backgroundColor: '#fff',
    flex: 1,
    marginTop: 5,
    width: 100,
  },

  fourthCardButtonText: {
    ...FONTS.body1,
    textAlign: 'center',
    padding: 5,
  },

  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },

  blogHead: {
    ...FONTS.body1,
    color: COLORS.font,
    marginBottom: SIZES.halfMargin,
    marginTop: SIZES.margin,
    paddingHorizontal: SIZES.padding,
  },

  scrollContainer: {
    paddingHorizontal: SIZES.margin,
    width: SIZES.width,
    marginEnd: SIZES.margin,
  },

  blogContentContainer: {
    backgroundColor: '#ffffffe6',
    width: '100%',
    height: SIZES.width / 5,
    borderRadius: SIZES.radius,
    padding: SIZES.halfPadding,
  },

  blogContentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  blogContentHeaderText: {
    ...FONTS.body2,
  },

  blogContentText: {
    ...FONTS.body1,
    marginTop: SIZES.halfMargin / 2,
  },

  blogContainer: {
    height: SIZES.width / 2,
    width: SIZES.width / 2,
    borderRadius: SIZES.radius,
    marginEnd: SIZES.margin,
    padding: SIZES.halfPadding / 2,
    justifyContent: 'flex-end',
  },

  subscribeContainer: {
    paddingVertical: SIZES.halfPadding,
    paddingHorizontal: SIZES.halfPadding,
    marginHorizontal: SIZES.margin,
  },

  subButton: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    padding: SIZES.halfPadding / 4,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    width: SIZES.width / 4,
    alignSelf: 'flex-end',
  },

  getStartedContainer: {
    backgroundColor: COLORS.primary,
    margin: SIZES.margin,
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },

  getStartedIcon: {
    tintColor: COLORS.white,
    height: SIZES.width / 15,
    width: SIZES.width / 15,
  },

  getStartedText: {
    ...FONTS.body1,
    color: COLORS.white,
    marginVertical: SIZES.margin,
  },

  getStartedButtonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },

  getStartedButtonText: {
    ...FONTS.body1,
    color: COLORS.white,
    marginVertical: SIZES.halfMargin,
  },

  prakritiContainer: {
    backgroundColor: COLORS.primary,
  },

  paragraphContainerStyle: {
    borderRadius: SIZES.radius,
    backgroundColor: '#FBECB9',
    padding: SIZES.padding,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
  },
  startText: {
    color: COLORS.black,
    ...FONTS.body2,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },
  startButton: {
    backgroundColor: COLORS.primary,
    height: 40,
    width: 150,
    borderRadius: 20,
    marginTop: SIZES.margin,
    justifyContent: 'center',
  },
  startButtonText: {
    alignSelf: 'center',
    color: COLORS.white,
    ...FONTS.body1,
  },
  bgImage: {
    padding: SIZES.padding,
    shadowColor: '#E8D9DC',
  },
  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orangeImage: {
    height: 90,
    width: 90,
    marginEnd: SIZES.margin,
    margin: -SIZES.halfMargin,
  },
  profileCard: {
    backgroundColor: '#D4EAC7',
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin,
    padding: SIZES.padding,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
  },
  profileLabelText: {
    color: COLORS.black,
    ...FONTS.body1,
  },
  profileText: {
    ...FONTS.body2,
  },
  editButton: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonText: {
    color: COLORS.primary,
    ...FONTS.body1,
    paddingHorizontal: SIZES.padding * 2,
    paddingVertical: SIZES.halfPadding / 2,
  },
  quoteText: {
    color: COLORS.black,
    ...FONTS.body1,
    flex: 1,
    flexWrap: 'wrap',
  },
  blurStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    borderRadius: SIZES.radius,
  },
});

export default Home;
