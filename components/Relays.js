import React from "react";
import { View } from "react-native";
import Relay from "./Relay";
import { nodeMacByName } from "../constants/Nodes";

export default function Buttons(props) {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {[
        { name: "Light bulbs", relay: 1, target: nodeMacByName("Relays") },
        { name: "Plants Low", relay: 2, target: nodeMacByName("Relays") },
        { name: "Plant High", relay: 3, target: nodeMacByName("Relays") },
        { name: "Pump Positive", relay: 4, target: nodeMacByName("Relays") },
        { name: "Pump Negative", relay: 5, target: nodeMacByName("Relays") }
      ].map(e => (
        <Relay
          key={"relay_" + e.name}
          relay={e.relay}
          name={e.name}
          target={e.target}
        />
      ))}
    </View>
  );
}
