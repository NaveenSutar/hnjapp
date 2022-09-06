import { types } from '../';

const initialState = {
  firstName: null,
  lastName: '',
  mobile: '',
  email: '',
  dob: null,
  gender: '',
  country: null,
  foodAllergyDetails: { categories: [], ingredients: [] },
  breakfastPreferences: [],
  lunchPreferences: [],
  dinnerPreferences: [],
  vataPercentage: 0,
  pittaPercentage: 0,
  kaphaPercentage: 0,
  prakritiAnswers: null,
  diet: null,
  yoga: null,
  subscriptionId: null,
  isDietActive: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USER_DETAILS:
      return {
        ...state,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        mobile: action.payload.mobile,
        email: action.payload.email,
        dob: action.payload.dob,
        gender: action.payload.gender,
        country: action.payload.country,
        foodAllergyDetails: action.payload.foodAllergyDetails,
        breakfastPreferences: action.payload.breakfastPreferences,
        lunchPreferences: action.payload.lunchPreferences,
        dinnerPreferences: action.payload.dinnerPreferences,
        vataPercentage: action.payload.vataPercentage,
        pittaPercentage: action.payload.pittaPercentage,
        kaphaPercentage: action.payload.kaphaPercentage,
        prakritiAnswers: action.payload.prakritiAnswers,
      };
    case types.SET_SUBSCRIPTION_ID:
      return {
        ...state,
        subscriptionId: action.payload.subscriptionId,
      };
    case types.SET_YOGA_ID:
      return {
        ...state,
        yoga: action.payload.yogaId,
      };
    case types.SET_DIET_PLAN_ID:
      return {
        ...state,
        diet: action.payload.dietPlanId,
      };
    case types.SET_IS_DIET_ACTIVE:
      return {
        ...state,
        isDietActive: action.payload.isDietActive,
      };
    default:
      return {
        ...state,
      };
  }
};
