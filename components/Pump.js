import React, { useState } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet, Animated, Easing } from "react-native";

import PumpView from "./PumpView";

export default function Pump({ name, relay, target }) {
  const [active, setActive] = useState(false);
  const [clockWise, setClockWise] = useState(true);
  return (
    <>
      <PumpView active={active} clockWise={clockWise} />
    </>
  );
}

Pump.protoTypes = {
  name: PropTypes.string.isRequired,
  relay: PropTypes.number.isRequired,
  target: PropTypes.string.isRequired
};
