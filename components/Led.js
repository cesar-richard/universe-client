import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import Switch from "react-switch";
import SocketConfig from "../constants/SocketsConfig";
import useWebSocket from "react-use-websocket";

export default function Led(props) {
  const [ledState, setLedState] = useState(false);
  const { sendJsonMessage, readyState } = useWebSocket(SocketConfig.url, {
    onOpen: () => console.log("opened " + props.name + " led"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { action, led, on, target } = JSON.parse(e.data);
      if ("led" === action && props.led === led && props.target === target) {
        setLedState(on);
      }
    }
  });
  return (
    <View
      style={{
        flex: 1,
        alignSelf: "stretch",
        alignItems: "center"
      }}
    >
      <Text style={{ backgroundColor: props.led, textAlign: "center" }}>
        {props.name}
      </Text>
      <Switch
        onChange={v => {
          sendJsonMessage({
            action: "led",
            led: props.led,
            on: v,
            target: props.target,
            time: Date.now()
          });
        }}
        checked={ledState}
      />
    </View>
  );
}
