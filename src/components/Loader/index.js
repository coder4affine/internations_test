import React from "react";
import PropTypes from "prop-types";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const index = () => {
  return (
    <View
      style={{
        ...StyleSheet.absoluteFill,
        zIndex: 100,
        backgroundColor: "rgba(0,0,0,0.2)",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ActivityIndicator color="#fff" />
    </View>
  );
};

index.propTypes = {};

export default index;
