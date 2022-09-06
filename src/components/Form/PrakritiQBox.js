import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';

import { COLORS, FONTS, SIZES } from '../../constants';
import QCheckBox from './QCheckbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { utils } from '../../utils';

const PrakritiQBox = props => {
  const touchable = useRef();
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const [showModal, setShowModel] = useState(false);

  const expandModal = item => {
    setSelectedQuestion(item);
    setShowModel(true);
  };

  const closeModal = () => {
    setSelectedQuestion(null);
    setShowModel(false);
  };

  const prakritiAssessmentAnswer = [];

  async function markQuestionCheckItem(values, item) {
    const prakritiAnswerFromAsyncStorage = await AsyncStorage.getItem(
      'prakritiAnswers',
    );
    const parsedPrakritiAnswerFromAsyncStorage = JSON.parse(
      prakritiAnswerFromAsyncStorage,
    );

    const mappedPrakritiAnswersWithQues = {
      id: item.qId,
      tag: item.qTag,
      answers: values,
    };

    let prakritiAnswers = [];

    if (!parsedPrakritiAnswerFromAsyncStorage) {
      prakritiAnswers = [{ ...mappedPrakritiAnswersWithQues }];
    } else {
      const existingItemIndex = parsedPrakritiAnswerFromAsyncStorage.findIndex(
        element => element.id === mappedPrakritiAnswersWithQues.id,
      );
      existingItemIndex > -1
        ? (parsedPrakritiAnswerFromAsyncStorage[existingItemIndex] =
            mappedPrakritiAnswersWithQues)
        : parsedPrakritiAnswerFromAsyncStorage.push({
            ...mappedPrakritiAnswersWithQues,
          });
      prakritiAnswers = [...parsedPrakritiAnswerFromAsyncStorage];
    }
    await AsyncStorage.setItem(
      'prakritiAnswers',
      JSON.stringify(prakritiAnswers),
    );
  }

  async function markAssessmentCheckItem(values, item) {
    const mappedAssessmentAnswer = {
      id: item.qId,
      tag: item.qTag,
      answers: values,
    };
    if (!prakritiAssessmentAnswer.length) {
      prakritiAssessmentAnswer.push({ ...mappedAssessmentAnswer });
    } else {
      const existingItemIndex = prakritiAssessmentAnswer.findIndex(
        element => element.id === mappedAssessmentAnswer.id,
      );
      existingItemIndex > -1
        ? (prakritiAssessmentAnswer[existingItemIndex] = mappedAssessmentAnswer)
        : prakritiAssessmentAnswer.push({ ...mappedAssessmentAnswer });
    }
    props.assessmentAnswers(prakritiAssessmentAnswer);
  }

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          {/* Transparent Background */}
          <TouchableWithoutFeedback onPress={() => closeModal()}>
            <View style={styles.modalBackground} />
          </TouchableWithoutFeedback>

          <View style={styles.modalBodyContainer}>
            <Text style={styles.modalHeaderText}>
              {selectedQuestion && selectedQuestion.qLabel}
            </Text>
            <Text style={styles.modalText}>
              {selectedQuestion && selectedQuestion.qInfo}
            </Text>
          </View>
        </View>
      </Modal>

      <FlatList
        scrollEnabled={false}
        data={props.questions}
        keyExtractor={item => `${item.qId}`}
        renderItem={({ item, index }) => (
          <View style={styles.qBoxContainer}>
            <Text style={styles.qText}>{item.qLabel}</Text>
            <QCheckBox
              options={item.qOptions}
              quesId={item.qId}
              scriptType={props.scriptType}
              onItemChecked={values => {
                if (props.scriptType === utils.PRAKRITI_SCRIPT_TYPES.question) {
                  markQuestionCheckItem(values, item);
                }
                if (
                  props.scriptType === utils.PRAKRITI_SCRIPT_TYPES.assessment
                ) {
                  markAssessmentCheckItem(values, item);
                }
              }}
            />

            {item.qInfo == null ? null : (
              <TouchableOpacity
                ref={touchable}
                onPress={() => expandModal(item)}
                style={styles.infoIcon}>
                <Text style={styles.infoIconText}>i</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  qBoxContainer: {
    backgroundColor: '#fff',
    borderRadius: SIZES.radius,
    marginTop: SIZES.margin,
    marginBottom: SIZES.halfMargin,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowColor: COLORS.grey,
    shadowOpacity: 0.5,
    padding: SIZES.margin,
    marginHorizontal: SIZES.margin,
    width: SIZES.width - SIZES.margin * 2,

    borderTopColor: Platform.OS === 'android' ? '#00000010' : null,
    borderTopWidth: Platform.OS === 'android' ? 2 : 0,
    borderLeftColor: Platform.OS === 'android' ? '#00000010' : null,
    borderLeftWidth: Platform.OS === 'android' ? 2 : 0,
    borderRightColor: Platform.OS === 'android' ? '#00000010' : null,
    borderRightWidth: Platform.OS === 'android' ? 2 : 0,
  },

  qText: {
    ...FONTS.body1,
    marginBottom: SIZES.halfMargin,
  },

  infoIcon: {
    position: 'absolute',
    right: SIZES.margin,
    top: SIZES.margin,
    borderWidth: 1,
    borderColor: COLORS.info,
    width: 20,
    height: 20,
    borderRadius: 10,
  },

  infoIconText: {
    ...FONTS.body1,
    color: COLORS.info,
    textAlign: 'center',
  },

  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.transparentBlack,
  },

  modalBodyContainer: {
    width: SIZES.width * 0.9,
    padding: SIZES.padding,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },

  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalText: {
    ...FONTS.body2,
  },

  modalHeaderText: {
    ...FONTS.body1,
    color: COLORS.primary,
    marginBottom: SIZES.halfMargin,
  },
});

export default PrakritiQBox;
