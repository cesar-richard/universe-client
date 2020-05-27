import React, { useState, useEffect, useRef } from "react";
import { View, Button } from "react-native";

export default function MyButton(props) {
  const [socket, setSocket] = useState(null);
  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <Button
        title="Press me"
        onPress={() => {
          props.send({
            event: "button",
            sensor: props.sensor,
            state: "on",
            time: Date.now()
          });
          props.send({
            event: "button",
            sensor: props.sensor,
            state: "off",
            time: Date.now()
          });
        }}
      />
    </View>
  );
}
