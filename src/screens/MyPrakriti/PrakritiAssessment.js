import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES, FONTS } from '../../constants';
import PrakritiQBox from '../../components/Form/PrakritiQBox';
import { PRAKRITI_ASSESSMENT_SCRIPT } from '../../constants/scripts';
import { utils } from '../../utils';
import { useDispatch } from 'react-redux';
import { userActions } from '../../store';

const PrakritiAssessment = () => {
  let prakritiAssessmentAnswer = [];
  const dispatch = useDispatch();
  function saveAssessmentAnswer() {
    if (
      prakritiAssessmentAnswer.length !==
      PRAKRITI_ASSESSMENT_SCRIPT.questions.length
    ) {
      utils.errorMsg('Please answer all the questions.');
    } else {
      dispatch(
        userActions.savePrakritiAssessmentAnswer(prakritiAssessmentAnswer),
      );
    }
  }
  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#90B127', '#79961E']}
        style={styles.questionBannerContainer}>
        <View style={styles.shadyObject} />
        <Text style={styles.bannertitle}>
          {PRAKRITI_ASSESSMENT_SCRIPT.secLabel}
        </Text>
        <Text style={styles.bannerBody}>
          {PRAKRITI_ASSESSMENT_SCRIPT.secBody}
        </Text>
      </LinearGradient>

      <PrakritiQBox
        questions={PRAKRITI_ASSESSMENT_SCRIPT.questions}
        scriptType={utils.PRAKRITI_SCRIPT_TYPES.assessment}
        assessmentAnswers={answers => {
          console.log('answer', answers);
          prakritiAssessmentAnswer = answers;
        }}
      />
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={saveAssessmentAnswer}
        style={styles.buttonContainer}>
        <Text style={styles.saveButton}>Generate Diet Plan</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  questionBannerContainer: {
    backgroundColor: COLORS.primary,
    borderBottomEndRadius: SIZES.radius,
    borderBottomLeftRadius: SIZES.radius,
    padding: SIZES.padding,
    width: SIZES.width,
  },
  shadyObject: {
    position: 'absolute',
    left: -SIZES.height / 7,
    top: -SIZES.height / 50,
    height: SIZES.height * 2,
    width: SIZES.height / 2,
    backgroundColor: '#ffffff10',
    borderTopEndRadius: SIZES.height,
  },

  bannertitle: {
    ...FONTS.h3,
    color: COLORS.white,
  },
  bannerBody: {
    ...FONTS.body1,
    color: COLORS.white,
    lineHeight: 20,
    marginTop: SIZES.halfMargin,
  },
  buttonContainer: {
    backgroundColor: COLORS.primary,
    marginBottom: SIZES.margin,
    marginHorizontal: SIZES.margin,
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin,
  },
  saveButton: {
    width: '100%',
    padding: SIZES.halfPadding * 1.5,
    color: COLORS.white,
    textAlign: 'center',
    ...FONTS.h3,
  },
});

export default PrakritiAssessment;
