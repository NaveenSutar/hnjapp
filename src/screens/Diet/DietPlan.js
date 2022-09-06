import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SCREENS } from '../../constants';
import { useSelector } from 'react-redux';
import { CustomActivityIndicator, AnalysePrakriti } from '../../components';
import { DietWeeks, DietPlanForm, PrakritiAssessment } from '../';

const DietPlan = () => {
  const user = useSelector(state => state.user);

  function renderAnalysePrakritiButton() {
    return <AnalysePrakriti />;
  }

  function renderGenerateDietPlanButton() {
    return <DietPlanForm />;
  }

  function renderWeeklyDietPlanScreen() {
    return <DietWeeks />;
  }

  function renderPrakritiAssessmentScreen() {
    return <PrakritiAssessment />;
  }

  function isUserPrakritiCalculated() {
    if (user.prakritiAnswers.length) {
      if (user.diet && user.subscriptionId) {
        if (user.isDietActive) {
          return renderWeeklyDietPlanScreen();
        } else {
          return renderPrakritiAssessmentScreen();
        }
      } else {
        return renderGenerateDietPlanButton();
      }
    } else {
      return renderAnalysePrakritiButton();
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {user.prakritiAnswers ? (
          isUserPrakritiCalculated()
        ) : (
          <CustomActivityIndicator screen={SCREENS.diet} />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DietPlan;
