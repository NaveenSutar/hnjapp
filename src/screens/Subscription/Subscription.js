import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  Linking,
  BackHandler,
} from 'react-native';
import { COLORS, SIZES, FONTS, ICONS, IMAGES, SCREENS } from '../../constants';
import { userActions } from '../../store';
import RazorpayCheckout from 'react-native-razorpay';
import { useSelector, useDispatch } from 'react-redux';
import { Header, IconButton, TextButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { utils } from '../../utils';

const Subscription = () => {
  const user = useSelector(state => state.user);
  // const user = { subscriptionId: 'sdf' };
  const { id } = useSelector(state => state.auth);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [planDetails, setPlanDetails] = useState([]);
  const [activeSubscriptionDetails, setActiveSubscriptionDetails] = useState(
    {},
  );

  useEffect(() => {
    async function getPlans() {
      const planResponse = await userActions.getSubscriptionPlans();
      const structuredPlanDetails = planResponse.items.map(plan => {
        return {
          interval: plan.interval,
          period: plan.period,
          amount: convertAmountToRupee(plan.item.amount),
          isSelected: defaultSelectedPlan(plan.interval),
          planId: plan.id,
        };
      });
      setPlanDetails([...structuredPlanDetails]);
    }
    getPlans();
  }, [dispatch]);

  useEffect(() => {
    async function fetchActiveSubscription() {
      const activeSubscription = await userActions.getActiveSubscriptionDetails(
        id,
      );
      setActiveSubscriptionDetails({ ...activeSubscription });
    }
    if (user.subscriptionId) {
      fetchActiveSubscription();
    }
  }, [id, user.subscriptionId]);

  function defaultSelectedPlan(planInterval) {
    return planInterval === 6 ? true : false;
  }

  function convertAmountToRupee(amount) {
    return amount / 100;
  }

  function selectedPlanStyle(isPlanSelected) {
    return isPlanSelected
      ? { borderWidth: 4, borderColor: COLORS.primary }
      : {};
  }

  function selectPlan(selectedPlanIndex) {
    const newSelectedPlan = planDetails.map((item, index) => {
      return {
        ...item,
        isSelected: index === selectedPlanIndex ? true : false,
      };
    });
    setPlanDetails([...newSelectedPlan]);
  }

  function setSubscribeButtonText() {
    const selectedPlan = planDetails.find(plan => plan.isSelected === true);
    return selectedPlan
      ? `Get ${selectedPlan.interval} ${selectedPlan.period} @ ${selectedPlan.amount}`
      : 'Get Subscription';
  }

  function getPlanIdOfSelectedPlan() {
    const selectedPlan = planDetails.find(plan => plan.isSelected === true);
    return selectedPlan.planId;
  }

  function getNextBillingDate() {
    const { date } = utils.convertUnixToDateFormat(
      activeSubscriptionDetails.charge_at,
    );
    return utils.formatDate(date);
  }

  async function razorpayCheckoutForm() {
    const planId = getPlanIdOfSelectedPlan();
    const { subscriptionId } = await userActions.startUserSubscription(
      id,
      planId,
    );
    const razorpayOptions = {
      key: 'rzp_test_iP4DlHIrNtm0yK',
      subscription_id: subscriptionId,
      name: 'Health & Jiva',
      description: 'Health & Jiva is a 360° health and wellness platform',
      prefil: {
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        contact: user.mobile,
      },
    };
    RazorpayCheckout.open(razorpayOptions)
      .then(data => {
        dispatch(userActions.authenticatePayment(data, subscriptionId));
      })
      .catch(error => {
        console.log(error);
        utils.errorMsg('Payment Failed');
      });
  }

  function renderHeader() {
    return (
      <Header
        title={'Subscription'}
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

  function renderSubscriptionImage() {
    return (
      <View style={styles.subscriptionImageContainer}>
        <Image source={IMAGES.subscription} style={styles.subscriptionImage} />
      </View>
    );
  }

  function renderSubscriptionImage() {
    return (
      <View style={styles.subscriptionImageContainer}>
        <Image source={IMAGES.subscription} style={styles.subscriptionImage} />
      </View>
    );
  }

  function renderSubscriptionHeading() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Upgrade To Premium</Text>
        <Text style={styles.subHeading}>
          Personalized Diet Plan, Yoga Plan, Marketplace and so more !
        </Text>
      </View>
    );
  }

  function renderPlanBoxes() {
    return (
      <View>
        <View style={styles.planBoxContainer}>
          {planDetails.map((plan, index) => {
            return (
              <TouchableOpacity
                style={{
                  ...styles.planBox,
                  ...selectedPlanStyle(plan.isSelected),
                }}
                key={index}
                onPress={() => {
                  selectPlan(index);
                }}>
                <Text style={styles.numberOfMonths}>{plan.interval}</Text>
                <Text style={styles.period}>{plan.period}</Text>
                <Text>₹{plan.amount}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.subscribeButtonContainer}>
          <TextButton
            buttonContainerStyle={styles.subscribeButton}
            label={setSubscribeButtonText()}
            labelStyle={{
              color: COLORS.white,
            }}
            onPress={() => {
              if (utils.isAndroid) {
                razorpayCheckoutForm();
              }
              if (utils.isIOS) {
                Linking.openURL('http://localhost:3000');
                // BackHandler.exitApp();
              }
            }}
          />
        </View>
      </View>
    );
  }

  function renderActiveSubscriptionBox() {
    return (
      <View style={styles.activeSubscriptionContainer}>
        <View style={styles.activeSubscriptionHeadingContainer}>
          <Text style={styles.activeSubscriptionHeadingText}>
            Active Subscription
          </Text>
        </View>
        <View style={styles.activePlanBox}>
          <View>
            <Image
              source={IMAGES.active_subscription}
              style={styles.activeSubscriptionImage}
            />
          </View>
          <View style={styles.activeSubscriptionData}>
            <Text style={styles.activeSubscriptionDataHeading}>
              Plan Details
            </Text>
            <View style={styles.activeSubscriptionDataContainer}>
              <Text style={styles.activeSubscriptionDataTag}>Status:</Text>
              <Text style={styles.activeSubscriptionDataValue}>Active</Text>
            </View>
            <View style={styles.activeSubscriptionDataContainer}>
              <Text style={styles.activeSubscriptionDataTag}>Next Cycle:</Text>
              <Text style={styles.activeSubscriptionDataValue}>
                {getNextBillingDate()}
              </Text>
            </View>
          </View>
        </View>
        <TextButton
          buttonContainerStyle={styles.cancelSubscriptionButton}
          label="Cancel Subscription"
          labelStyle={{
            color: '#898B9A',
          }}
          onPress={() => {
            navigation.navigate(SCREENS.cancel_subscription);
          }}
        />
      </View>
    );
  }

  function renderSubscriptionDetails() {
    return (
      <View style={styles.questionAnswerContainer}>
        <Text style={styles.question}> When will i be billed ?</Text>
        <Text style={styles.answer}>
          Your account will be billed at the end of your trial period(if
          applicable) or confirmation of your subscription.
        </Text>
        <Text style={styles.question}> Does My subscription Auto Renew ?</Text>
        <Text style={styles.answer}>
          {' '}
          Yes, You can disable this at any time with just one tap on the app
          store
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {renderHeader()}
        {renderSubscriptionImage()}
        {user.subscriptionId
          ? renderActiveSubscriptionBox()
          : renderSubscriptionHeading() && renderPlanBoxes()}
        {renderSubscriptionDetails()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.margin,
    marginHorizontal: SIZES.margin,
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin,
    width: '80%',
  },
  saveButton: {
    width: '100%',
    padding: SIZES.halfPadding * 1.5,
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h3,
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
  subscriptionImage: {
    height: SIZES.height / 3,
    width: SIZES.width,
  },
  headingContainer: {
    padding: SIZES.padding,
    alignItems: 'center',
  },
  heading: {
    ...FONTS.h2,
    color: COLORS.primary,
  },
  subHeading: {
    ...FONTS.body1,
    color: COLORS.black,
    textAlign: 'center',
  },
  planBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  planBox: {
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin,
    marginBottom: SIZES.halfMargin,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
    padding: SIZES.halfPadding,
    marginHorizontal: SIZES.margin,
    alignItems: 'center',
  },
  numberOfMonths: {
    ...FONTS.h1,
    color: COLORS.primary,
  },
  period: {
    ...FONTS.body2,
  },
  subscribeButton: {
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius,
  },
  subscribeButtonContainer: {
    padding: SIZES.padding,
  },
  questionAnswerContainer: {
    alignItems: 'center',
  },
  question: {
    ...FONTS.subtitle,
    color: COLORS.primary,
  },
  answer: {
    ...FONTS.body2,
    padding: SIZES.halfPadding,
  },
  activeSubscriptionContainer: {
    backgroundColor: COLORS.lightBlack,
    borderBottomLeftRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
    marginTop: SIZES.halfMargin,
    marginBottom: SIZES.halfMargin,
  },
  activeSubscriptionHeadingContainer: {
    padding: SIZES.padding / 3,
    marginHorizontal: SIZES.margin,
    borderRadius: SIZES.radius,
  },
  activeSubscriptionHeadingText: {
    color: COLORS.primary,
    ...FONTS.h2,
    textAlign: 'center',
    marginTop: SIZES.halfMargin,
  },
  activePlanBox: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.halfMargin,
    elevation: 1,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
    padding: SIZES.padding,
    marginHorizontal: SIZES.margin,
    flexDirection: 'row',
  },
  activeSubscriptionImage: {
    height: SIZES.height / 8,
    width: SIZES.width / 3,
  },
  activeSubscriptionData: {
    marginLeft: SIZES.margin,
  },
  activeSubscriptionDataHeading: {
    ...FONTS.h3,
    color: COLORS.font,
    marginBottom: SIZES.margin,
  },
  activeSubscriptionDataContainer: {
    flexDirection: 'row',
  },
  activeSubscriptionDataTag: {
    ...FONTS.body1,
    marginVertical: SIZES.halfMargin / 2,
  },
  activeSubscriptionDataValue: {
    ...FONTS.body1,
    color: COLORS.primary,
    marginVertical: SIZES.halfMargin / 2,
    marginHorizontal: SIZES.halfMargin,
  },
  cancelSubscriptionButton: {
    backgroundColor: COLORS.lightGrey,
    padding: SIZES.padding / 2,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.margin,
    marginHorizontal: SIZES.margin,
  },
});

export default Subscription;
