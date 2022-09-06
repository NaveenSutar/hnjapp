import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SIZES, FONTS } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { utils } from '../../utils';
import { CustomModal } from '../../components';
import LinearGradient from 'react-native-linear-gradient';
import PrakritiQBox from '../../components/Form/PrakritiQBox';
import { userActions } from '../../store';
import { NEW_SCRIPT } from '../../constants/scripts';

const PrakritiQuestions = props => {
  const selectedTab = useSelector(state => state.tab.selectedTab);
  const { firstName } = useSelector(state => state.user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const flatListRef = useRef(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedTab === 'My Prakriti') {
      if (scrollIndex === 0) {
        setIsModalVisible(true);
      }
    }

    flatListRef?.current?.scrollToIndex({
      index: scrollIndex,
      animated: true,
    });
  }, [selectedTab, scrollIndex]);

  async function saveAnswer() {
    const prakritiAnswerFromAsyncStorage = await AsyncStorage.getItem(
      'prakritiAnswers',
    );
    const parsedPrakritiAnswerFromAsyncStorage = JSON.parse(
      prakritiAnswerFromAsyncStorage,
    );
    let numberOfQuestions = 0;

    NEW_SCRIPT.forEach(sec => {
      numberOfQuestions += sec.secQuestions.length;
    });
    if (
      Object.keys(parsedPrakritiAnswerFromAsyncStorage).length ===
      numberOfQuestions
    ) {
      dispatch(
        userActions.calculateUserPrakriti(parsedPrakritiAnswerFromAsyncStorage),
      );
    } else {
      utils.errorMsg('Please fill all the questions');
    }
  }

  return (
    <View style={styles.container}>
      <CustomModal
        showModal={isModalVisible}
        onPress={() => {
          setIsModalVisible(false);
        }}>
        <Text style={styles.modalHeading}>Dear {firstName}</Text>

        <Text style={styles.modalBody}>
          Please help AIUR to understand you better by answering the following
          questions. You can select multiple answers for each question. Thank
          You
        </Text>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            setIsModalVisible(false);
          }}
          style={styles.modalButton}>
          <Text style={styles.saveButton}>GOT IT!</Text>
        </TouchableOpacity>
      </CustomModal>

      <FlatList
        scrollEnabled={false}
        initialScrollIndex={scrollIndex}
        ref={flatListRef}
        data={NEW_SCRIPT}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => `${item.secId}`}
        renderItem={({ item, index }) => (
          <ScrollView>
            <LinearGradient
              colors={['#90B127', '#79961E']}
              style={styles.questionBannerContainer}>
              <View style={styles.shadyObject}></View>
              <Text style={styles.bannertitle}>{item.secLabel}</Text>
              <Text style={styles.bannerBody}>{item.secBody}</Text>
            </LinearGradient>

            <PrakritiQBox
              questions={item.secQuestions}
              scriptType={utils.PRAKRITI_SCRIPT_TYPES.question}
            />

            {scrollIndex > 0 && scrollIndex < 5 ? (
              <View style={{ flexDirection: 'row', margin: SIZES.margin }}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    if (scrollIndex === 5) {
                      return;
                    }
                    setScrollIndex(scrollIndex - 1);
                  }}
                  style={styles.prevButton}>
                  <Text style={styles.saveButton}>PREVIOUS</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    if (scrollIndex === 5) {
                      return;
                    }
                    setScrollIndex(scrollIndex + 1);
                  }}
                  style={styles.nextButton}>
                  <Text style={styles.saveButton}>NEXT</Text>
                </TouchableOpacity>
              </View>
            ) : scrollIndex === 5 ? (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={saveAnswer}
                style={styles.buttonContainer}>
                <Text style={styles.saveButton}>SUBMIT ANSWERS</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {
                  if (scrollIndex === 5) {
                    return;
                  }
                  setScrollIndex(scrollIndex + 1);
                }}
                style={styles.buttonContainer}>
                <Text style={styles.saveButton}>NEXT</Text>
              </TouchableOpacity>
            )}
          </ScrollView>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  modalHeading: {
    ...FONTS.h2,
    paddingBottom: SIZES.padding,
    color: COLORS.primary,
  },

  modalBody: {
    ...FONTS.body1,
    paddingBottom: SIZES.padding,
    color: COLORS.font,
  },

  modalButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
  },
  getStartedButtonContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    alignItems: 'center',
  },
  getStartedButtonText: {
    ...FONTS.body1,
    color: COLORS.white,
    marginVertical: SIZES.halfMargin,
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

  prevButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    width: SIZES.width / 2 - SIZES.margin * 1.5,
    marginEnd: SIZES.margin / 2,
  },

  nextButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.radius,
    width: SIZES.width / 2 - SIZES.margin * 1.5,
    marginStart: SIZES.margin / 2,
  },
});

export default PrakritiQuestions;
