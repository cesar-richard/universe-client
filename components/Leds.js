import React from "react";
import { View } from "react-native";
import Led from "./Led";

export default function Leds(props) {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {[
        { led: "blue", name: "blue control", target: "24:6F:28:10:93:98" },
        { led: "red", name: "red control", target: "24:6F:28:10:93:98" },
        { led: "cap", name: "cap control", target: "24:6F:28:10:93:98" },
        { led: "blue", name: "blue weather", target: "24:6F:28:10:61:28" }
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
