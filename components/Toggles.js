import React from "react";
import { View } from "react-native";
import Toggle from "./Toggle";

export default function Toggles(props) {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {["key", "cap"].map(e => (
        <Toggle key={"toggle_" + e} sensor={e} name={e} />
      ))}
    </View>
  );
}
