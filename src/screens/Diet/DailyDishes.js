import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Header,
  IconButton,
  Timeline,
  CustomActivityIndicator,
} from '../../components';
import { COLORS, ICONS, SIZES, SCREENS, IMAGES } from '../../constants';
import { userActions } from '../../store';
import { useSelector } from 'react-redux';

const DailyDishes = ({ route }) => {
  const { diet } = useSelector(state => state.user);
  const [dietPlan, setDietPlan] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    async function getDietPlan() {
      const dishes = await userActions.weeklyDishes(
        diet,
        route.params.startDate,
        route.params.endDate,
      );
      setDietPlan(dishes);
    }
    getDietPlan();
  }, [route.params.endDate, route.params.startDate, diet]);
  function onDishSelected(dishId) {
    navigation.navigate(SCREENS.dish_details, { dishId });
  }

  function renderHeader() {
    return (
      <Header
        title={'Full Week Diet Plan'}
        showLeftComponent={true}
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

  function renderList() {
    return <Timeline data={dietPlan} onPress={onDishSelected} />;
  }

  function renderFooter() {
    return <View style={styles.footerContainer} />;
  }

  return dietPlan.length ? (
    <SafeAreaView>
      {/* Header */}
      {renderHeader()}
      {/* List */}
      {renderList()}
      {/* Footer */}
      {renderFooter()}
    </SafeAreaView>
  ) : (
    <CustomActivityIndicator screen={SCREENS.daily_dishes} />
  );
};

const styles = StyleSheet.create({
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
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  foodInfoContainer: {
    flex: 1,
  },
  footerContainer: {
    height: 30,
    marginTop: 10,
  },
});

export default DailyDishes;
