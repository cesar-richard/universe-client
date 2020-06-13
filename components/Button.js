import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import SocketConfig from "../constants/SocketsConfig";
import useWebSocket from "react-use-websocket";

export default function MyButton(props) {
  const [btnState, setBtnState] = useState("off");
  const { sendJsonMessage, readyState } = useWebSocket(SocketConfig.url, {
    onOpen: () => console.log("opened " + props.name + " button"),
    share: () => true,
    shouldReconnect: closeEvent => true,
    onError: e => console.error,
    onClose: e => console.log,
    onMessage: e => {
      const { event, sensor, state } = JSON.parse(e.data);
      if ("button" === event && props.sensor === sensor) {
        setBtnState(state);
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
      <Text style={{ backgroundColor: props.color, textAlign: "center" }}>
        {props.name}
      </Text>
      <Text
        style={{
          fontSize: 17,
          lineHeight: 24,
          textAlign: "center",
          backgroundColor: btnState === "on" ? "green" : "red"
        }}
      >
        {btnState}
      </Text>
      <Button
        title="Push"
        onPress={() => {
          sendJsonMessage({
            event: "button",
            sensor: props.sensor,
            state: "on",
            time: Date.now()
          });
          sendJsonMessage({
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
