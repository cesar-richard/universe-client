import React from "react";
import { View } from "react-native";
import Relay from "./Relay";

export default function Buttons(props) {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {[
        { name: "Bulb", relay: 1, target: "A4:CF:12:24:56:0C" },
        { name: "Plants line", relay: 2, target: "A4:CF:12:24:56:0C" },
        { name: "Plant square", relay: 3, target: "A4:CF:12:24:56:0C" }
        { name: "Pump", relay: 4, target: "A4:CF:12:24:56:0C" }
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
