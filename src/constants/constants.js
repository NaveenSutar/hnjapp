import { GIFS } from '../constants';

export const SCREENS = {
  main_layout: 'MainLayout',
  home: 'Home',
  my_prakriti: 'My Prakriti',
  prakriti_dashboard: 'Prakriti DashBoard',
  prakriti_question: 'Prakriti Question',
  yoga: 'Yoga',
  yoga_list: 'Yoga List',
  yoga_details: 'Yoga Details',
  diet: 'Diet Plan',
  diet_weeks: 'Diet Weeks',
  daily_dishes: 'Daily Dishes',
  dish_details: 'Dish Details',
  delivery: 'Delivery',
  refer: 'Invite a friend',
  settings: 'Settings',
  help_center: 'Help Center',
  logout: 'Logout',
  signin: 'SignIn',
  signup: 'SignUp',
  otp: 'OTP',
  account: 'Account',
  account_edit: 'Account Edit',
  termsOfService: 'Terms Of Service',
  subscription: 'Subscription',
  cancel_subscription: 'Cancel Subscription',
  new_home: 'New Home',
};

export const BOTTOM_TABS = [
  {
    id: 0,
    label: SCREENS.home,
  },
  {
    id: 1,
    label: SCREENS.my_prakriti,
  },
  {
    id: 2,
    label: SCREENS.yoga,
  },
  {
    id: 3,
    label: SCREENS.diet,
  },
];

export const GENDERS = [
  {
    id: 0,
    label: 'Male',
    value: 'Male',
  },
  {
    id: 1,
    label: 'Female',
    value: 'Female',
  },
  {
    id: 2,
    label: 'Others',
    value: 'Others',
  },
];

export const FOOD_PREFERRENCE = [
  'cereal',
  'toast',
  'bread',
  'salad',
  'soup',
  'khichdi',
  'chapati with curry',
  'rice with curry',
  'oats',
  'stuffed flat bread',
  'idly',
  'dosa',
  'eggs',
  'fruits/fruit bowl',
  'sandwich',
  'pancake',
];

export const SCREENS_ACTIVITY_INDICATORS = [
  {
    screen: SCREENS.prakriti_dashboard,
    image: GIFS.prakriti_dashboard_indicator,
    text: 'More than 9,000 Olympic athletes depend on Ayurveda for their Physical and mental abilities.',
  },
  {
    screen: SCREENS.home,
    image: GIFS.home_indicator,
    text: '',
  },
  {
    screen: SCREENS.diet,
    image: GIFS.diet_plan_indicator,
    text: 'Ayurveda, or Ayurvedic medicine, was documented in the sacred historical texts known as the Vedas many centuries ago.',
  },
  {
    screen: SCREENS.diet_weeks,
    image: GIFS.diet_weeks_indicator,
    text: '',
  },
  {
    screen: SCREENS.daily_dishes,
    image: GIFS.daily_dishes_indicator,
    text: 'Ayurveda, or Ayurvedic medicine, was documented in the sacred historical texts known as the Vedas many centuries ago.',
  },
  {
    screen: SCREENS.dish_details,
    image: GIFS.dish_details_indicator,
    text: 'Did you know, Ayurveda is 5,000 years old practice?',
  },
  {
    screen: SCREENS.my_prakriti,
    image: GIFS.my_prakriti_indicator,
    text: '',
  },
  {
    screen: SCREENS.yoga_list,
    image: GIFS.yoga_list_indicator,
    text: 'Did you know, Ayurveda is 5,000 years old practice?',
  },
  {
    screen: SCREENS.yoga,
    image: GIFS.yoga_indicator,
    text: '',
  },
];

export const RESEND_OTP_TIME_LIMIT = 60;
