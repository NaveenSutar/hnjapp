import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import SelectBox from 'react-native-multi-selectbox';
import { COLORS, SIZES, FONTS } from '../../constants';
import { xorBy } from 'lodash';

const FormMultiSelect = ({ data, label, values, searchInputPlaceholder }) => {
  const [selectedData, setSelectedData] = useState([]);
  useEffect(() => {
    values(selectedData);
  });

  function onMultiChange() {
    return item => {
      setSelectedData(xorBy(selectedData, [item], 'id'));
    };
  }

  return (
    <SelectBox
      label={label}
      inputPlaceholder={searchInputPlaceholder}
      options={data}
      selectedValues={selectedData}
      onMultiSelect={onMultiChange()}
      onTapClose={onMultiChange()}
      isMulti
      multiSelectInputFieldProps={styles.multiSelectInputFieldStyle}
      arrowIconColor={COLORS.primary}
      searchIconColor={COLORS.black}
      toggleIconColor={COLORS.primary}
      labelStyle={styles.labelStyle}
      containerStyle={styles.containerStyle}
      multiOptionContainerStyle={styles.multiOptionContainerStyle}
      multiOptionsLabelStyle={styles.multiOptionsLabelStyle}
      listOptionProps={styles.listOptionStyle}
    />
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginBottom: SIZES.halfMargin,
  },
  labelStyle: {
    color: COLORS.grey,
    ...FONTS.body2,
  },
  multiOptionContainerStyle: {
    marginVertical: SIZES.halfMargin,
    backgroundColor: COLORS.primary,
  },
  multiOptionsLabelStyle: {
    ...FONTS.body2,
  },
  listOptionStyle: {
    height: SIZES.height * 0.25,
  },
  multiSelectInputFieldStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default FormMultiSelect;
