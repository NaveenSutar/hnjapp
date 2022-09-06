import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { TimelineCard, PointLine } from '..';
import { SIZES } from '../../constants';
import { utils } from '../../utils';

const Item = props => {
  const { data, list, isLastMember, onPress } = props;
  const renderItem = (item, index) => {
    return (
      <TimelineCard
        {...props}
        key={index}
        isCard
        data={item}
        onPress={onPress}
      />
    );
  };

  return (
    <View style={styles.container}>
      <PointLine
        {...props}
        data={data.consumeAt}
        length={list.length}
        isLastMember={isLastMember}
      />
      <View style={styles.insideListContainer}>
        <FlatList
          data={list}
          renderItem={({ item, index }) => renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: utils.SCREEN_WIDTH,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: SIZES.margin,
  },
  insideListContainer: {
    marginTop: -SIZES.margin,
    flexDirection: 'column',
  },
});

export default Item;
