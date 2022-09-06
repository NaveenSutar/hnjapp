import React from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS, SIZES } from '../constants';

const CustomModal = ({
  showModal,
  children,
  onPress,
  containerStyle,
  bodyStyle,
}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={showModal}>
      <View style={{ ...styles.modalContainer, ...containerStyle }}>
        {/* Transparent Background */}
        <TouchableWithoutFeedback
          // onPress={() => {
          //   onTouch(false);
          // }}
          onPress={onPress}>
          <View style={styles.modalBackground} />
        </TouchableWithoutFeedback>

        <View style={{ ...styles.modalBodyContainer, ...bodyStyle }}>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});

export default CustomModal;
