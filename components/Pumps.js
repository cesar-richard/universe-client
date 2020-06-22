import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import { nodeMacByName } from "../constants/Nodes";

import Pump from "./Pump";

export default function Pumps() {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {[
        {
          name: "Watering",
          relayPositive: 4,
          relayNegative: 5,
          target: nodeMacByName("Relays")
        }
      ].map(e => (
        <Pump
          key={"pump_" + e.name}
          relayPositive={e.relayPositive}
          relayNegative={e.relayNegative}
          name={e.name}
          target={e.target}
        />
      ))}
    </View>
  );
}
