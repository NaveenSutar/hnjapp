import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { TimelineItem } from '../';
import { COLORS, SIZES } from '../../constants';
import { utils } from '../../utils';

const Timeline = ({ onPress, data }) => {
  const renderItem = (item, index) => {
    const isLastMember = index === data.length - 1;
    return (
      <TimelineItem
        data={item}
        list={item.data}
        isLastMember={isLastMember}
        onPress={onPress}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        style={styles.listStyle}
        contentInset={styles.contentInset}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item, index }) => renderItem(item, index)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FBFBFB',
    marginLeft: SIZES.halfMargin,
    marginRight: SIZES.halfMargin,
    height: SIZES.height,
  },
  listStyle: {
    paddingTop: 16,
    width: SIZES.width,
    maxHeight: utils.isAndroid ? SIZES.height / 1.2 - 32 : SIZES.height,
  },
  contentContainerStyle: {
    alignItems: 'center',
  },
  contentInset: {
    bottom: SIZES.height * 0.3,
  },
});

export default Timeline;
