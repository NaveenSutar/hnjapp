import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SIZES, ICONS, FONTS, SCREENS, IMAGES } from '../../constants';
import {
  Header,
  IconButton,
  IconLabel,
  LineDivider,
  TextButton,
  CustomActivityIndicator,
} from '../../components';
import { utils } from '../../utils';
import { userActions } from '../../store';

const DishDetails = ({ route }) => {
  const navigation = useNavigation();
  const [dishData, setDietData] = useState(null);
  useEffect(() => {
    async function getDishDetails() {
      const dish = await userActions.dishDetails(route.params.dishId);
      setDietData(dish);
    }
    getDishDetails();
  }, [route.params.dishId, setDietData]);
  function renderHeader() {
    return (
      <Header
        title="Details"
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

  function renderDetails() {
    return (
      <View style={styles.detailsContainer}>
        {/* Food Card */}
        <View style={styles.foodCardContainer}>
          {/* Calories & Favourite */}
          <View style={styles.caloriesOuterContainer}>
            <View style={styles.caloriesContainer}>
              <Image source={ICONS.calories} style={styles.calorieImage} />
              <Text style={styles.calorieText}>
                {dishData.nutrients.calories} calorie
              </Text>
            </View>
          </View>
          {/* Food Image */}
          <Image
            source={{ uri: dishData.imageUrl }}
            resizeMode="contain"
            style={styles.foodImage}
          />
        </View>
        {/* Food Info */}
        <View style={styles.foodInfoContainer}>
          {/* Name & Description */}
          <View style={styles.foodInfoContainerRow}>
            <Text style={{ ...FONTS.h1 }}>
              {dishData.name.charAt(0).toUpperCase() + dishData.name.slice(1)}
            </Text>
          </View>
          {/* Prep & Cook Time */}
          <View style={styles.foodInfoContainerRow}>
            <IconLabel
              containerStyle={styles.foodInfoContainerRowIcon}
              icon={ICONS.clock}
              label={`${utils.convertMilliSecToMin(dishData.cookingTime)} min`}
              labelStyle={{
                color: COLORS.white,
              }}
            />
            <IconLabel
              containerStyle={styles.foodInfoContainerRowIcon}
              icon={ICONS.clock}
              label={`${utils.convertMilliSecToMin(
                dishData.preparationTime,
              )} min`}
              labelStyle={{
                color: COLORS.white,
              }}
            />
          </View>
          {/* Nutritional Information */}
          <View style={styles.foodInfoContainerRow}>
            <IconLabel
              containerStyle={styles.foodInfoContainerRowIcon}
              icon={ICONS.protein}
              label={dishData.nutrients.protein}
              labelStyle={{
                color: COLORS.white,
              }}
            />
            <IconLabel
              containerStyle={styles.foodInfoContainerRowIcon}
              icon={ICONS.carbs}
              label={dishData.nutrients.carbohydrate}
              labelStyle={{
                color: COLORS.white,
              }}
            />
            <IconLabel
              containerStyle={styles.foodInfoContainerRowIcon}
              icon={ICONS.fat}
              label={dishData.nutrients.fat}
              labelStyle={{
                color: COLORS.white,
              }}
            />
          </View>
        </View>
        {/* Recipe Ingredient Table */}

        <View style={styles.recipeIngredientContainer}>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <View style={styles.tableColumnHeader}>
                <Text style={styles.textHeader}>Recipe Ingredients</Text>
              </View>
            </View>
            {dishData.recipeIngredients.map((element, index) => {
              let ingredientNumber = index + 1;
              /* evey odd number of ingredient */
              if (ingredientNumber % 2 !== 0) {
                return (
                  <View key={index}>
                    <View style={styles.tableRow}>
                      <View style={styles.tableColumnRegular}>
                        <Text
                          style={
                            styles.textLineItem
                          }>{`${element.quantity} ${element.type} ${element.name}`}</Text>
                      </View>
                      {/* Vertical Line Divider */}
                      <View style={styles.recipeIngredientVerticalLine} />
                      <View style={styles.tableColumnRegular}>
                        {dishData.recipeIngredients[index + 1] ? (
                          <Text style={styles.textLineItem}>{`${
                            dishData.recipeIngredients[index + 1].quantity
                          } ${dishData.recipeIngredients[index + 1].type} ${
                            dishData.recipeIngredients[index + 1].name
                          }`}</Text>
                        ) : (
                          <Text />
                        )}
                      </View>
                    </View>
                    <LineDivider
                      lineStyle={{ backgroundColor: COLORS.primary }}
                    />
                  </View>
                );
              }
            })}
          </View>
        </View>
      </View>
    );
  }

  function renderRecipe() {
    return (
      <View style={styles.recipeContainer}>
        <IconLabel
          containerStyle={styles.recipeButton}
          label={'Recipe'}
          icon={ICONS.recipe}
          iconStyle={styles.recipeIcon}
          labelStyle={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        />
        {/* Recipe Details */}
        {dishData.recipes.map((item, index) => {
          return (
            <View key={`${index.toString()}`} style={styles.recipeItem}>
              <LineDivider
                lineStyle={{
                  height: 5,
                }}></LineDivider>
              <Text style={styles.stepText}>
                Step {index + 1}:
                <Text
                  style={{
                    color: COLORS.font,
                    ...FONTS.body1,
                  }}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </Text>
              <LineDivider lineStyle={{ height: 5 }} />
            </View>
          );
        })}
      </View>
    );
  }

  function renderFooter() {
    return <View style={styles.footerContainer} />;
  }
  return (
    <SafeAreaView style={styles.container}>
      {dishData ? (
        <View style={styles.container}>
          {/* Header */}
          {renderHeader()}

          {/* Food Details*/}
          <ScrollView>
            {renderDetails()}

            {renderRecipe()}
          </ScrollView>

          {/* Footer */}

          {renderFooter()}
        </View>
      ) : (
        <CustomActivityIndicator screen={SCREENS.dish_details} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
  detailsContainer: {
    marginTop: SIZES.margin,
    marginBottom: SIZES.margin,
    paddingHorizontal: SIZES.padding,
  },
  foodCardContainer: {
    height: 180,
    borderRadius: 15,
    backgroundColor: '#D4EAC7',
    alignItems: 'center',
  },
  caloriesOuterContainer: {
    flexDirection: 'row',
    marginTop: SIZES.halfMargin,
    paddingHorizontal: SIZES.halfPadding,
  },
  caloriesContainer: {
    flexDirection: 'row',
  },
  calorieImage: {
    height: 35,
    width: 35,
  },
  calorieText: {
    color: COLORS.font,
    ...FONTS.body4,
  },
  foodImage: {
    width: SIZES.width * 0.3,
    aspectRatio: 1,
  },
  foodInfoContainer: {
    marginTop: SIZES.margin,
  },
  foodInfoContainerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 10,
  },
  recipeContainer: {
    marginVertical: SIZES.halfMargin,
    paddingHorizontal: SIZES.padding,
    justifyContent: 'center',
  },
  recipeItem: {
    flex: 1,
    marginLeft: SIZES.halfMargin,
    justifyContent: 'center',
  },
  foodInfoContainerRowIcon: {
    backgroundColor: COLORS.primary,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    height: 55,
  },
  recipeIcon: {
    width: 30,
    height: 30,
  },
  recipeButton: {
    marginLeft: SIZES.margin,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#679279',
    borderRadius: 10,
    width: SIZES.width * 0.4,
    height: 40,
    alignSelf: 'center',
  },
  stepText: {
    color: '#679279',
    ...FONTS.body4,
    fontWeight: 'bold',
    margin: 5,
  },
  tableContainer: {
    flex: 1,
    borderRadius: 10,
  },
  tableRow: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 10,
  },
  tableColumnRegular: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    height: 'auto',
    padding: SIZES.halfPadding,
  },
  tableColumnHeader: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  textHeader: {
    color: 'white',
  },
  textLineItem: {
    color: COLORS.grey,
  },
  footerContainer: { height: 30, marginTop: 10 },
  recipeIngredientContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 10,
  },
  recipeIngredientVerticalLine: {
    height: '100%',
    width: 1,
    backgroundColor: COLORS.primary,
  },
});

export default DishDetails;
