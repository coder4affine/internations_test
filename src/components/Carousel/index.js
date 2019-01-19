import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";

const index = ({
  data,
  renderItem,
  keyExtractor,
  ItemSeparatorComponent,
  snapToAlignment,
  decelerationRate,
  snapToInterval,
  scrollEventThrottle,
  verticalInset,
  horizontalInset,
  onViewableItemsChanged
}) => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={ItemSeparatorComponent}
      snapToAlignment={snapToAlignment}
      decelerationRate={decelerationRate}
      snapToInterval={snapToInterval}
      scrollEventThrottle={scrollEventThrottle}
      showsHorizontalScrollIndicator={false}
      onViewableItemsChanged={onViewableItemsChanged}
      contentInset={{
        top: verticalInset,
        left: horizontalInset,
        bottom: verticalInset,
        right: horizontalInset
      }}
      contentOffset={{ x: -horizontalInset, y: 0 }}
      indicatorStyle="white"
      showsHorizontalScrollIndicator
    />
  );
};

index.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  snapToInterval: PropTypes.number,
  snapToAlignment: PropTypes.string,
  scrollEventThrottle: PropTypes.number,
  decelerationRate: PropTypes.number,
  verticalInset: PropTypes.number,
  horizontalInset: PropTypes.number
};

index.defaultProps = {
  snapToAlignment: "center",
  scrollEventThrottle: 16,
  snapToInterval: 0,
  decelerationRate: 0.5,
  verticalInset: 0,
  horizontalInset: 0,
  onViewableItemsChanged: () => {}
};

export default index;
