import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import SocketConfig from "../constants/SocketsConfig";
import { useSocketIO } from "react-use-websocket";

export default function Led(props) {
  const [ledState, setLedState] = useState(false);
  const { sendJsonMessage, readyState } = useSocketIO(SocketConfig.url, {
    onOpen: () => console.log("opened " + props.name + " led"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { action, led, on } = JSON.parse(e.data);
      if ("led" === action && props.led === led) {
        setLedState(on);
      }
    }
  });
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch"
      }}
    >
      <Text style={{ backgroundColor: props.led, textAlign: "center" }}>
        {props.name}
      </Text>
      <Text
        style={{
          fontSize: 17,
          lineHeight: 24,
          textAlign: "center",
          backgroundColor: ledState ? "green" : "red"
        }}
      >
        {ledState ? "on" : "off"}
      </Text>
      <Button
        title="Push"
        onPress={() => {
          sendJsonMessage({
            action: "led",
            led: props.led,
            on: ledState ? false : true,
            target: props.target,
            time: Date.now()
          });
        }}
      />
    </View>
  );
}
