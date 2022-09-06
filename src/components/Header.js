import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FONTS, SIZES } from '../constants';

const Header = ({
  containerStyle,
  title = 'Edit',
  titleStyle,
  leftComponent,
  rightComponent,
  showLeftComponent = true,
  showRightComponent = false,
}) => {
  return (
    <View
      style={{
        ...styles.container,
        ...containerStyle,
      }}>
      {showLeftComponent ? leftComponent : <View />}
      <View style={styles.titleContainer}>
        <Text style={{ ...FONTS.h3, ...titleStyle }}>{title}</Text>
      </View>
      {rightComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.padding,
  },
});

export default Header;
