import React from "react";
import { View } from "react-native";
import MyButton from "./Button";

export default function Buttons(props) {
  return (
    <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
      {["red", "blue", "green", "black", "white", "yellow", "grey"].map(e => (
        <MyButton key={"button_" + e} sensor={e} color={e} name={e} />
      ))}
    </View>
  );
}
