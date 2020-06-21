import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";

import PumpCoreSVG from "../assets/images/PumpCoreSVG";
import PumpRotorSVG from "../assets/images/PumpRotorSVG";
import styled from "styled-components/native";

export default function PumpView({ active, clockWise }) {
  const animatedValue = new Animated.Value(1);
  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 150,
      easing: Easing.linear
    }).start(() => startAnimation());
  };
  const interpolateRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: clockWise ? ["0deg", "60deg"] : ["60deg", "0deg"]
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignSelf: "stretch",
      height: "2em",
      justifyContent: "center",
      alignItems: "center"
    }
  });
  if (active) startAnimation();
  return (
    <View style={styles.container}>
      <View>
        <PumpCoreSVG />
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: [{ rotate: interpolateRotation }],
            transformOrigin: "52.5% 51%"
          }}
        >
          <PumpRotorSVG />
        </Animated.View>
      </View>
    </View>
  );
}

PumpView.protoTypes = {
  active: PropTypes.bool,
  clockWise: PropTypes.bool
};

PumpView.defaultProps = {
  active: false,
  clockWise: true
};
