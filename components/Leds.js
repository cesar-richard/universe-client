import React from "react";
import { View } from "react-native";
import Led from "./Led";

export default function Leds(props) {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {[
        { led: "blue", name: "blue relay", target: "A4:CF:12:24:56:0C" },
        { led: "red", name: "red relay", target: "A4:CF:12:24:56:0C" }
      ].map(e => (
        <Led
          key={"led_" + e.name}
          name={e.name}
          led={e.led}
          target={e.target}
        />
      ))}
    </View>
  );
}
