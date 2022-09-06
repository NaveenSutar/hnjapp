import { types } from '..';
import http from '../../services/HttpService';
import { utils } from '../../utils';

function getUserDetails() {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.get(`/user/${id}`);
      dispatch({ type: types.SET_USER_DETAILS, payload: response.data });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function updateUserDetails(userDetails) {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.patch(`/user/${id}`, userDetails);
      dispatch({ type: types.SET_USER_DETAILS, payload: response.data });
      utils.successMsg('Thank you for filling out your information!');
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function calculateUserPrakriti(prakritiAnswers) {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.patch(
        `/user/prakriti/${id}`,
        prakritiAnswers,
      );
      dispatch({ type: types.SET_USER_DETAILS, payload: response.data.user });
      utils.successMsg(
        'Thank you for analysing your body constituency. Please generate your diet plan',
      );
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function updateUserAllergyAndPrefrences(userFoodDetails) {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.patch(`/user/${id}`, userFoodDetails);
      dispatch({ type: types.SET_USER_DETAILS, payload: response.data });
      dispatch(generateDietPlan(id));
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

async function startUserSubscription(userId, planId) {
  try {
    const response = await http.post('/subscription', { userId, planId });
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

function authenticatePayment(checkoutResponse, subscriptionId) {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.post('/subscription/verification', {
        userId: id,
        razorpayPaymentId: checkoutResponse.razorpay_payment_id,
        razorpaySignature: checkoutResponse.razorpay_signature,
        subscriptionId: subscriptionId,
      });
      if (response.data.isPaymentVerified) {
        dispatch({
          type: types.SET_SUBSCRIPTION_ID,
          payload: response.data,
        });
        utils.successMsg('Payment Successfull');
      } else {
        utils.errorMsgMsg('Payment Failed');
      }
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function generateYogaPlan() {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.post(`/yoga/${id}`);
      dispatch({
        type: types.SET_YOGA_ID,
        payload: response.data,
      });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function getSubscriptionId() {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.get(`/subscription/active/${id}`);
      dispatch({
        type: types.SET_SUBSCRIPTION_ID,
        payload: response.data,
      });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function getYogaId() {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.get(`/yoga/active/${id}`);
      dispatch({
        type: types.SET_YOGA_ID,
        payload: response.data,
      });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function generateDietPlan(userId) {
  return async dispatch => {
    try {
      const response = await http.post(`/diet/${userId}`);
      dispatch({ type: types.SET_DIET_PLAN_ID, payload: response.data });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function getDietPlanId() {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.get(`/diet/${id}`);
      dispatch({
        type: types.SET_DIET_PLAN_ID,
        payload: response.data,
      });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

async function subscriptionWeeks(dietId) {
  try {
    const response = await http.get(`/diet/weeks/${dietId}`);
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function weeklyDishes(dietId, startDate, endDate) {
  try {
    const response = await http.get(`/diet/weeklyDishes/${dietId}`, {
      params: { startDate, endDate },
    });
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function dishDetails(dishId) {
  try {
    const response = await http.get(`/dish/${dishId}`);
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function yogaPlan(yogaId) {
  try {
    const response = await http.get(`/yoga/${yogaId}`);
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function doshaData(userId) {
  try {
    const response = await http.get(`/dosha/${userId}`);
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function ingredientNamesAndCategories() {
  try {
    const response = await http.get('/ingredients');
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function dietNutrients(dietId) {
  try {
    const response = await http.get(`/diet/nutrients/${dietId}`);
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function getSubscriptionPlans() {
  try {
    const response = await http.get('/subscription/plans');
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

async function getActiveSubscriptionDetails(userId) {
  try {
    const response = await http.get(`/subscription/active/details/${userId}`);
    return response.data;
  } catch (err) {
    utils.hasErrors(err);
  }
}

function cancelSubscription(navigation) {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      const response = await http.post(`/subscription/cancel/${id}`);
      dispatch({
        type: types.SET_SUBSCRIPTION_ID,
        payload: response.data,
      });
      utils.successMsg('Subscription Cancelled');
      navigation.goBack();
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function savePrakritiAssessmentAnswer(prakritiAssessmentAnswer) {
  return async (dispatch, getState) => {
    try {
      const { id } = getState().auth;
      await http.patch(
        `/user/prakriti/assessment/${id}`,
        prakritiAssessmentAnswer,
      );
      dispatch(generateDietPlan(id));
      dispatch(generateYogaPlan());
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

function activeDiet(dietId) {
  return async dispatch => {
    try {
      const response = await http.get(`/diet/active/${dietId}`);
      dispatch({
        type: types.SET_IS_DIET_ACTIVE,
        payload: response.data,
      });
    } catch (err) {
      utils.hasErrors(err);
    }
  };
}

export default {
  getUserDetails,
  updateUserDetails,
  calculateUserPrakriti,
  getSubscriptionId,
  startUserSubscription,
  subscriptionWeeks,
  weeklyDishes,
  dishDetails,
  yogaPlan,
  doshaData,
  ingredientNamesAndCategories,
  updateUserAllergyAndPrefrences,
  dietNutrients,
  authenticatePayment,
  getYogaId,
  generateYogaPlan,
  getDietPlanId,
  getSubscriptionPlans,
  getActiveSubscriptionDetails,
  cancelSubscription,
  activeDiet,
  savePrakritiAssessmentAnswer,
};
