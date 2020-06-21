import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";

import Pump from "./Pump";

export default function Pumps() {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {[
        {
          name: "Watering",
          relayPositive: 4,
          relayNegative: 5,
          target: "A4:CF:12:24:56:0C"
        }
      ].map(e => (
        <Pump
          key={"pump_" + e.name}
          relay={e.relay}
          name={e.name}
          target={e.target}
        />
      ))}
    </View>
  );
}
