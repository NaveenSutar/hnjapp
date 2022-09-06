import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { PrakritiDashBoard, PrakritiQuestions } from '../';
import { CustomActivityIndicator } from '../../components';
import { SCREENS } from '../../constants';

const MyPrakriti = () => {
  const user = useSelector(state => state.user);
  // const user = { prakritiAnswers: [] };
  function checkUserPrakriti() {
    if (user.prakritiAnswers.length) {
      return <PrakritiDashBoard />;
    } else {
      return <PrakritiQuestions />;
    }
  }

  return (
    <View style={styles.container}>
      {/* Can not put scroll view here because one function returns */}
      {/* <ScrollView> */}
      {user.prakritiAnswers ? (
        checkUserPrakriti()
      ) : (
        <CustomActivityIndicator screen={SCREENS.my_prakriti} />
      )}
      {/* </ScrollView> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyPrakriti;
