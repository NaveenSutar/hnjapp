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
} from 'react-native';
import {
  IconLabel,
  LineDivider,
  CustomActivityIndicator,
} from '../../components';
import { FONTS, COLORS, SIZES, IMAGES, ICONS, SCREENS } from '../../constants';
import PieChart from 'react-native-pie-chart';
import { useNavigation } from '@react-navigation/native';
import { utils } from '../../utils';

const Home = props => {
  const user = useSelector(state => state.user);
  const [todayMeal, setTodayMeal] = useState(null);
  const navigation = useNavigation();
  const widthAndHeight = SIZES.height / 10;
  const series = [0, 50];
  const sliceColor = ['#f0f8ec', '#aed796'];
  const dispatch = useDispatch();
  /* */
  useEffect(() => {
    async function getTodayMeal() {
      const todayMealsData = await userActions.todayMeal(user.diet);
      setTodayMeal(todayMealsData);
    }
    if (user.diet) {
      getTodayMeal();
    }
  }, [user.diet]);

  useEffect(() => {
    dispatch(userActions.getSubscriptionId());
    dispatch(userActions.getYogaId());
    dispatch(userActions.getDietPlanId());
  }, [dispatch]);

  function isUserPrakritiCalculated() {
    return user.prakritiAnswers.length
      ? renderWellnessPlanScreen()
      : renderHomeScreen();
  }

  function editProfileNavigation() {
    if (user.firstName.length > 0 && !user.prakritiAnswers.length) {
      dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti));
    } else {
      navigation.navigate(SCREENS.account_edit);
    }
  }

  function editProfileText() {
    if (user.firstName === '' && !user.prakritiAnswers.length) {
      return '0';
    } else if (user.firstName.length > 0 || user.prakritiAnswers.length) {
      return '50';
    } else {
      return '100';
    }
  }

  function pieChartPercentage() {
    if (user.firstName === '' && !user.prakritiAnswers.length) {
      return [0];
    } else if (user.firstName.length > 0 || user.prakritiAnswers.length) {
      return [50, 50];
    } else {
      return [0, 100];
    }
  }

  function onBreakfastPress() {
    if (todayMeal) {
      if (todayMeal.breakfast) {
        const dishId = todayMeal.breakfast;
        navigation.navigate(SCREENS.dish_details, { dishId });
      } else {
        utils.successMsg(
          `Today you can have you preffered meal: ${todayMeal.preferredDishes.breakfast}`,
        );
      }
    } else {
      utils.successMsg('Please generate your diet plan.');
    }
  }

  function onLunchPress() {
    if (todayMeal) {
      if (todayMeal.lunch) {
        const dishId = todayMeal.lunch;
        navigation.navigate(SCREENS.dish_details, { dishId });
      } else {
        utils.successMsg(
          `Today you can have you preffered meal: ${todayMeal.preferredDishes.lunch}`,
        );
      }
    } else {
      utils.successMsg('Please generate your diet plan.');
    }
  }

  function onDinnerPress() {
    if (todayMeal) {
      if (todayMeal.dinner) {
        const dishId = todayMeal.dinner;
        navigation.navigate(SCREENS.dish_details, { dishId });
      } else {
        utils.successMsg(
          `Today you can have you preffered meal: ${todayMeal.preferredDishes.dinner}`,
        );
      }
    } else {
      utils.successMsg('Please generate your diet plan.');
    }
  }

  function renderHomeScreen() {
    const B = props => (
      <Text style={{ fontWeight: 'bold', color: COLORS.primary }}>
        {props.children}
      </Text>
    );
    return (
      <View style={{ padding: SIZES.padding }}>
        <View style={styles.paragraphContainerStyle}>
          <Text style={styles.startText}>
            Hi {user.firstName} {'\n'}
            {'\n'}
            Ready to get your personalised wellness plan? You are just a step
            away from availing it!{'\n'}
            {'\n'}
            Each body type is different and every lifestyle is unique, making it
            healthy is a choice. Health & Jiva curate a healthy lifestyle and
            mindful yoga plan for your unique self after understanding your
            Dosha(functional Energies in Body), and body type with Prakriti(Body
            Constitution) analysis.{'\n'}
            {'\n'}
            To begin with is a simple assessment that helps us understand your
            Prakriti better.
          </Text>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => {
              dispatch(tabActions.setSelectedTab(SCREENS.my_prakriti));
            }}>
            {/* <ImageBackground
              imageStyle={{borderRadius: 20, opacity: 0.8}}
              source={IMAGES.start_background}
              style={styles.startImg}
              resizeMode="cover"> */}
            <Text style={styles.startButtonText}>Get Started {'>>'}</Text>
            {/* </ImageBackground> */}
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: SIZES.margin,
            backgroundColor: COLORS.white,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowColor: COLORS.grey,
            shadowOpacity: 0.5,
            borderRadius: 10,
          }}>
          <ImageBackground
            imageStyle={{ borderRadius: 10, opacity: 0.4 }}
            source={IMAGES.start_background}
            resizeMode="cover"
            style={styles.bgImage}>
            <View style={styles.quoteCard}>
              <Image source={IMAGES.orange} style={styles.orangeImage} />

              <Text style={styles.quoteText}>
                Creating a Healthy mindset is an investment in your overall
                wellbeing
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.profileCard}>
          <Text style={styles.profileLabelText}>Profile Overview</Text>
          <LineDivider
            lineStyle={{ height: 1, marginVertical: SIZES.halfMargin }}
          />
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <View
              style={{
                flexDirection: 'column',
                flex: 5,
                alignItems: 'flex-start',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.profileText}>
                {`Your Profile is ${editProfileText()}% Complete. Edit Profile to Complete Now.`}
              </Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={editProfileNavigation}>
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>

            <PieChart
              style={{
                marginLeft: SIZES.margin,
                flex: 2,
                marginTop: SIZES.halfMargin,
              }}
              widthAndHeight={widthAndHeight}
              series={pieChartPercentage()}
              sliceColor={sliceColor}
              doughnut={true}
              coverRadius={0.8}
              coverFill={'#D4EAC7'}
            />
          </View>
        </View>
      </View>
    );
  }

  function renderWellnessPlanScreen() {
    return (
      <View style={{ padding: SIZES.padding }}>
        <Text style={styles.labelText}>Your Wellness Plan!!</Text>

        <View style={styles.horizontalCardContainerStyle}>
          <View>
            <Text style={styles.mealText}>Breakfast</Text>
            <TouchableOpacity
              onPress={onBreakfastPress}
              style={{
                ...styles.cardInnerContainer,
                backgroundColor: '#F5D6CE',
              }}>
              <Image source={IMAGES.home_breakfast} style={styles.tagImage} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.mealText}>Lunch</Text>
            <TouchableOpacity
              onPress={onLunchPress}
              style={{
                ...styles.cardInnerContainer,
                backgroundColor: '#D4EAC7',
              }}>
              <Image source={IMAGES.home_lunch} style={styles.tagImage} />
            </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.mealText}>Dinner</Text>
            <TouchableOpacity
              onPress={onDinnerPress}
              style={{
                ...styles.cardInnerContainer,
                backgroundColor: '#D8E3F4',
              }}>
              <Image source={IMAGES.home_dinner} style={styles.tagImage} />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: SIZES.margin,
            backgroundColor: COLORS,

            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowColor: COLORS.grey,
            shadowOpacity: 0.5,
            borderRadius: 10,
          }}>
          <ImageBackground
            imageStyle={{ borderRadius: 10, opacity: 0.4 }}
            source={IMAGES.quote_background}
            resizeMode="cover"
            style={styles.bgImage}>
            <View style={styles.quoteCard}>
              <Image source={IMAGES.orange} style={styles.orangeImage} />

              <Text style={styles.quoteText}>
                Creating a Healthy mindset is an investment in your overall
                wellbeing
              </Text>
            </View>
          </ImageBackground>
        </View>

        <View style={styles.yogaCard}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                marginHorizontal: SIZES.margin,
                marginVertical: SIZES.margin,
                flex: 3,
              }}>
              <Text style={styles.yogaText}>Mindful Yoga</Text>
              <IconLabel
                containerStyle={styles.yogaTime}
                icon={ICONS.clock}
                label={'45 mins'}
                labelStyle={{
                  color: COLORS.black,
                }}
              />
            </View>

            <Image source={IMAGES.yoga} style={styles.yogaImage} />
          </View>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
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
  },

  labelText: {
    color: COLORS.black,
    ...FONTS.h2,
    textAlign: 'center',
  },

  horizontalCardContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cardInnerContainer: {
    width: SIZES.width / 3.9,
    height: SIZES.width / 3.9,
    borderRadius: SIZES.radius,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tagImage: {
    width: SIZES.width / 4.1,
    height: SIZES.width / 4.1,
    resizeMode: 'contain',
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

  quoteText: {
    color: COLORS.black,
    ...FONTS.body1,
    flex: 1,
    flexWrap: 'wrap',
  },

  yogaCard: {
    backgroundColor: '#E8D9DC',
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
  },

  yogaText: {
    color: COLORS.black,
    ...FONTS.body1,
    marginBottom: SIZES.margin,
  },

  yogaImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    flex: 2,
  },

  yogaTime: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius / 2,
    justifyContent: 'center',
  },

  bgImage: {
    padding: SIZES.padding,
    shadowColor: '#E8D9DC',
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

  startImg: {
    height: 40,
    width: 150,
    borderRadius: 10,
    justifyContent: 'center',
  },

  // editButton: {
  //   backgroundColor: COLORS.white,
  //   height: 28,
  //   width: 100,
  //   borderRadius: 10,
  //   marginLeft: SIZES.width * 0.05,
  //   justifyContent: 'center',
  // },
  // editButtonText: {
  //   alignSelf: 'center',
  //   color: '#AED796',
  //   ...FONTS.subtitle,
  // },

  profileLabelText: {
    color: COLORS.black,
    ...FONTS.body1,
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

  startText: {
    color: COLORS.black,
    ...FONTS.body2,
    flexWrap: 'wrap',
    alignSelf: 'center',
  },

  mealText: {
    alignSelf: 'center',
    ...FONTS.body2,
    marginVertical: SIZES.halfMargin,
  },
});

export default Home;
