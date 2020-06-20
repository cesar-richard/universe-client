import React from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";

import PumpCoreSVG from "../assets/images/PumpCoreSVG";
import PumpRotorSVG from "../assets/images/PumpRotorSVG";
import styled from "styled-components/native";

export default function Pump({ active, counterClockWise }) {
  const animatedValue = new Animated.Value(1);
  const startAnimation = () => {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear
    }).start(() => startAnimation());
  };
  const interpolateRotation = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: counterClockWise ? ["360deg", "0deg"] : ["0deg", "360deg"]
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

  // return <StyledLogo />;
}

Pump.protoTypes = {
  active: PropTypes.bool,
  counterClockWise: PropTypes.bool
};

Pump.defaultProps = {
  active: false,
  counterClockWise: false
};
