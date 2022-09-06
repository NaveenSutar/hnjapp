import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FONTS, SIZES, COLORS, SCREENS, IMAGES } from '../../constants';
import {
  FormMultiSelect,
  FormInput,
  TextButton,
  CustomModal,
} from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store';
import { useNavigation } from '@react-navigation/native';

const DietPlanForm = () => {
  const user = useSelector(state => state.user);
  const [categoryNamesData, setCategoryNamesData] = useState([]);
  const [ingredientsNamesData, setIngredientsNamesData] = useState([]);
  const [ingredients, setIngredientNames] = useState([]);
  const [categories, setIngredientCategories] = useState([]);
  const [breakfastPreferrences, setBreakfastPreferrences] = useState('');
  const [lunchPreferrences, setLunchPreferrences] = useState('');
  const [dinnerPreferrences, setDinnerPreferrences] = useState('');
  const [isFreeTrialModalVisible, setIsFreeTialModalVisible] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    async function getIngredientData() {
      const { ingredientNames, ingredientCategories } =
        await userActions.ingredientNamesAndCategories();
      setIngredientsNamesData(ingredientNames);
      setCategoryNamesData(ingredientCategories);
    }
    getIngredientData();
  }, [dispatch]);

  function requestToGenerateDietPlan() {
    const ingredientIds = ingredients.map(item => item.id);
    const ingredientCategoryNames = categories.map(item => item.item);
    let breakfast;
    if (breakfastPreferrences.length > 0) {
      breakfast = breakfastPreferrences.trim().split(',');
    } else {
      breakfast = [];
    }
    let lunch;
    if (lunchPreferrences.length > 0) {
      lunch = lunchPreferrences.trim().split(',');
    } else {
      lunch = [];
    }
    let dinner;
    if (dinnerPreferrences.length > 0) {
      dinner = dinnerPreferrences.trim().split(',');
    } else {
      dinner = [];
    }
    const userDetails = {
      foodAllergyDetails: {
        categories: ingredientCategoryNames,
        ingredients: ingredientIds,
      },
      breakfastPreferences: breakfast,
      lunchPreferences: lunch,
      dinnerPreferences: dinner,
    };
    if (user.subscriptionId) {
      dispatch(userActions.updateUserAllergyAndPrefrences(userDetails));
    } else {
      setIsFreeTialModalVisible(true);
    }
  }

  return (
    <View>
      <CustomModal
        showModal={isFreeTrialModalVisible}
        onPress={() => {
          setIsFreeTialModalVisible(false);
        }}>
        <Image source={IMAGES.free_trial} style={styles.freeTrialImage} />
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            navigation.navigate(SCREENS.subscription);
            setIsFreeTialModalVisible(false);
          }}
          style={styles.modalButtonStyle}>
          <Text style={styles.modalButtonTextStyle}>Start Free Trial</Text>
        </TouchableOpacity>
      </CustomModal>
      <Text
        style={{
          ...FONTS.body3,
          marginTop: SIZES.halfMargin,
          marginHorizontal: SIZES.margin,
        }}>
        Please help us understand your allergies to any specific food
        ingredients and your meal preferences. You can add multiple food
        prefernces separated by ','
      </Text>
      <View style={styles.formContainer}>
        {/* <FormMultiSelect
          data={categoryNamesData}
          label="Select Allergy Category"
          searchInputPlaceholder="Search Category"
          values={value => {
            setIngredientCategories(value);
          }}
        /> */}
        <FormMultiSelect
          data={ingredientsNamesData}
          label="Select Allergy Ingredient"
          searchInputPlaceholder="Search Ingredient"
          values={value => {
            setIngredientNames(value);
          }}
        />
        <FormInput
          label="Breakfast Preferences"
          placeholder="example: dosa, cereal, toast"
          value={breakfastPreferrences}
          onChange={value => {
            setBreakfastPreferrences(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
        />
        <FormInput
          label="Lunch Preferences"
          placeholder="example: curry with chapati, Porridge"
          value={lunchPreferrences}
          onChange={value => {
            setLunchPreferrences(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
        />
        <FormInput
          label="Dinner Preferences"
          placeholder="example: salad, khichdi, soup"
          value={dinnerPreferrences}
          onChange={value => {
            setDinnerPreferrences(value);
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
          containerStyle={{
            marginTop: SIZES.halfMargin,
          }}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.5}
        onPress={requestToGenerateDietPlan}
        style={styles.buttonContainerStyle}>
        <Text style={styles.textStyle}>Generate Diet Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainerStyle: {
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
    marginHorizontal: SIZES.margin,
  },
  textStyle: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
  modalButtonStyle: {
    height: SIZES.height / 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  modalButtonTextStyle: {
    width: '100%',
    textAlign: 'center',
    color: COLORS.white,
    ...FONTS.h3,
  },
  formContainer: {
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: '#F5F5F8',
    margin: SIZES.margin,
  },
  freeTrialImage: {
    height: SIZES.height / 4,
    width: SIZES.width / 1.5,
  },
  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  saveButton: {
    width: '100%',
    padding: SIZES.halfPadding * 1.5,
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h3,
  },
});

export default DietPlanForm;
