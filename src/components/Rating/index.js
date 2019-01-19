import React from "react";
import PropTypes from "prop-types";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Rating = ({ rating, total }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center"
      }}
    >
      <Text
        style={{
          fontSize: 14,
          marginRight: 5,
          color: "rgba(0, 0, 0, 0.54)"
        }}
      >
        {rating}
      </Text>
      {[1, 2, 3, 4, 5].map(item => (
        <Icon
          key={item}
          style={{ marginHorizontal: 2 }}
          name={
            item < rating
              ? item + 1 <= rating
                ? `${iconType}-star`
                : `${iconType}-star-half`
              : `${iconType}-star-outline`
          }
          size={18}
          color="#F2BE42"
        />
      ))}
      {total && (
        <Text
          style={{
            fontSize: 14,
            marginLeft: 5,
            color: "rgba(0, 0, 0, 0.54)"
          }}
        >{`(${total})`}</Text>
      )}
    </View>
  );
};

Rating.propTypes = {};

export default Rating;
